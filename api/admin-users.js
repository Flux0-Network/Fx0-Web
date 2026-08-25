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

  if (req.method === 'GET') {
    // ?userId=xxx → docs for that user
    const userId = req.query?.userId;
    if (userId) {
      if (!kvAvailable) return res.json({ docs: [] });
      const raw = await kvCmd('GET', `flux0:docs:${userId}`);
      const docs = raw ? (typeof raw === 'string' ? JSON.parse(raw) : raw) : [];
      return res.json({ docs });
    }
    // list all users
    if (!kvAvailable) return res.json({ users: [], kv: false });
    const ids = (await kvCmd('SMEMBERS', 'flux0:users:all')) || [];
    const users = (await Promise.all(ids.map(async id => {
      const raw = await kvCmd('GET', `flux0:user:${id}`);
      if (!raw) return null;
      const u = typeof raw === 'string' ? JSON.parse(raw) : raw;
      const reqRaw = await kvCmd('GET', `flux0:req:${id}`);
      u.project = reqRaw ? (typeof reqRaw === 'string' ? JSON.parse(reqRaw) : reqRaw) : null;
      return u;
    }))).filter(Boolean).sort((a, b) => b.lastLogin - a.lastLogin);
    return res.json({ users, kv: true });
  }

  // POST → add doc { userId, name, url, type }
  if (req.method === 'POST') {
    if (!kvAvailable) return res.status(503).json({ error: 'kv_not_configured' });
    const { userId, name, url, type } = req.body || {};
    if (!userId || !name?.trim() || !url?.trim()) return res.status(400).json({ error: 'missing_fields' });
    const raw = await kvCmd('GET', `flux0:docs:${userId}`);
    const docs = raw ? (typeof raw === 'string' ? JSON.parse(raw) : raw) : [];
    const doc = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, name: name.trim(), url: url.trim(), type: type || 'Dokument', addedAt: Date.now() };
    docs.unshift(doc);
    await kvCmd('SET', `flux0:docs:${userId}`, JSON.stringify(docs));
    const actEntry = JSON.stringify({ type: 'doc_added', text: `Neues Dokument: ${doc.name}`, createdAt: Date.now() });
    kvCmd('LPUSH', `flux0:activity:${userId}`, actEntry).catch(() => {});
    kvCmd('LTRIM', `flux0:activity:${userId}`, 0, 49).catch(() => {});
    return res.json({ ok: true, doc });
  }

  // PATCH → update project status/details { userId, status?, name?, paket?, note? }
  if (req.method === 'PATCH') {
    if (!kvAvailable) return res.status(503).json({ error: 'kv_not_configured' });
    const { userId, status, name, paket, note } = req.body || {};
    if (!userId) return res.status(400).json({ error: 'missing_userId' });
    const raw = await kvCmd('GET', `flux0:req:${userId}`);
    if (!raw) return res.status(404).json({ error: 'no_project' });
    const proj = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (typeof status === 'number') proj.status = status;
    if (name?.trim()) proj.name = name.trim();
    if (paket?.trim()) proj.paket = paket.trim();
    if (note !== undefined) proj.note = note.trim().slice(0, 500);
    proj.updatedAt = Date.now();
    await kvCmd('SET', `flux0:req:${userId}`, JSON.stringify(proj));
    return res.json({ ok: true, proj });
  }

  // DELETE → remove doc { userId, docId }
  if (req.method === 'DELETE') {
    if (!kvAvailable) return res.status(503).json({ error: 'kv_not_configured' });
    const { userId, docId } = req.body || {};
    if (!userId || !docId) return res.status(400).json({ error: 'missing_fields' });
    const raw = await kvCmd('GET', `flux0:docs:${userId}`);
    const docs = raw ? (typeof raw === 'string' ? JSON.parse(raw) : raw) : [];
    await kvCmd('SET', `flux0:docs:${userId}`, JSON.stringify(docs.filter(d => d.id !== docId)));
    return res.json({ ok: true });
  }

  return res.status(405).json({ error: 'method_not_allowed' });
};
