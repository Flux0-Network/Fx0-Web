const { createHmac } = require('crypto');

const ADMIN_IDS = (process.env.ADMIN_DISCORD_IDS || '').split(',').map(s => s.trim()).filter(Boolean);

function getSession(req) {
  const SESSION_SECRET = process.env.SESSION_SECRET;
  const cookie = req.headers.cookie || '';
  const match = cookie.match(/flux0_session=([A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+)/);
  if (!match) return null;
  const [header, payload, sig] = match[1].split('.');
  const expected = createHmac('sha256', SESSION_SECRET).update(`${header}.${payload}`).digest('base64url');
  if (sig !== expected) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!data.exp || data.exp < Date.now()) return null;
    return data;
  } catch { return null; }
}

async function kvCmd(...args) {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  const r = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  });
  return (await r.json()).result;
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  const user = getSession(req);
  if (!user) return res.status(401).json({ error: 'not_authenticated' });
  if (!ADMIN_IDS.length || !ADMIN_IDS.includes(user.id)) {
    return res.status(403).json({ error: 'forbidden' });
  }

  if (req.method === 'GET') {
    const ids = (await kvCmd('SMEMBERS', 'flux0:requests')) || [];
    const requests = (await Promise.all(ids.map(id => kvCmd('GET', `flux0:req:${id}`))))
      .filter(Boolean)
      .map(v => (typeof v === 'string' ? JSON.parse(v) : v))
      .sort((a, b) => b.createdAt - a.createdAt);
    return res.json({ requests });
  }

  if (req.method === 'POST') {
    const { userId, status, note } = req.body || {};
    if (!userId) return res.status(400).json({ error: 'missing_userId' });
    const raw = await kvCmd('GET', `flux0:req:${userId}`);
    if (!raw) return res.status(404).json({ error: 'not_found' });
    const existing = typeof raw === 'string' ? JSON.parse(raw) : raw;
    const updated = { ...existing, updatedAt: Date.now() };
    if (typeof status === 'number') updated.status = status;
    if (typeof note === 'string') updated.note = note;
    await kvCmd('SET', `flux0:req:${userId}`, JSON.stringify(updated));
    return res.json({ ok: true });
  }

  return res.status(405).json({ error: 'method_not_allowed' });
};
