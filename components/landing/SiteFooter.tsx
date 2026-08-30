export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <a href="/" className="footer-logo-link">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo1.png" alt="Flux Network" className="footer-logo-img" />
            </a>
            <p className="footer-tagline">
              Professionelle Webseiten &amp; digitale Produkte.<br />
              Gebaut von Flux Network.
            </p>
            <div className="footer-socials">
              <a href="https://discord.gg/D9GwqWpwHT" target="_blank" rel="noopener" aria-label="Discord">
                <svg viewBox="0 0 71 55" aria-hidden="true"><path d="M60.1 4.9A58.5 58.5 0 0 0 45.5.7a.2.2 0 0 0-.2.1 40.7 40.7 0 0 0-1.8 3.7 54 54 0 0 0-16.2 0A37.7 37.7 0 0 0 25.5.8a.2.2 0 0 0-.2-.1A58.4 58.4 0 0 0 10.7 4.9a.2.2 0 0 0-.1.1C1.6 18.1-.9 31 .3 43.7a.2.2 0 0 0 .1.1 58.8 58.8 0 0 0 17.7 9 .2.2 0 0 0 .2-.1 42 42 0 0 0 3.6-5.9.2.2 0 0 0-.1-.3 38.7 38.7 0 0 1-5.5-2.6.2.2 0 0 1 0-.4l1.1-.8a.2.2 0 0 1 .2 0c11.6 5.3 24.1 5.3 35.5 0a.2.2 0 0 1 .2 0l1.1.8a.2.2 0 0 1 0 .4 36 36 0 0 1-5.5 2.6.2.2 0 0 0-.1.3 47.1 47.1 0 0 0 3.6 5.9.2.2 0 0 0 .2.1 58.6 58.6 0 0 0 17.8-9 .2.2 0 0 0 .1-.1c1.5-15.2-2.5-28-10.6-39.7a.2.2 0 0 0-.1-.1ZM23.7 36.1c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2Zm23.7 0c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2Z" /></svg>
              </a>
              <a href="https://instagram.com/flux0.dev" target="_blank" rel="noopener" aria-label="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM18.5 6a1.1 1.1 0 1 1-1.1 1.1A1.1 1.1 0 0 1 18.5 6z" /></svg>
              </a>
              <a href="https://twitter.com/flux0dev" target="_blank" rel="noopener" aria-label="X (Twitter)">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h5.2l4.4 6.3L17.5 3H21l-7.7 10.5L21.5 21h-5.2l-4.8-6.8L6.5 21H3l7.9-10.6L3 3z" /></svg>
              </a>
            </div>
          </div>

          {/* Produkte */}
          <div className="footer-col">
            <div className="footer-col-title">Produkte</div>
            <ul className="footer-links">
              <li><a href="https://lumaspace.de/" target="_blank" rel="noopener">LumaSpace</a></li>
              <li><a href="https://flowwave.app" target="_blank" rel="noopener">FlowWave</a></li>
              <li><a href="https://lyqdex.io" target="_blank" rel="noopener">LyqDex</a></li>
              <li><a href="/#products">Vylder</a></li>
              <li><a href="/#products">Vex0</a></li>
            </ul>
          </div>

          {/* Links */}
          <div className="footer-col">
            <div className="footer-col-title">Links</div>
            <ul className="footer-links">
              <li><a href="/community">Community</a></li>
              <li><a href="/docs">Dokumentation</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/impressum">Impressum</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© 2026 Flux Network · flux0.dev</span>
          <span className="footer-powered">Powered by <strong>Flux Network</strong></span>
        </div>
      </div>
    </footer>
  );
}
