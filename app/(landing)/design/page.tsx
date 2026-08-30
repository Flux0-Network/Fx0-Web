import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import SiteFooter from '@/components/landing/SiteFooter';
import CookieNotice from '@/components/landing/CookieNotice';

export const metadata: Metadata = {
  title: 'Design Studio — Flux0',
  description: 'Logos, Banner, Social Media Kits und Brand Identities — professionelles Design von Flux0.',
};

const DESIGN_CARDS = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
    title: 'Logo Design',
    desc: 'Wortmarke, Bildmarke oder Kombination. Geliefert als SVG, PNG und PDF in allen Varianten — hell, dunkel, monochrom.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
    title: 'Banner & Ads',
    desc: 'Social Media Banner, Web Ads, Hero-Grafiken. Alle gängigen Formate — direkt einsatzbereit für Instagram, X, Discord und Web.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="9" height="9" rx="1"/><rect x="13" y="2" width="9" height="9" rx="1"/><rect x="2" y="13" width="9" height="9" rx="1"/><rect x="13" y="13" width="9" height="9" rx="1"/></svg>,
    title: 'Social Media Kit',
    desc: 'Einheitliches Template-Set für Instagram Posts, Stories, X-Header und Discord-Server — konsistent, editierbar in Figma oder Canva.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 12L2 12"/><path d="M12 2v10"/><circle cx="19" cy="5" r="3"/></svg>,
    title: 'Brand Identity',
    desc: 'Logo, Farbpalette, Typografie, Icons und Brand Guidelines — dein komplettes visuelles Erscheinungsbild in einem Paket.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    title: 'Discord Server Design',
    desc: 'Server-Banner, Icon, Channel-Icons und Embed-Layouts — dein Discord sieht professionell aus und passt zur Brand.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    title: 'Pitch Deck / Präsentation',
    desc: 'Professionelle Präsentationen für Investoren, Kunden oder Pitches — visuell stark, klar strukturiert.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
    title: 'NFT & Crypto Assets',
    desc: 'Profil-Bilder, Collection-Art, Token-Icons und Promo-Material für NFT-Projekte und Crypto-Communities.',
  },
];

const PROZESS_STEPS = [
  { num: '01', title: 'Brief & Gespräch', text: 'Du beschreibst dein Projekt — was brauchst du, für wen, in welchem Stil. Wir klären alles auf Discord im kurzen Gespräch.' },
  { num: '02', title: 'Konzept & Entwurf', text: 'Wir entwickeln einen ersten Entwurf auf Basis deines Briefings. Du siehst das Ergebnis und gibst direkt Feedback.' },
  { num: '03', title: 'Feinschliff', text: 'Anpassungen nach deinem Feedback — bis es passt. Keine versteckten Kosten für Revisionen im vereinbarten Rahmen.' },
  { num: '04', title: 'Lieferung', text: 'Alle Dateien in den richtigen Formaten — SVG, PNG, PDF, Figma-Datei — direkt auf Discord oder per Link.' },
];

export default function DesignPage() {
  return (
    <>
      <Navbar />

      <section className="hero hero--small">
        <div className="container">
          <h1>Nicht nur Code.</h1>
          <p className="hero-sub">
            Professionelle Designs für Logos, Banner, Social Media und komplette Brand Identities — direkt von uns.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <div className="section-label-row">
            <span className="dot" />
            LEISTUNGEN
          </div>
          <div className="section-intro">
            <h2 className="section-title">Was wir dir designen.</h2>
            <p className="section-sub">Alle Designs werden individuell erstellt — kein Template, kein Generator.</p>
          </div>

          <div className="design-services-grid" style={{ marginTop: '40px' }}>
            {DESIGN_CARDS.map(card => (
              <div key={card.title} className="design-card">
                <div className="design-card-icon">{card.icon}</div>
                <div className="design-card-title">{card.title}</div>
                <div className="design-card-desc">{card.desc}</div>
                <span className="design-card-tag">Auf Anfrage</span>
              </div>
            ))}

            <div className="design-card" style={{ borderStyle: 'dashed', background: 'transparent' }}>
              <div className="design-card-icon" style={{ background: 'var(--bg)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
              </div>
              <div className="design-card-title">Anderes?</div>
              <div className="design-card-desc">Einfach auf Discord schreiben — wir designen auch alles was hier nicht steht.</div>
              <a
                href="https://discord.gg/D9GwqWpwHT"
                className="design-card-tag"
                target="_blank"
                rel="noopener"
                style={{ textDecoration: 'none', color: 'var(--accent)', borderColor: 'var(--accent)', background: '#ede9fe' }}
              >
                Discord →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROZESS */}
      <section className="section" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-label-row">
            <span className="dot dot--grün" />
            ABLAUF
          </div>
          <div className="section-intro">
            <h2 className="section-title">So läuft&apos;s ab.</h2>
            <p className="section-sub">Schnell, direkt, ohne unnötiges Hin und Her.</p>
          </div>
          <div className="prozess-grid" style={{ marginTop: '48px' }}>
            {PROZESS_STEPS.map(step => (
              <div key={step.num} className="prozess-step">
                <div className="prozess-num">{step.num}</div>
                <div className="prozess-content">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta section">
        <div className="container">
          <div className="cta-inner">
            <div className="section-label-row">
              <span className="dot dot--grün" />
              BEREIT?
            </div>
            <h2>Design anfragen.</h2>
            <p>Schreib uns auf Discord — kurze Beschreibung genügt. Wir melden uns schnell.</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '4px' }}>
              <a href="https://discord.gg/D9GwqWpwHT" className="btn-primary" target="_blank" rel="noopener">
                <svg width="18" height="18" viewBox="0 0 71 55" fill="currentColor"><path d="M60.1 4.9A58.5 58.5 0 0 0 45.5.7a.2.2 0 0 0-.2.1 40.7 40.7 0 0 0-1.8 3.7 54 54 0 0 0-16.2 0A37.7 37.7 0 0 0 25.5.8a.2.2 0 0 0-.2-.1A58.4 58.4 0 0 0 10.7 4.9a.2.2 0 0 0-.1.1C1.6 18.1-.9 31 .3 43.7a.2.2 0 0 0 .1.1 58.8 58.8 0 0 0 17.7 9 .2.2 0 0 0 .2-.1 42 42 0 0 0 3.6-5.9.2.2 0 0 0-.1-.3 38.7 38.7 0 0 1-5.5-2.6.2.2 0 0 1 0-.4l1.1-.8a.2.2 0 0 1 .2 0c11.6 5.3 24.1 5.3 35.5 0a.2.2 0 0 1 .2 0l1.1.8a.2.2 0 0 1 0 .4 36 36 0 0 1-5.5 2.6.2.2 0 0 0-.1.3 47.1 47.1 0 0 0 3.6 5.9.2.2 0 0 0 .2.1 58.6 58.6 0 0 0 17.8-9 .2.2 0 0 0 .1-.1c1.5-15.2-2.5-28-10.6-39.7a.2.2 0 0 0-.1-.1ZM23.7 36.1c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2Zm23.7 0c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2Z"/></svg>
                Discord joinen
              </a>
              <a href="/" className="btn-ghost">Zur Startseite</a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <CookieNotice />
    </>
  );
}
