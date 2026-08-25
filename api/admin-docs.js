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
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const r = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  });
  return (await r.json()).result;
}

async function pushActivity(userId, type, text) {
  const entry = JSON.stringify({ type, text, createdAt: Date.now() });
  await kvCmd('LPUSH', `flux0:activity:${userId}`, entry);
  await kvCmd('LTRIM', `flux0:activity:${userId}`, 0, 49);
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  const user = getSession(req);
  if (!user) return res.status(401).json({ error: 'not_authenticated' });
  if (!ADMIN_IDS.length || !ADMIN_IDS.includes(user.id)) {
    return res.status(403).json({ error: 'forbidden' });
  }

  const kvAvailable = !!(
    (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) &&
    (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN)
  );
  if (!kvAvailable) return res.status(503).json({ error: 'kv_not_configured' });

  // GET /api/admin-docs?userId=xxx → docs for that user
  if (req.method === 'GET') {
    const userId = req.query?.userId;
    if (!userId) return res.status(400).json({ error: 'missing_userId' });
    const raw = await kvCmd('GET', `flux0:docs:${userId}`);
    const docs = raw ? (typeof raw === 'string' ? JSON.parse(raw) : raw) : [];
    return res.json({ docs });
  }

  // POST → add doc { userId, name, url, type }
  if (req.method === 'POST') {
    const { userId, name, url, type } = req.body || {};
    if (!userId || !name?.trim() || !url?.trim()) return res.status(400).json({ error: 'missing_fields' });
    const raw = await kvCmd('GET', `flux0:docs:${userId}`);
    const docs = raw ? (typeof raw === 'string' ? JSON.parse(raw) : raw) : [];
    const doc = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, name: name.trim(), url: url.trim(), type: type || 'Dokument', addedAt: Date.now() };
    docs.unshift(doc);
    await kvCmd('SET', `flux0:docs:${userId}`, JSON.stringify(docs));
    await pushActivity(userId, 'doc_added', `Neues Dokument: ${doc.name}`);
    return res.json({ ok: true, doc });
  }

  // DELETE → remove doc { userId, docId }
  if (req.method === 'DELETE') {
    const { userId, docId } = req.body || {};
    if (!userId || !docId) return res.status(400).json({ error: 'missing_fields' });
    const raw = await kvCmd('GET', `flux0:docs:${userId}`);
    const docs = raw ? (typeof raw === 'string' ? JSON.parse(raw) : raw) : [];
    const filtered = docs.filter(d => d.id !== docId);
    await kvCmd('SET', `flux0:docs:${userId}`, JSON.stringify(filtered));
    return res.json({ ok: true });
  }

  return res.status(405).json({ error: 'method_not_allowed' });
};
