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
      </div>
      <VylderCard />
      <Vex0Section />
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

function Vex0Section() {
  return (
    <section className="vex0-section section">
      <div className="container">
        <div className="vex0-split">
          <div className="vex0-text">
            <div className="section-label-row">
              <span className="dot" />
              VEX0 FRAMEWORK
            </div>
            <h2 className="section-title">Copy.<br />Paste.<br />Done.</h2>
            <p className="section-sub">
              Das Open-Source Component Framework von Flux Network. Komponenten kopieren, einfügen, fertig — kein Wrapper, kein Lock-in. Dein Code, deine Regeln.
            </p>
            <a href="/docs" className="btn-primary" style={{ display: 'inline-flex', marginTop: '8px' }}>
              Docs ansehen →
            </a>
          </div>
          <div className="vex0-code">
            <div className="code-block">
              <div className="code-block-header">
                <span className="code-block-filename">example.tsx</span>
                <div className="code-block-dots">
                  <span /><span /><span />
                </div>
              </div>
              <pre><code>{`import { Button } from "@/components/vex0/button"
import { Card, CardContent } from "@/components/vex0/card"

export function Example() {
  return (
    <Card>
      <CardContent>
        <h3>Flux Network</h3>
        <p>Tools. Produkte. Indikatoren.</p>
        <Button variant="outline">
          Mehr erfahren →
        </Button>
      </CardContent>
    </Card>
  )
}`}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VylderCard() {
  return (
    <div className="vylder-card-wrap">
      <div className="vylder-card">
        <div className="vylder-card-top">
          <span className="vylder-badge">Coming Soon</span>
          <span className="vylder-name">Vylder</span>
        </div>
        <p className="vylder-desc">
          Der Website-Builder, der Code versteht. Jede Library importierbar — visuell designen, im Code verfeinern.
        </p>
        <a
          href="https://vylder.dev"
          className="vylder-notify"
          target="_blank"
          rel="noopener"
        >
          vylder.dev →
        </a>
      </div>
    </div>
  );
}

const PRODUCTS = [
  {
    icon: '/lumaspace-icon.png' as string | null,
    name: 'LumaSpace',
    status: 'Live',
    statusClass: 'product-status--live',
    desc: 'KI-gestützte Produktivitätssysteme für Teams und Solo-Worker. Planung, Fokusarbeit und automatisierte Workflows — in einer Plattform.',
    tags: ['AI Planning', 'Realtime Collaboration', 'Task Orchestration', 'Focus & Scheduling'],
    href: 'https://lumaspace.de/',
  },
  {
    icon: '/flowwave-icon.png' as string | null,
    name: 'FlowWave',
    status: 'Open Beta',
    statusClass: 'product-status--dev',
    desc: 'Discord-Bots ohne Boilerplate. Slash Commands, Events und UI-Komponenten visuell aufsetzen — powered by pycord v2. Minuten statt Stunden.',
    tags: ['pycord v2', 'Slash Commands', 'Bot Builder', 'Visual Editor'],
    href: 'https://flowwave.app',
  },
  {
    icon: '/lyqdex-icon.PNG' as string | null,
    name: 'LyqDex',
    status: 'In Entwicklung',
    statusClass: 'product-status--dev',
    desc: 'Onchain-Exchange-Protokoll der nächsten Generation. Fokus auf Liquidität, Effizienz und vollständige Transparenz — gebaut für die Zukunft von DeFi.',
    tags: ['Onchain DEX', 'Liquidity Pools', 'Streaming Transactions', 'DeFi Analytics'],
    href: 'https://lyqdex.io',
  },
  {
    icon: null,
    name: 'Vex0',
    status: 'In Entwicklung',
    statusClass: 'product-status--dev',
    desc: 'Das Component Framework von Flux Network. Einfach kopieren, einfügen, anpassen — kein Wrapper-Overhead, kein Lock-in. Funktioniert mit jedem React-Projekt.',
    tags: ['React', 'Open Source', 'Components', 'TypeScript'],
    href: '/docs',
  },
  {
    icon: null,
    name: 'Vylder',
    status: 'Coming Soon',
    statusClass: 'product-status--dev',
    desc: 'Der Website-Builder, der Code versteht. Visuell designen, im Code verfeinern — und jede beliebige Library direkt importieren. Radix UI, shadcn/ui, dein eigenes Package. Kein Limit.',
    tags: ['Visual Builder', 'Code Editor', 'Any Library', 'No-Code & Code'],
    href: 'https://vylder.dev',
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
          <h2 className="section-title">Was wir bauen.</h2>
          <p className="section-sub">Fünf Produkte. Unterschiedliche Domänen. Derselbe Anspruch.</p>
        </div>
        <div className="products-list">
          {PRODUCTS.map(p => (
            <div key={p.name} className="product-card">
              <div className="product-card-left">
                <div className="product-icon">
                  {p.icon ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={p.icon} alt={p.name} className="product-logo-icon" />
                  ) : (
                    <span className="product-logo-fallback">{p.name[0]}</span>
                  )}
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
              <a href={p.href} className="btn-primary" {...(p.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>Öffnen →</a>
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
    a: 'Vex0 ist das Open-Source Component Framework von Flux Network. Komponenten einfach kopieren, ins Projekt einfügen und anpassen — kein Wrapper, kein Lock-in.',
  },
  {
    q: 'Was ist Vylder?',
    a: 'Vylder ist unser visueller Website-Builder — visuell designen, im Code verfeinern, und jede beliebige Library importieren. Radix UI, shadcn/ui, dein eigenes Package. Mehr auf vylder.dev.',
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
          <p className="section-sub">Kurz, klar — alles, was du wissen musst.</p>
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
          <h2>Als Erstes dabei sein.</h2>
          <p>Im Discord kriegst du Early Access, Beta-Releases und Updates zu Vex0, Vylder und allen anderen Produkten — bevor alle anderen.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 4 }}>
            <a href="https://discord.gg/D9GwqWpwHT" className="btn-primary" target="_blank" rel="noopener">
              <DiscordIcon /> Discord joinen
            </a>
            <a href="#products" className="btn-ghost">Produkte ansehen</a>
          </div>
        </div>
      </div>
    </section>
  );
}

