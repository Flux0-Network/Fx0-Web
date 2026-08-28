import type { Metadata } from 'next';
import ScrollReveal from '@/components/landing/ScrollReveal';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import AboveFoldBg from '@/components/landing/AboveFoldBg';
import CookieNotice from '@/components/landing/CookieNotice';
import SiteFooter from '@/components/landing/SiteFooter';

export const metadata: Metadata = {
  title: 'Flux Network — Webdesign & Entwicklung',
  description: 'Flux Network baut professionelle Webseiten für Unternehmen, Freelancer und Projekte. Modern, schnell, auf den Punkt — von der ersten Idee bis zum Launch.',
  openGraph: {
    type: 'website',
    url: 'https://flux0.dev/',
    title: 'Flux Network — Webdesign & Entwicklung',
    description: 'Professionelle Webseiten für Unternehmen, Freelancer und Projekte. Modern, schnell, auf den Punkt.',
    images: [{ url: 'https://flux0.dev/og-image.png', width: 1200, height: 630 }],
    siteName: 'Flux Network',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@flux0dev',
    title: 'Flux Network — Webdesign & Entwicklung',
    description: 'Professionelle Webseiten für Unternehmen, Freelancer und Projekte. Modern, schnell, auf den Punkt.',
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
      <PaketeSection />
      <ProzessSection />
      <ReferenzenSection />
      <DesignStudioSection />
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

const PAKET_FEATURES = [
  'Landingpage bis Multipage-Site',
  'Logo-Design & Branding',
  'Mobile-optimiert & barrierefrei',
  'SEO-Optimierung (Basic bis Full)',
  'Next.js + Tailwind + shadcn/ui',
  'Kontaktformular & Integrationen',
  'Animationen & Micro-Interactions',
  'Support bis Launch & darüber hinaus',
];

function PaketeSection() {
  return (
    <section id="pakete" className="section">
      <div className="container">
        <div className="section-label-row">
          <span className="dot dot--gelb" />
          PAKETE
        </div>
        <div className="section-intro">
          <h2 className="section-title">Was wir dir bauen.</h2>
          <p className="section-sub">Kein Einheitspaket — jedes Projekt ist anders. Wir besprechen deine Anforderungen und machen dir ein Angebot, das passt.</p>
        </div>
        <div className="paket-individuell-wrap">
          <div className="paket-card paket-card--wide">
            <div className="paket-card-top">
              <div>
                <span className="paket-name">Individuell</span>
                <p className="paket-tagline">Maßgeschneidert für dein Projekt — Landingpage, Multipage, Web-App oder alles dazwischen.</p>
              </div>
              <div className="paket-price">
                <span className="paket-price-from">Preis auf</span>
                <span className="paket-price-value">Anfrage</span>
              </div>
            </div>
            <ul className="paket-list paket-list--two-col">
              {PAKET_FEATURES.map(f => (
                <li key={f}><span className="paket-check paket-check--accent">✓</span> {f}</li>
              ))}
            </ul>
            <a href="https://discord.gg/D9GwqWpwHT" className="btn-primary" target="_blank" rel="noopener">Jetzt anfragen →</a>
          </div>
        </div>
        <p className="pakete-note">Alle Preise zzgl. MwSt. — Lieferzeit je nach Projektumfang.</p>
      </div>
    </section>
  );
}

const PROZESS_STEPS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Erstgespräch',
    text: 'Wir reden kurz über dein Projekt — was du brauchst, was du dir vorstellst, welches Budget du hast. Kostenlos, unverbindlich, kein Verkaufsdruck.',
    note: 'Kostenlos · Discord oder E-Mail',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: 'Direkt live',
    text: 'Statt Figma-Mockups deployen wir das Design direkt als Vorschau-URL — du siehst Layout, Farben und Animationen sofort so, wie sie am Ende aussehen.',
    note: 'Live-Preview · Kein Figma',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="m9 11 3 3L22 4" />
      </svg>
    ),
    title: 'Feedback & Feinschliff',
    text: 'Du gibst direkt auf der laufenden Seite Feedback — wir passen an, deployen sofort wieder. Keine langen Abstimmungsschleifen, Änderungen sind in Minuten sichtbar.',
    note: 'Iterativ · Schnelle Anpassungen',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
      </svg>
    ),
    title: 'Launch & Übergabe',
    text: 'Wenn alles sitzt, geht die Seite auf deine Domain live. Wir richten Hosting und DNS ein und du bekommst eine vollständige Einweisung — fertig.',
    note: 'Hosting-Setup & Übergabe inklusive',
  },
];

function ProzessSection() {
  return (
    <section id="prozess" className="section">
      <div className="container">
        <div className="section-label-row">
          <span className="dot dot--grün" />
          PROZESS
        </div>
        <div className="section-intro">
          <h2 className="section-title">So läuft&apos;s ab.</h2>
          <p className="section-sub">Kein Figma, kein hin und her mit Mockups — du siehst dein Design sofort live im echten Browser und gibst direkt Feedback.</p>
        </div>
        <div className="prozess-grid">
          {PROZESS_STEPS.map(s => (
            <div key={s.title} className="prozess-step">
              <div className="prozess-step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="prozess-step-note">{s.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReferenzenSection() {
  return (
    <section className="logo-cloud-section referenzen-section">
      <div className="container">
        <p className="logo-cloud-label">Von uns gebaut — live im Netz</p>
        <div className="logo-cloud">
          <a href="https://erdmann-webpage.vercel.app/" className="logo-cloud-item ref-item" target="_blank" rel="noopener">
            <span className="ref-favicon" style={{ background: '#0f172a', color: '#fff' }}>E</span>
            <span className="ref-info">
              <span className="ref-name">Erdmann</span>
              <span className="ref-url">erdmann-webpage.vercel.app</span>
            </span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4, flexShrink: 0 }}>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
          <a href="https://discord.gg/D9GwqWpwHT" className="logo-cloud-item logo-cloud-item--add" target="_blank" rel="noopener">
            <span className="logo-cloud-plus">+</span>
            <span>Dein Projekt hier</span>
          </a>
        </div>
      </div>
    </section>
  );
}

const DESIGN_CARDS = [
  {
    title: 'Logo Design',
    desc: 'Wortmarke, Bildmarke oder Kombination — professionell, zeitlos, skalierbar.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    title: 'Banner & Ads',
    desc: 'Social Media Banner, Web Ads und Hero-Grafiken — für jeden Kanal im richtigen Format.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    title: 'Social Media Kit',
    desc: 'Templates für Instagram, X und Discord — konsistent, editierbar, sofort einsetzbar.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="9" height="9" rx="1" />
        <rect x="13" y="2" width="9" height="9" rx="1" />
        <rect x="2" y="13" width="9" height="9" rx="1" />
        <rect x="13" y="13" width="9" height="9" rx="1" />
      </svg>
    ),
  },
  {
    title: 'Brand Identity',
    desc: 'Logo, Farben, Typografie, Guidelines — dein komplettes Branding in einem Paket.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="10.5" r="2.5" />
        <circle cx="8.5" cy="7.5" r="2.5" /><circle cx="6.5" cy="12.5" r="2.5" />
        <path d="M12 20a2 2 0 0 0 2-2v-1H10v1a2 2 0 0 0 2 2z" /><path d="M10 17H14" />
      </svg>
    ),
  },
];

function DesignStudioSection() {
  return (
    <section id="design" className="section">
      <div className="container">
        <div className="section-label-row">
          <span className="dot dot--blau" />
          DESIGN STUDIO
        </div>
        <div className="section-intro">
          <h2 className="section-title">Nicht nur Code.</h2>
          <p className="section-sub">Wir designen auch — Logos, Banner, Social Media Grafiken und komplette Brand Identities. Alles aus einer Hand.</p>
        </div>
        <div className="design-services-grid">
          {DESIGN_CARDS.map(c => (
            <div key={c.title} className="design-card">
              <div className="design-card-icon">{c.icon}</div>
              <div className="design-card-title">{c.title}</div>
              <div className="design-card-desc">{c.desc}</div>
              <span className="design-card-tag">Auf Anfrage</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a href="/design.html" className="btn-primary">Design Services ansehen →</a>
        </div>
      </div>
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
    q: 'Was kostet eine Website bei euch?',
    a: 'Das hängt vom Umfang ab. Die Pakete starten ab 400 € (Launch, 1 Seite) und gehen bis ab 1.500 € (Advanced, bis zu 9 Seiten). Bei individuellen Anforderungen erstellen wir dir ein maßgeschneidertes Angebot.',
  },
  {
    q: 'Wie lange dauert die Entwicklung?',
    a: 'Beim Launch-Paket ca. 1 Woche, beim Advanced-Paket ca. 2 Wochen — je nach Komplexität und wie schnell Feedback kommt. Wir kommunizieren transparent über den Fortschritt.',
  },
  {
    q: 'Welche Technologien verwendet ihr?',
    a: 'Wir bauen hauptsächlich mit Next.js, React, TypeScript, Tailwind CSS und shadcn/ui. Hosting läuft in der Regel über Vercel — schnell, zuverlässig, skalierbar.',
  },
  {
    q: 'Kann ich die Website nach dem Launch selbst bearbeiten?',
    a: 'Ja. Wir geben dir eine vollständige Einweisung und können auf Wunsch ein einfaches CMS (z.B. Sanity oder Contentlayer) integrieren, sodass du Inhalte selbst pflegen kannst.',
  },
  {
    q: 'Was brauche ich, um anzufangen?',
    a: 'Einfach auf Discord melden und kurz beschreiben was du dir vorstellst. Wir klären alles im Gespräch — du brauchst nichts weiter vorzubereiten.',
  },
  {
    q: 'Gibt es laufende Kosten?',
    a: 'Für Hosting über Vercel gibt es einen großzügigen kostenlosen Plan, der für die meisten Projekte reicht. Bei größeren Anforderungen fallen kleine monatliche Kosten an — wir beraten dich dabei ehrlich.',
  },
  {
    q: 'Was passiert, wenn ich nach dem Launch etwas ändern will?',
    a: 'Kleine Anpassungen machen wir gerne unkompliziert. Für größere Änderungen oder laufende Betreuung bieten wir individuelle Wartungsverträge an — sprich uns einfach an.',
  },
  {
    q: 'Habt ihr auch eigene Produkte?',
    a: 'Ja — neben Webdesign entwickeln wir unter dem Flux Network eigene digitale Produkte wie LumaSpace (KI-Produktivitätstool) und FlowWave (Discord-Bot-Builder). Mehr dazu weiter oben auf der Seite.',
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
          <h2>Lass uns deine Website bauen.</h2>
          <p>Schreib uns auf Discord — kostenloses Erstgespräch, kein Verkaufsdruck, direkte Antworten.</p>
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

