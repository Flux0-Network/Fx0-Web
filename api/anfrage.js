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
  } catch {
    return null;
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

  const user = getSession(req);
  if (!user) return res.status(401).json({ error: 'not_authenticated' });

  const { paket, beschreibung, budget } = req.body || {};
  if (!paket || !beschreibung) return res.status(400).json({ error: 'missing_fields' });

  const webhookUrl = process.env.DISCORD_ANFRAGE_WEBHOOK;
  if (!webhookUrl) return res.status(500).json({ error: 'webhook_not_configured' });

  const name = user.global_name || user.username || 'Unbekannt';
  const avatarUrl = user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64`
    : null;

  const embed = {
    title: '📬 Neue Website-Anfrage',
    color: 0x7c3aed,
    fields: [
      { name: 'Paket', value: paket, inline: true },
      { name: 'Budget', value: budget || 'Nicht angegeben', inline: true },
      { name: 'Discord', value: `${name} (${user.id})`, inline: false },
      { name: 'Beschreibung', value: beschreibung.slice(0, 1024), inline: false },
    ],
    timestamp: new Date().toISOString(),
    footer: { text: 'flux0.dev · Dashboard Anfrage' },
  };

  if (avatarUrl) embed.thumbnail = { url: avatarUrl };

  try {
    const r = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });
    if (!r.ok) throw new Error(`Webhook ${r.status}`);
    res.json({ ok: true });
  } catch (err) {
    console.error('[anfrage] webhook error:', err.message);
    res.status(500).json({ error: 'webhook_failed' });
  }
};
