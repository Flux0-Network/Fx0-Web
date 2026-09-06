import type { Metadata } from 'next';
import ScrollReveal from '@/components/landing/ScrollReveal';
import PerspectiveGrid from '@/components/landing/PerspectiveGrid';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import CookieNotice from '@/components/landing/CookieNotice';
import SiteFooter from '@/components/landing/SiteFooter';
import EarlyAccessForm from '@/components/landing/EarlyAccessForm';

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
      <div className="above-fold-wrapper" style={{ position: 'relative' }}>
        <PerspectiveGrid />
        <span className="br br-tl" /><span className="br br-tr" />
        <span className="br br-bl" /><span className="br br-br" />
        <HeroSection />
      </div>
      <StatsStrip />
      <LumaSpaceSection />
      <FlowWaveSection />
      <VylderCard />
      <Vex0Section />
      <RoadmapSection />
      <DashboardSection />
      <FaqSection />
      <PartnersSection />
      <CtaSection />
      <SiteFooter />
      <CookieNotice />
    </>
  );
}

// ── Static sections ────────────────────────────────────────────────────────

const kw = (s: string) => `<span style="color:#c678dd">${s}</span>`;
const str = (s: string) => `<span style="color:#98c379">${s}</span>`;
const comp = (s: string) => `<span style="color:#61afef">${s}</span>`;
const htag = (s: string) => `<span style="color:#e06c75">${s}</span>`;
const attr = (s: string) => `<span style="color:#9cdcfe">${s}</span>`;
const fn = (s: string) => `<span style="color:#dcdcaa">${s}</span>`;
const pn = (s: string) => `<span style="color:rgba(255,255,255,0.35)">${s}</span>`;

const VEX0_CODE_HTML = [
  `${kw('import')} ${pn('{')} ${comp('Button')} ${pn('}')} ${kw('from')} ${str('"@/components/vex0/button"')}`,
  `${kw('import')} ${pn('{')} ${comp('Card')}${pn(',')} ${comp('CardContent')} ${pn('}')} ${kw('from')} ${str('"@/components/vex0/card"')}`,
  ``,
  `${kw('export')} ${kw('function')} ${fn('Example')}${pn('() {')}`,
  `  ${kw('return')} ${pn('(')}`,
  `    ${pn('&lt;')}${comp('Card')}${pn('&gt;')}`,
  `      ${pn('&lt;')}${comp('CardContent')}${pn('&gt;')}`,
  `        ${pn('&lt;')}${htag('h3')}${pn('&gt;')}Flux Network${pn('&lt;/')}${htag('h3')}${pn('&gt;')}`,
  `        ${pn('&lt;')}${htag('p')}${pn('&gt;')}Tools. Produkte. Indikatoren.${pn('&lt;/')}${htag('p')}${pn('&gt;')}`,
  `        ${pn('&lt;')}${comp('Button')} ${attr('variant')}${pn('=')}${str('"outline"')}${pn('&gt;')}`,
  `          Mehr erfahren →`,
  `        ${pn('&lt;/')}${comp('Button')}${pn('&gt;')}`,
  `      ${pn('&lt;/')}${comp('CardContent')}${pn('&gt;')}`,
  `    ${pn('&lt;/')}${comp('Card')}${pn('&gt;')}`,
  `  ${pn(')')}`,
  `${pn('}')}`,
].join('\n');

function Vex0Section() {
  return (
    <section id="vex0" className="vex0-section section">
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
              <pre><code dangerouslySetInnerHTML={{ __html: VEX0_CODE_HTML }} /></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsStrip() {
  const items = [
    { val: '5+', label: 'Produkte im Ökosystem' },
    { val: '2',  label: 'Live' },
    { val: '2',  label: 'In Entwicklung' },
    { val: '∞',  label: 'Open Community' },
  ];
  return (
    <div className="stats-strip hatch-bg" style={{ position: 'relative' }}>
      <span className="br br-tl" /><span className="br br-tr" />
      <span className="br br-bl" /><span className="br br-br" />
      <div className="container">
        <div className="stats-strip-inner">
          {items.map((s, i) => (
            <div key={i} className="stats-strip-item">
              <span className="stats-strip-val">{s.val}</span>
              <span className="stats-strip-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const ROADMAP_ITEMS = [
  { name: 'LumaSpace',    desc: 'KI-gestütztes Produktivitätssystem für Teams', status: 'Live',  cls: 'rm-live',  href: 'https://lumaspace.de/' },
  { name: 'FlowWave',     desc: 'Discord-Bots visuell bauen — ohne Boilerplate', status: 'Beta',  cls: 'rm-beta',  href: 'https://flowwave.app' },
  { name: 'Vex0',         desc: 'Open Source Component Framework',              status: 'Dev',   cls: 'rm-dev',   href: '#vex0' },
  { name: 'Vylder',       desc: 'Visueller Website-Builder mit Code-Editor',    status: 'Dev',   cls: 'rm-dev',   href: '#vylder' },
  { name: 'Indikatoren',  desc: 'TradingView Pine Script Strategien & Tools',   status: 'Bald',  cls: 'rm-soon',  href: '#' },
];

function RoadmapSection() {
  return (
    <section id="roadmap" className="roadmap-section section">
      <div className="container">
        <div className="section-label-row">ROADMAP</div>
        <div className="section-intro">
          <h2 className="section-title">Was wir bauen.</h2>
          <p className="section-sub">Von Live bis Coming Soon — das Flux Network Ökosystem wächst.</p>
        </div>
        <div className="roadmap-list">
          {ROADMAP_ITEMS.map((item, i) => (
            <a
              key={item.name}
              href={item.href}
              className="roadmap-item"
              {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
            >
              <span className="roadmap-num">0{i + 1}</span>
              <div className="roadmap-info">
                <span className="roadmap-name">{item.name}</span>
                <span className="roadmap-desc">{item.desc}</span>
              </div>
              <span className={`roadmap-status ${item.cls}`}>{item.status}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function LumaSpaceMockup() {
  const tasks = [
    { done: true,  label: 'Design Review',   tag: 'Fertig',    tagCls: 'luma-tag-done' },
    { done: false, label: 'API Integration', tag: 'In Arbeit', tagCls: 'luma-tag-wip' },
    { done: false, label: 'Dokumentation',   tag: 'Offen',     tagCls: 'luma-tag-open' },
  ];
  return (
    <div className="luma-mock">
      <div className="luma-mock-bar">
        <span className="dmock-dot" style={{ background: '#ff5f57' }} />
        <span className="dmock-dot" style={{ background: '#ffbd2e' }} />
        <span className="dmock-dot" style={{ background: '#28c840' }} />
        <span className="luma-mock-url">lumaspace.de/workspace</span>
      </div>
      <div className="luma-mock-body">
        <div className="luma-mock-sidebar">
          <div className="luma-mock-sidebar-title">Projekte</div>
          {['Flux Network', 'Client A', 'Side Project'].map((p, i) => (
            <div key={p} className={`luma-mock-proj${i === 0 ? ' active' : ''}`}>{p}</div>
          ))}
          <div className="luma-mock-ai-hint">✨ KI-Vorschlag</div>
        </div>
        <div className="luma-mock-main">
          <div className="luma-mock-day">Heute</div>
          {tasks.map(t => (
            <div key={t.label} className={`luma-mock-task${t.done ? ' done' : ''}`}>
              <span className="luma-mock-check">{t.done ? '✓' : '○'}</span>
              <span className="luma-mock-task-label">{t.label}</span>
              <span className={`luma-mock-tag ${t.tagCls}`}>{t.tag}</span>
            </div>
          ))}
          <div className="luma-mock-suggestion">
            <span>🤖</span>
            <span>Focus-Block um 14:00 Uhr empfohlen</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LumaSpaceSection() {
  return (
    <section id="produkte" className="product-spotlight section">
      <div className="container">
        <div className="product-split">
          <div className="product-split-text">
            <div className="section-label-row">LUMASPACE</div>
            <h2 className="section-title">Planung.<br />KI-gestützt.</h2>
            <p className="section-sub">
              KI-gestütztes Produktivitätssystem für Teams und Solo-Worker — Planung, Fokusarbeit und automatisierte Workflows in einer Plattform.
            </p>
            <ul className="feature-list">
              <li>KI schlägt Focus-Blöcke & Tasks vor</li>
              <li>Realtime Collaboration im Team</li>
              <li>Automatisierte Workflows</li>
            </ul>
            <a href="https://lumaspace.de/" className="btn-primary" target="_blank" rel="noopener" style={{ display: 'inline-flex', marginTop: '8px' }}>
              LumaSpace öffnen →
            </a>
          </div>
          <div className="product-split-visual">
            <LumaSpaceMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowWaveMockup() {
  const commands = ['/info', '/ping', '/help', '/stats'];
  return (
    <div className="flow-mock">
      <div className="flow-mock-bar">
        <span className="dmock-dot" style={{ background: '#ff5f57' }} />
        <span className="dmock-dot" style={{ background: '#ffbd2e' }} />
        <span className="dmock-dot" style={{ background: '#28c840' }} />
        <span className="flow-mock-url">flowwave.app/builder</span>
      </div>
      <div className="flow-mock-body">
        <div className="flow-mock-sidebar">
          <div className="flow-mock-sidebar-title">Commands</div>
          {commands.map((cmd, i) => (
            <div key={cmd} className={`flow-mock-cmd${i === 0 ? ' active' : ''}`}>{cmd}</div>
          ))}
          <div className="flow-mock-add">+ Neu</div>
        </div>
        <div className="flow-mock-editor">
          <div className="flow-mock-cmd-title">/info</div>
          <div className="flow-mock-cmd-sub">Antwort: Embed</div>
          <div className="flow-mock-embed">
            <div className="flow-mock-embed-bar" />
            <div className="flow-mock-embed-name">Flux Network Info</div>
            <div className="flow-mock-embed-row">Version: 1.0.0</div>
            <div className="flow-mock-embed-row" style={{ color: '#4ade80' }}>Status: ✓ Online</div>
          </div>
          <div className="flow-mock-trigger">
            <span className="flow-mock-trigger-label">Trigger</span>
            <span className="flow-mock-trigger-val">Slash Command</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowWaveSection() {
  return (
    <section className="product-spotlight section">
      <div className="container">
        <div className="product-split product-split--reverse">
          <div className="product-split-visual">
            <FlowWaveMockup />
          </div>
          <div className="product-split-text">
            <div className="section-label-row">FLOWWAVE</div>
            <h2 className="section-title">Discord Bots.<br />Ohne Boilerplate.</h2>
            <p className="section-sub">
              Slash Commands, Events und UI-Komponenten visuell aufsetzen — powered by pycord v2. Minuten statt Stunden.
            </p>
            <ul className="feature-list">
              <li>Visueller Command-Builder</li>
              <li>Slash Commands & Events ohne Code</li>
              <li>Powered by pycord v2</li>
            </ul>
            <a href="https://flowwave.app" className="btn-primary" target="_blank" rel="noopener" style={{ display: 'inline-flex', marginTop: '8px' }}>
              FlowWave öffnen →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function VylderCard() {
  return (
    <div id="vylder" className="vylder-card-wrap">
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
    icon: '/vylder-icon.png' as string | null,
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

function DashboardMockup() {
  const navItems = ['Übersicht', 'Produkte', 'Early Access', 'Einstellungen'];
  const products = [
    { name: 'LumaSpace', status: 'Live', color: '#22c55e' },
    { name: 'FlowWave',  status: 'Beta', color: '#f59e0b' },
    { name: 'Vex0',      status: 'Dev',  color: '#888' },
  ];
  return (
    <div className="dmock">
      <div className="dmock-bar">
        <span className="dmock-dot" style={{ background: '#ff5f57' }} />
        <span className="dmock-dot" style={{ background: '#ffbd2e' }} />
        <span className="dmock-dot" style={{ background: '#28c840' }} />
        <span className="dmock-url">flux0.dev/dashboard</span>
      </div>
      <div className="dmock-body">
        <div className="dmock-sidebar">
          {navItems.map((item, i) => (
            <div key={item} className={`dmock-nav${i === 0 ? ' dmock-nav--active' : ''}`}>{item}</div>
          ))}
        </div>
        <div className="dmock-main">
          <div className="dmock-welcome">Willkommen zurück</div>
          <div className="dmock-stats">
            <div className="dmock-stat"><span className="dmock-stat-val">5</span><span className="dmock-stat-label">Produkte</span></div>
            <div className="dmock-stat"><span className="dmock-stat-val" style={{ color: '#22c55e' }}>Early</span><span className="dmock-stat-label">Access</span></div>
          </div>
          <div className="dmock-list">
            {products.map(p => (
              <div key={p.name} className="dmock-row">
                <span className="dmock-row-dot" style={{ background: p.color }} />
                <span className="dmock-row-name">{p.name}</span>
                <span className="dmock-row-status">{p.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardSection() {
  return (
    <section className="dashboard-section section">
      <div className="container">
        <div className="dashboard-split">
          <div className="dashboard-text">
            <div className="section-label-row">
              <span className="dot" />
              DASHBOARD
            </div>
            <h2 className="section-title">Dein Hub.<br />Alles drin.</h2>
            <p className="section-sub">
              Ein Ort für alle Flux Network Produkte. Early Access verwalten, Beta-Releases freischalten und den Status aller Tools im Blick behalten — Login via Discord.
            </p>
            <a href="/dashboard" className="btn-primary" style={{ display: 'inline-flex', marginTop: '8px' }}>
              Dashboard öffnen →
            </a>
          </div>
          <div className="dashboard-preview">
            <DashboardMockup />
          </div>
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
    <section id="faq" className="section hatch-bg" style={{ position: 'relative' }}>
      <span className="br br-tl" /><span className="br br-tr" />
      <span className="br br-bl" /><span className="br br-br" />
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
    <section className="cta section hatch-bg" style={{ position: 'relative', borderLeft: 'none', borderRight: 'none' }}>
      <div className="container">
        <div className="cta-inner">
          <div className="section-label-row">
            <span className="dot dot--grün" />
            EARLY ACCESS
          </div>
          <h2>Als Erstes dabei sein.</h2>
          <p>Trag deine Email ein oder join unseren Discord — du kriegst Early Access, Beta-Releases und Updates zu Vex0, Vylder und allen anderen Produkten bevor alle anderen.</p>
          <EarlyAccessForm />
          <div className="cta-divider"><span>oder</span></div>
          <a href="https://discord.gg/D9GwqWpwHT" className="btn-ghost" target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <DiscordIcon /> Discord joinen
          </a>
        </div>
      </div>
    </section>
  );
}

