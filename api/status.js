const SERVICES = [
  { name: 'flux0.dev', url: 'https://flux0.dev' },
  { name: 'flowwave.app', url: 'https://flowwave.app' },
  { name: 'lumaspace.de', url: 'https://lumaspace.de' },
];

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({ error: 'method_not_allowed' });

  const results = await Promise.all(SERVICES.map(async ({ name, url }) => {
    const start = Date.now();
    try {
      const r = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
      return { name, url, status: r.ok || r.status < 500 ? 'up' : 'down', latency: Date.now() - start, code: r.status };
    } catch {
      return { name, url, status: 'down', latency: Date.now() - start, code: null };
    }
  }));

  return res.json({ services: results, checkedAt: Date.now() });
};
