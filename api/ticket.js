const { createHmac } = require('crypto');

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

  const kvAvailable = !!(
    (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) &&
    (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN)
  );

  if (req.method === 'GET') {
    if (!kvAvailable) return res.json({ tickets: [] });
    const ids = (await kvCmd('SMEMBERS', `flux0:tickets:user:${user.id}`)) || [];
    const tickets = (await Promise.all(ids.map(id => kvCmd('GET', `flux0:ticket:${id}`))))
      .filter(Boolean)
      .map(v => (typeof v === 'string' ? JSON.parse(v) : v))
      .sort((a, b) => b.createdAt - a.createdAt);
    return res.json({ tickets });
  }

  if (req.method === 'POST') {
    if (!kvAvailable) return res.status(503).json({ error: 'kv_not_configured' });
    const { subject, message } = req.body || {};
    if (!subject?.trim() || !message?.trim()) return res.status(400).json({ error: 'missing_fields' });

    const ticketId = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const ticket = {
      id: ticketId,
      userId: user.id,
      username: user.username,
      global_name: user.global_name,
      avatar: user.avatar,
      subject: subject.trim().slice(0, 200),
      message: message.trim().slice(0, 2000),
      status: 'open',
      createdAt: Date.now(),
      replies: [],
    };

    await kvCmd('SET', `flux0:ticket:${ticketId}`, JSON.stringify(ticket));
    await kvCmd('SADD', `flux0:tickets:user:${user.id}`, ticketId);
    await kvCmd('SADD', 'flux0:tickets:all', ticketId);

    // Discord webhook
    const webhookUrl = process.env.DISCORD_STATUS_WEBHOOK;
    if (webhookUrl) {
      const name = user.global_name || user.username || 'Unbekannt';
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: '🎫 Neues Support-Ticket',
            color: 0x3b82f6,
            fields: [
              { name: 'Von', value: `${name} (<@${user.id}>)`, inline: true },
              { name: 'Betreff', value: ticket.subject, inline: true },
              { name: 'Nachricht', value: ticket.message.slice(0, 512) },
            ],
            timestamp: new Date().toISOString(),
            footer: { text: `Ticket ${ticketId} · flux0.dev` },
          }],
        }),
      }).catch(() => {});
    }

    return res.status(201).json({ ok: true, id: ticketId });
  }

  // PATCH → user reply to own ticket
  if (req.method === 'PATCH') {
    if (!kvAvailable) return res.status(503).json({ error: 'kv_not_configured' });
    const { ticketId, message } = req.body || {};
    if (!ticketId || !message?.trim()) return res.status(400).json({ error: 'missing_fields' });
    const raw = await kvCmd('GET', `flux0:ticket:${ticketId}`);
    if (!raw) return res.status(404).json({ error: 'not_found' });
    const ticket = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (ticket.userId !== user.id) return res.status(403).json({ error: 'forbidden' });
    if (ticket.status === 'closed') return res.status(400).json({ error: 'ticket_closed' });
    ticket.replies.push({ from: 'user', message: message.trim().slice(0, 2000), createdAt: Date.now() });
    await kvCmd('SET', `flux0:ticket:${ticketId}`, JSON.stringify(ticket));
    return res.json({ ok: true });
  }

  return res.status(405).json({ error: 'method_not_allowed' });
};
