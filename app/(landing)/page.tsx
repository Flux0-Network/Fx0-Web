import type { Metadata } from 'next';
import ScrollReveal from '@/components/landing/ScrollReveal';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import AboveFoldBg from '@/components/landing/AboveFoldBg';
import CookieNotice from '@/components/landing/CookieNotice';
import SiteFooter from '@/components/landing/SiteFooter';

export const metadata: Metadata = {
  title: 'Flux Network — Tools. Produkte. Indikatoren.',
  description: 'Flux Network baut digitale Produkte, Developer-Frameworks und TradingView-Indikatoren. LumaSpace, FlowWave, Vex0 und mehr.',
  openGraph: {
    type: 'website',
    url: 'https://flux0.dev/',
    title: 'Flux Network — Tools. Produkte. Indikatoren.',
    description: 'Digitale Produkte, Developer-Frameworks und Trading-Tools von Flux Network.',
    images: [{ url: 'https://flux0.dev/og-image.png', width: 1200, height: 630 }],
    siteName: 'Flux Network',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@flux0dev',
    title: 'Flux Network — Tools. Produkte. Indikatoren.',
    description: 'Digitale Produkte, Developer-Frameworks und Trading-Tools von Flux Network.',
    images: ['https://flux0.dev/og-image.png'],
  },
  alternates: { canonical: 'https://flux0.dev/' },
};

export default function LandingPage() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <div className="above-fold-wrapper">
        <AboveFoldBg />
        <HeroSection />
        <TechStrip />
      </div>
      <ProductsSection />
      <PartnersSection />
      <FaqSection />
      <CtaSection />
      <SiteFooter />
      <CookieNotice />
    </>
  );
}

// ── Static sections ────────────────────────────────────────────────────────

const TECH_ITEMS = [
  {
    label: 'Next.js',
    icon: (
      <svg width="16" height="16" viewBox="0 0 180 180" fill="none">
        <mask id="nxt" style={{ maskType: 'alpha' as const }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
          <circle cx="90" cy="90" r="90" fill="black" />
        </mask>
        <g mask="url(#nxt)">
          <circle cx="90" cy="90" r="90" fill="black" />
          <path d="M149.508 157.52L69.142 54H54V125.97H66.1847V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#nxtg1)" />
          <rect x="115" y="54" width="12" height="72" fill="url(#nxtg2)" />
          <defs>
            <linearGradient id="nxtg1" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" /><stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="nxtg2" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" /><stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </g>
      </svg>
    ),
  },
  {
    label: 'React',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#61DAFB" opacity="0.15" />
        <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    label: 'Tailwind CSS',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M1 6l11-4 11 4-11 4L1 6z" fill="#38BDF8" opacity="0.8" />
        <path d="M1 12l11 4 11-4" stroke="#38BDF8" strokeWidth="1.5" fill="none" />
        <path d="M1 18l11 4 11-4" stroke="#38BDF8" strokeWidth="1" fill="none" opacity="0.5" />
      </svg>
    ),
  },
  {
    label: 'TypeScript',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 15l4-8 4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.5 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'shadcn/ui',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="9" height="9" rx="1.5" fill="currentColor" opacity="0.7" />
        <rect x="13" y="2" width="9" height="9" rx="1.5" fill="currentColor" opacity="0.5" />
        <rect x="2" y="13" width="9" height="9" rx="1.5" fill="currentColor" opacity="0.5" />
        <rect x="13" y="13" width="9" height="9" rx="1.5" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    label: 'Headless UI',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#6366f1" strokeWidth="1.5" />
        <path d="M8 12h8M12 8v8" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Float UI',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M3 12h18M3 6h18M3 18h18" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'HeroUI',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <polygon points="12,2 22,19 2,19" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'DaisyUI',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4" fill="#1fb2a6" opacity="0.8" />
        <circle cx="12" cy="12" r="9" stroke="#1fb2a6" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    label: 'Vercel',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

function TechStrip() {
  return (
    <section className="tech-strip">
      <p className="tech-strip-label">Womit wir bauen</p>
      <div className="tech-strip-track-wrapper">
        <div className="tech-strip-track">
          {[...TECH_ITEMS, ...TECH_ITEMS].map((t, i) => (
            <span
              key={i}
              className="tech-item"
              aria-hidden={i >= TECH_ITEMS.length ? true : undefined}
            >
              {t.icon}
              {t.label}
            </span>
          ))}
        </div>
      </div>
      <a href="#pakete" className="hero-scroll-hint" style={{ marginTop: '28px' }} aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
        Mehr erfahren
      </a>
    </section>
  );
}


const PRODUCTS = [
  {
    icon: '/lumaspace-icon.png',
    name: 'LumaSpace',
    status: 'Live',
    statusClass: 'product-status--live',
    desc: 'Intelligente Produktivitäts- und Planungssysteme für Teams, Fokusarbeit und automatisierte Workflows. KI-gestützt, kollaborativ, schnell.',
    tags: ['AI Planning', 'Realtime Collaboration', 'Task Orchestration', 'Focus & Scheduling'],
    href: 'https://lumaspace.de/',
  },
  {
    icon: '/flowwave-icon.png',
    name: 'FlowWave',
    status: 'Open Beta',
    statusClass: 'product-status--dev',
    desc: 'Visueller Discord-Bot-Builder auf Basis von pycord v2 — erstelle leistungsstarke Bots ohne Boilerplate. Slash Commands, Events und UI-Komponenten in Minuten einrichten.',
    tags: ['pycord v2', 'Slash Commands', 'Bot Builder', 'Visual Editor'],
    href: 'https://flowwave.app',
  },
  {
    icon: '/lyqdex-icon.PNG',
    name: 'LyqDex',
    status: 'In Entwicklung',
    statusClass: 'product-status--dev',
    desc: 'Dezentrales Exchange-Protokoll mit Fokus auf Liquidität, Effizienz und Transparenz. Onchain-Infrastruktur für die nächste Generation von DeFi.',
    tags: ['Onchain DEX', 'Liquidity Pools', 'Streaming Transactions', 'DeFi Analytics'],
    href: 'https://lyqdex.io',
  },
];

function ProductsSection() {
  return (
    <section id="products" className="section">
      <div className="container">
        <div className="section-label-row">
          <span className="dot" />
          PRODUKTE
        </div>
        <div className="section-intro">
          <h2 className="section-title">Gebaut von Flux Network.</h2>
          <p className="section-sub">Neben Webdesign entwickeln wir eigene digitale Produkte und Plattformen.</p>
        </div>
        <div className="products-list">
          {PRODUCTS.map(p => (
            <div key={p.name} className="product-card">
              <div className="product-card-left">
                <div className="product-icon">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.icon} alt={p.name} className="product-logo-icon" />
                </div>
                <div>
                  <h3 className="product-name">{p.name}</h3>
                  <span className={`product-status ${p.statusClass}`}>{p.status}</span>
                </div>
              </div>
              <p className="product-desc">{p.desc}</p>
              <ul className="product-tags">
                {p.tags.map(t => <li key={t}>{t}</li>)}
              </ul>
              <a href={p.href} className="btn-primary" target="_blank" rel="noopener">Öffnen →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  return (
    <section className="logo-cloud-section">
      <div className="container">
        <p className="logo-cloud-label">Discord Partner &amp; befreundete Server</p>
        <div className="logo-cloud">
          <a href="https://discord.gg/WV3GCj3CaU" className="logo-cloud-item" target="_blank" rel="noopener">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://cdn.discordapp.com/icons/1435694704116105350/775702c0577f7d3d5134c4138858cfdf.webp?size=64"
              alt="Freunde finden in deiner Nähe - DACH"
              className="logo-cloud-avatar"
            />
            <span>Freunde finden DACH</span>
          </a>
          <a href="https://discord.gg/busbahnhof" className="logo-cloud-item" target="_blank" rel="noopener">
            <span className="logo-cloud-avatar-fallback" style={{ background: '#5865f2' }}>B</span>
            <span>Busbahnhof</span>
          </a>
          <a href="https://discord.gg/yqQutP6EKV" className="logo-cloud-item logo-cloud-item--add" target="_blank" rel="noopener">
            <span className="logo-cloud-plus">+</span>
            <span>Partner werden</span>
          </a>
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  {
    q: 'Was ist Flux Network?',
    a: 'Flux Network ist ein digitales Produktstudio — wir bauen eigene Software-Produkte, Developer-Frameworks, TradingView-Indikatoren und Tools für die nächste Generation.',
  },
  {
    q: 'Was ist Vex0?',
    a: 'Vex0 ist unser Open-Source Component Framework — ähnlich wie shadcn/ui, aber von Flux Network entwickelt. Komponenten die du direkt in dein Projekt kopieren und anpassen kannst.',
  },
  {
    q: 'Was ist Vylder?',
    a: 'Vylder ist unser visueller Website-Builder — eine Alternative zu Framer, die wir aktuell entwickeln. Mehr Infos kommen bald.',
  },
  {
    q: 'Was sind die TradingView-Indikatoren?',
    a: 'Wir entwickeln Pine Script Indikatoren und Strategien für TradingView — von einfachen Overlay-Indikatoren bis zu kompletten automatisierten Strategien. Coming Soon.',
  },
  {
    q: 'Wie kann ich auf dem Laufenden bleiben?',
    a: 'Tritt unserem Discord bei — dort posten wir Updates zu allen Produkten, Early Access und Beta-Releases als Erstes.',
  },
  {
    q: 'Sind die Produkte kostenlos?',
    a: 'Vex0 ist Open Source und kostenlos. Für LumaSpace, FlowWave und die Indikatoren gibt es kostenlose und kostenpflichtige Pläne — je nach Produkt unterschiedlich.',
  },
];

function FaqSection() {
  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="section-label-row">
          <span className="dot dot--gelb" />
          FAQ
        </div>
        <div className="section-intro">
          <h2 className="section-title">Häufige Fragen</h2>
          <p className="section-sub">Alles was du wissen musst — bevor du anfragst.</p>
        </div>
        <div className="faq-grid">
          {FAQ_ITEMS.map(item => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

const DiscordIcon = () => (
  <svg width="18" height="18" viewBox="0 0 71 55" fill="currentColor">
    <path d="M60.1 4.9A58.5 58.5 0 0 0 45.5.7a.2.2 0 0 0-.2.1 40.7 40.7 0 0 0-1.8 3.7 54 54 0 0 0-16.2 0A37.7 37.7 0 0 0 25.5.8a.2.2 0 0 0-.2-.1A58.4 58.4 0 0 0 10.7 4.9a.2.2 0 0 0-.1.1C1.6 18.1-.9 31 .3 43.7a.2.2 0 0 0 .1.1 58.8 58.8 0 0 0 17.7 9 .2.2 0 0 0 .2-.1 42 42 0 0 0 3.6-5.9.2.2 0 0 0-.1-.3 38.7 38.7 0 0 1-5.5-2.6.2.2 0 0 1 0-.4l1.1-.8a.2.2 0 0 1 .2 0c11.6 5.3 24.1 5.3 35.5 0a.2.2 0 0 1 .2 0l1.1.8a.2.2 0 0 1 0 .4 36 36 0 0 1-5.5 2.6.2.2 0 0 0-.1.3 47.1 47.1 0 0 0 3.6 5.9.2.2 0 0 0 .2.1 58.6 58.6 0 0 0 17.8-9 .2.2 0 0 0 .1-.1c1.5-15.2-2.5-28-10.6-39.7a.2.2 0 0 0-.1-.1ZM23.7 36.1c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2Zm23.7 0c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2Z" />
  </svg>
);

function CtaSection() {
  return (
    <section className="cta section">
      <div className="container">
        <div className="cta-inner">
          <div className="section-label-row">
            <span className="dot dot--grün" />
            BEREIT?
          </div>
          <h2>Bleib auf dem Laufenden.</h2>
          <p>Tritt unserem Discord bei — Early Access, Beta-Releases und Updates zu allen Produkten als Erstes.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 4 }}>
            <a href="https://discord.gg/D9GwqWpwHT" className="btn-primary" target="_blank" rel="noopener">
              <DiscordIcon /> Discord joinen
            </a>
            <a href="#pakete" className="btn-ghost">Pakete ansehen</a>
          </div>
        </div>
      </div>
    </section>
  );
}

