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
      <VylderCard />
      <Vex0Section />
      <RoadmapSection />
      <ChangelogSection />
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
              <span className="lang-de">Das Open-Source Component Framework von Flux Network. Komponenten kopieren, einfügen, fertig — kein Wrapper, kein Lock-in. Dein Code, deine Regeln.</span>
              <span className="lang-en">The Open-Source Component Framework by Flux Network. Copy components, paste them, done — no wrapper, no lock-in. Your code, your rules.</span>
            </p>
            <a href="/docs" className="btn-primary" style={{ display: 'inline-flex', marginTop: '8px' }}>
              <span className="lang-de">Docs ansehen →</span>
              <span className="lang-en">View Docs →</span>
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
    { val: '5+', de: 'Produkte im Ökosystem', en: 'Products in Ecosystem' },
    { val: '2',  de: 'Live',                  en: 'Live'                  },
    { val: '2',  de: 'In Entwicklung',        en: 'In Development'        },
    { val: '∞',  de: 'Open Community',        en: 'Open Community'        },
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
              <span className="stats-strip-label">
                <span className="lang-de">{s.de}</span>
                <span className="lang-en">{s.en}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const ROADMAP_ITEMS = [
  { name: 'LumaSpace',   descDe: 'KI-gestütztes Produktivitätssystem für Teams',  descEn: 'AI-powered productivity system for teams',          status: 'Live',  statusEn: 'Live',  cls: 'rm-live',  href: 'https://lumaspace.de/' },
  { name: 'FlowWave',    descDe: 'Discord-Bots visuell bauen — ohne Boilerplate', descEn: 'Build Discord bots visually — without boilerplate', status: 'Beta',  statusEn: 'Beta',  cls: 'rm-beta',  href: 'https://flowwave.app' },
  { name: 'Vex0',        descDe: 'Open Source Component Framework',               descEn: 'Open Source Component Framework',                   status: 'Dev',   statusEn: 'Dev',   cls: 'rm-dev',   href: '#vex0' },
  { name: 'Vylder',      descDe: 'Visueller Website-Builder mit Code-Editor',     descEn: 'Visual website builder with code editor',           status: 'Dev',   statusEn: 'Dev',   cls: 'rm-dev',   href: '#vylder' },
  { name: 'Indikatoren', descDe: 'TradingView Pine Script Strategien & Tools',    descEn: 'TradingView Pine Script strategies & tools',        status: 'Bald',  statusEn: 'Soon',  cls: 'rm-soon',  href: '#' },
];

function RoadmapSection() {
  return (
    <section id="roadmap" className="roadmap-section section">
      <div className="container">
        <div className="section-label-row">ROADMAP</div>
        <div className="section-intro">
          <h2 className="section-title">
            <span className="lang-de">Was wir bauen.</span>
            <span className="lang-en">What we&apos;re building.</span>
          </h2>
          <p className="section-sub">
            <span className="lang-de">Von Live bis Coming Soon — das Flux Network Ökosystem wächst.</span>
            <span className="lang-en">From Live to Coming Soon — the Flux Network ecosystem grows.</span>
          </p>
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
                <span className="roadmap-desc">
                  <span className="lang-de">{item.descDe}</span>
                  <span className="lang-en">{item.descEn}</span>
                </span>
              </div>
              <span className={`roadmap-status ${item.cls}`}>
                <span className="lang-de">{item.status}</span>
                <span className="lang-en">{item.statusEn}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const CHANGELOG_ITEMS = [
  {
    date: 'Sep 2026',
    product: 'LumaSpace',
    version: 'v1.2.0',
    tagCls: 'cl-tag--luma',
    descDe: 'KI-Focus-Blöcke mit Kalender-Sync & verbesserter Task-Priorisierung',
    descEn: 'AI focus blocks with calendar sync & improved task prioritization',
  },
  {
    date: 'Aug 2026',
    product: 'FlowWave',
    version: 'v0.8.0',
    tagCls: 'cl-tag--flow',
    descDe: 'Event-Handler für Reaction Roles und verbesserter Embed-Builder',
    descEn: 'Event handlers for reaction roles and improved embed builder',
  },
  {
    date: 'Jul 2026',
    product: 'Vex0',
    version: 'v0.3.0',
    tagCls: 'cl-tag--vex',
    descDe: 'Button, Card & Badge Komponenten — Open Source auf GitHub',
    descEn: 'Button, Card & Badge components — open source on GitHub',
  },
  {
    date: 'Jun 2026',
    product: 'LumaSpace',
    version: 'v1.1.0',
    tagCls: 'cl-tag--luma',
    descDe: 'Realtime Collaboration — mehrere Nutzer gleichzeitig im selben Workspace',
    descEn: 'Realtime collaboration — multiple users simultaneously in the same workspace',
  },
  {
    date: 'Mai 2026',
    product: 'FlowWave',
    version: 'v0.7.0',
    tagCls: 'cl-tag--flow',
    descDe: 'Slash Command Builder Launch — Discord Bots ohne eine Zeile Code',
    descEn: 'Slash Command Builder launch — Discord bots without a single line of code',
  },
];

function ChangelogSection() {
  return (
    <section className="changelog-section section">
      <div className="container">
        <div className="section-label-row">
          <span className="dot dot--grün" />
          CHANGELOG
        </div>
        <div className="section-intro">
          <h2 className="section-title">
            <span className="lang-de">Was wir shipped haben.</span>
            <span className="lang-en">What we&apos;ve shipped.</span>
          </h2>
          <p className="section-sub">
            <span className="lang-de">Letzte Updates aus dem Flux Network Ökosystem.</span>
            <span className="lang-en">Latest updates from the Flux Network ecosystem.</span>
          </p>
        </div>
        <div className="changelog-list">
          {CHANGELOG_ITEMS.map((item, i) => (
            <div key={i} className="changelog-item">
              <div className="changelog-meta">
                <span className="changelog-date">{item.date}</span>
                <span className={`changelog-tag ${item.tagCls}`}>{item.product}</span>
                <span className="changelog-version">{item.version}</span>
              </div>
              <p className="changelog-desc">
                <span className="lang-de">{item.descDe}</span>
                <span className="lang-en">{item.descEn}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="changelog-footer">
          <a href="/changelog" className="btn-ghost" style={{ display: 'inline-flex', fontSize: '0.85rem' }}>
            <span className="lang-de">Alle Updates ansehen →</span>
            <span className="lang-en">View all updates →</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function LumaSpaceMockup() {
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
          <div className="luma-mock-sidebar-title">
            <span className="lang-de">Projekte</span>
            <span className="lang-en">Projects</span>
          </div>
          {['Flux Network', 'Client A', 'Side Project'].map((p, i) => (
            <div key={p} className={`luma-mock-proj${i === 0 ? ' active' : ''}`}>{p}</div>
          ))}
          <div className="luma-mock-ai-hint">
            <span className="lang-de">✨ KI-Vorschlag</span>
            <span className="lang-en">✨ AI Suggestion</span>
          </div>
        </div>
        <div className="luma-mock-main">
          <div className="luma-mock-day">
            <span className="lang-de">Heute</span>
            <span className="lang-en">Today</span>
          </div>
          <div className="luma-mock-task done">
            <span className="luma-mock-check">✓</span>
            <span className="luma-mock-task-label">Design Review</span>
            <span className="luma-mock-tag luma-tag-done">
              <span className="lang-de">Fertig</span>
              <span className="lang-en">Done</span>
            </span>
          </div>
          <div className="luma-mock-task">
            <span className="luma-mock-check">○</span>
            <span className="luma-mock-task-label">API Integration</span>
            <span className="luma-mock-tag luma-tag-wip">
              <span className="lang-de">In Arbeit</span>
              <span className="lang-en">In Progress</span>
            </span>
          </div>
          <div className="luma-mock-task">
            <span className="luma-mock-check">○</span>
            <span className="luma-mock-task-label">
              <span className="lang-de">Dokumentation</span>
              <span className="lang-en">Documentation</span>
            </span>
            <span className="luma-mock-tag luma-tag-open">
              <span className="lang-de">Offen</span>
              <span className="lang-en">Open</span>
            </span>
          </div>
          <div className="luma-mock-suggestion">
            <span>🤖</span>
            <span>
              <span className="lang-de">Focus-Block um 14:00 Uhr empfohlen</span>
              <span className="lang-en">Focus block at 2:00 PM suggested</span>
            </span>
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
            <h2 className="section-title">
              <span className="lang-de">Planung.<br />KI-gestützt.</span>
              <span className="lang-en">Planning.<br />AI-powered.</span>
            </h2>
            <p className="section-sub">
              <span className="lang-de">KI-gestütztes Produktivitätssystem für Teams und Solo-Worker — Planung, Fokusarbeit und automatisierte Workflows in einer Plattform.</span>
              <span className="lang-en">AI-powered productivity system for teams and solo workers — planning, focus work and automated workflows in one platform.</span>
            </p>
            <ul className="feature-list">
              <li>
                <span className="lang-de">KI schlägt Focus-Blöcke &amp; Tasks vor</span>
                <span className="lang-en">AI suggests focus blocks &amp; tasks</span>
              </li>
              <li>
                <span className="lang-de">Realtime Collaboration im Team</span>
                <span className="lang-en">Realtime team collaboration</span>
              </li>
              <li>
                <span className="lang-de">Automatisierte Workflows</span>
                <span className="lang-en">Automated workflows</span>
              </li>
            </ul>
            <a href="https://lumaspace.de/" className="btn-primary" target="_blank" rel="noopener" style={{ display: 'inline-flex', marginTop: '8px' }}>
              <span className="lang-de">LumaSpace öffnen →</span>
              <span className="lang-en">Open LumaSpace →</span>
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

function VylderCard() {
  return (
    <div id="vylder" className="vylder-card-wrap">
      <div className="vylder-card">
        <div className="vylder-card-top">
          <span className="vylder-badge">Coming Soon</span>
          <span className="vylder-name">Vylder</span>
        </div>
        <p className="vylder-desc">
          <span className="lang-de">Der Website-Builder, der Code versteht. Jede Library importierbar — visuell designen, im Code verfeinern.</span>
          <span className="lang-en">The website builder that understands code. Any library importable — design visually, refine in code.</span>
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
    statusEn: 'Live',
    statusClass: 'product-status--live',
    descDe: 'KI-gestützte Produktivitätssysteme für Teams und Solo-Worker. Planung, Fokusarbeit und automatisierte Workflows — in einer Plattform.',
    descEn: 'AI-powered productivity systems for teams and solo workers. Planning, focus work and automated workflows — in one platform.',
    tags: ['AI Planning', 'Realtime Collaboration', 'Task Orchestration', 'Focus & Scheduling'],
    href: 'https://lumaspace.de/',
  },
  {
    icon: '/flowwave-icon.png' as string | null,
    name: 'FlowWave',
    status: 'Open Beta',
    statusEn: 'Open Beta',
    statusClass: 'product-status--dev',
    descDe: 'Discord-Bots ohne Boilerplate. Slash Commands, Events und UI-Komponenten visuell aufsetzen — powered by pycord v2. Minuten statt Stunden.',
    descEn: 'Discord bots without boilerplate. Set up Slash Commands, events and UI components visually — powered by pycord v2. Minutes instead of hours.',
    tags: ['pycord v2', 'Slash Commands', 'Bot Builder', 'Visual Editor'],
    href: 'https://flowwave.app',
  },
  {
    icon: '/lyqdex-icon.PNG' as string | null,
    name: 'LyqDex',
    status: 'In Entwicklung',
    statusEn: 'In Development',
    statusClass: 'product-status--dev',
    descDe: 'Onchain-Exchange-Protokoll der nächsten Generation. Fokus auf Liquidität, Effizienz und vollständige Transparenz — gebaut für die Zukunft von DeFi.',
    descEn: 'Next-generation onchain exchange protocol. Focus on liquidity, efficiency and full transparency — built for the future of DeFi.',
    tags: ['Onchain DEX', 'Liquidity Pools', 'Streaming Transactions', 'DeFi Analytics'],
    href: 'https://lyqdex.io',
  },
  {
    icon: null,
    name: 'Vex0',
    status: 'In Entwicklung',
    statusEn: 'In Development',
    statusClass: 'product-status--dev',
    descDe: 'Das Component Framework von Flux Network. Einfach kopieren, einfügen, anpassen — kein Wrapper-Overhead, kein Lock-in. Funktioniert mit jedem React-Projekt.',
    descEn: 'The component framework by Flux Network. Simply copy, paste, customize — no wrapper overhead, no lock-in. Works with any React project.',
    tags: ['React', 'Open Source', 'Components', 'TypeScript'],
    href: '/docs',
  },
  {
    icon: '/vylder-icon.png' as string | null,
    name: 'Vylder',
    status: 'Coming Soon',
    statusEn: 'Coming Soon',
    statusClass: 'product-status--dev',
    descDe: 'Der Website-Builder, der Code versteht. Visuell designen, im Code verfeinern — und jede beliebige Library direkt importieren. Radix UI, shadcn/ui, dein eigenes Package. Kein Limit.',
    descEn: 'The website builder that understands code. Design visually, refine in code — and import any library directly. Radix UI, shadcn/ui, your own package. No limits.',
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
          <span className="lang-de">PRODUKTE</span>
          <span className="lang-en">PRODUCTS</span>
        </div>
        <div className="section-intro">
          <h2 className="section-title">
            <span className="lang-de">Was wir bauen.</span>
            <span className="lang-en">What we&apos;re building.</span>
          </h2>
          <p className="section-sub">
            <span className="lang-de">Fünf Produkte. Unterschiedliche Domänen. Derselbe Anspruch.</span>
            <span className="lang-en">Five products. Different domains. Same standard.</span>
          </p>
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
                  <span className={`product-status ${p.statusClass}`}>
                    <span className="lang-de">{p.status}</span>
                    <span className="lang-en">{p.statusEn}</span>
                  </span>
                </div>
              </div>
              <p className="product-desc">
                <span className="lang-de">{p.descDe}</span>
                <span className="lang-en">{p.descEn}</span>
              </p>
              <ul className="product-tags">
                {p.tags.map(t => <li key={t}>{t}</li>)}
              </ul>
              <a href={p.href} className="btn-primary" {...(p.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>
                <span className="lang-de">Öffnen →</span>
                <span className="lang-en">Open →</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardMockup() {
  const navDe = ['Übersicht', 'Produkte', 'Early Access', 'Einstellungen'];
  const navEn = ['Overview', 'Products', 'Early Access', 'Settings'];
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
          {navDe.map((item, i) => (
            <div key={item} className={`dmock-nav${i === 0 ? ' dmock-nav--active' : ''}`}>
              <span className="lang-de">{item}</span>
              <span className="lang-en">{navEn[i]}</span>
            </div>
          ))}
        </div>
        <div className="dmock-main">
          <div className="dmock-welcome">
            <span className="lang-de">Willkommen zurück</span>
            <span className="lang-en">Welcome back</span>
          </div>
          <div className="dmock-stats">
            <div className="dmock-stat">
              <span className="dmock-stat-val">5</span>
              <span className="dmock-stat-label">
                <span className="lang-de">Produkte</span>
                <span className="lang-en">Products</span>
              </span>
            </div>
            <div className="dmock-stat">
              <span className="dmock-stat-val" style={{ color: '#22c55e' }}>Early</span>
              <span className="dmock-stat-label">Access</span>
            </div>
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
            <h2 className="section-title">
              <span className="lang-de">Dein Hub.<br />Alles drin.</span>
              <span className="lang-en">Your Hub.<br />All in one.</span>
            </h2>
            <p className="section-sub">
              <span className="lang-de">Ein Ort für alle Flux Network Produkte. Early Access verwalten, Beta-Releases freischalten und den Status aller Tools im Blick behalten — Login via Discord.</span>
              <span className="lang-en">One place for all Flux Network products. Manage Early Access, unlock beta releases and track the status of all tools — login via Discord.</span>
            </p>
            <a href="/dashboard" className="btn-primary" style={{ display: 'inline-flex', marginTop: '8px' }}>
              <span className="lang-de">Dashboard öffnen →</span>
              <span className="lang-en">Open Dashboard →</span>
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
        <p className="logo-cloud-label">
          <span className="lang-de">Discord Partner &amp; befreundete Server</span>
          <span className="lang-en">Discord Partners &amp; friendly servers</span>
        </p>
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
            <span>
              <span className="lang-de">Partner werden</span>
              <span className="lang-en">Become a Partner</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  {
    qDe: 'Was ist Flux Network?',
    qEn: 'What is Flux Network?',
    aDe: 'Flux Network ist ein digitales Produktstudio — wir bauen eigene Software-Produkte, Developer-Frameworks, TradingView-Indikatoren und Tools für die nächste Generation.',
    aEn: 'Flux Network is a digital product studio — we build our own software products, developer frameworks, TradingView indicators and tools for the next generation.',
  },
  {
    qDe: 'Was ist Vex0?',
    qEn: 'What is Vex0?',
    aDe: 'Vex0 ist das Open-Source Component Framework von Flux Network. Komponenten einfach kopieren, ins Projekt einfügen und anpassen — kein Wrapper, kein Lock-in.',
    aEn: 'Vex0 is the Open-Source Component Framework by Flux Network. Simply copy, paste into the project and customize — no wrapper, no lock-in.',
  },
  {
    qDe: 'Was ist Vylder?',
    qEn: 'What is Vylder?',
    aDe: 'Vylder ist unser visueller Website-Builder — visuell designen, im Code verfeinern, und jede beliebige Library importieren. Radix UI, shadcn/ui, dein eigenes Package. Mehr auf vylder.dev.',
    aEn: 'Vylder is our visual website builder — design visually, refine in code, and import any library. Radix UI, shadcn/ui, your own package. More at vylder.dev.',
  },
  {
    qDe: 'Was sind die TradingView-Indikatoren?',
    qEn: 'What are the TradingView indicators?',
    aDe: 'Wir entwickeln Pine Script Indikatoren und Strategien für TradingView — von einfachen Overlay-Indikatoren bis zu kompletten automatisierten Strategien. Coming Soon.',
    aEn: 'We develop Pine Script indicators and strategies for TradingView — from simple overlay indicators to complete automated strategies. Coming Soon.',
  },
  {
    qDe: 'Wie kann ich auf dem Laufenden bleiben?',
    qEn: 'How can I stay up to date?',
    aDe: 'Tritt unserem Discord bei — dort posten wir Updates zu allen Produkten, Early Access und Beta-Releases als Erstes.',
    aEn: "Join our Discord — that's where we post updates about all products, Early Access and beta releases first.",
  },
  {
    qDe: 'Sind die Produkte kostenlos?',
    qEn: 'Are the products free?',
    aDe: 'Vex0 ist Open Source und kostenlos. Für LumaSpace, FlowWave und die Indikatoren gibt es kostenlose und kostenpflichtige Pläne — je nach Produkt unterschiedlich.',
    aEn: 'Vex0 is Open Source and free. For LumaSpace, FlowWave and the indicators there are free and paid plans — depending on the product.',
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
          <h2 className="section-title">
            <span className="lang-de">Häufige Fragen</span>
            <span className="lang-en">Frequently Asked Questions</span>
          </h2>
          <p className="section-sub">
            <span className="lang-de">Kurz, klar — alles, was du wissen musst.</span>
            <span className="lang-en">Short, clear — everything you need to know.</span>
          </p>
        </div>
        <div className="faq-grid">
          {FAQ_ITEMS.map(item => (
            <details key={item.qDe} className="faq-item">
              <summary>
                <span className="lang-de">{item.qDe}</span>
                <span className="lang-en">{item.qEn}</span>
              </summary>
              <p>
                <span className="lang-de">{item.aDe}</span>
                <span className="lang-en">{item.aEn}</span>
              </p>
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
    <section className="cta section hatch-bg" style={{ position: 'relative' }}>
      <span className="br br-tl" /><span className="br br-tr" />
      <span className="br br-bl" /><span className="br br-br" />
      <div className="container">
        <div className="cta-inner">
          <div className="section-label-row">
            <span className="dot dot--grün" />
            EARLY ACCESS
          </div>
          <h2>
            <span className="lang-de">Als Erstes dabei sein.</span>
            <span className="lang-en">Be the first.</span>
          </h2>
          <p>
            <span className="lang-de">Trag deine Email ein oder join unseren Discord — du kriegst Early Access, Beta-Releases und Updates zu Vex0, Vylder und allen anderen Produkten bevor alle anderen.</span>
            <span className="lang-en">Enter your email or join our Discord — get Early Access, Beta-Releases and updates to Vex0, Vylder and all other products before everyone else.</span>
          </p>
          <EarlyAccessForm />
          <div className="cta-divider">
            <span className="lang-de">oder</span>
            <span className="lang-en">or</span>
          </div>
          <a href="https://discord.gg/D9GwqWpwHT" className="btn-ghost" target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <DiscordIcon />
            <span className="lang-de">Discord joinen</span>
            <span className="lang-en">Join Discord</span>
          </a>
        </div>
      </div>
    </section>
  );
}
