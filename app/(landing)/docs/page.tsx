import type { Metadata } from 'next';
import Link from 'next/link';
import DocsNav from '@/components/landing/DocsNav';
import CookieNotice from '@/components/landing/CookieNotice';

export const metadata: Metadata = {
  title: 'Docs — Flux0',
  description: 'Dokumentation für LumaSpace und FlowWave — Guides, APIs und Integration.',
  openGraph: {
    type: 'website',
    url: 'https://flux0.dev/docs',
    title: 'Docs — Flux0',
    description: 'Dokumentation für LumaSpace und FlowWave — Guides, APIs und Integration.',
    images: [{ url: 'https://flux0.dev/og-image.png' }],
    siteName: 'Flux0',
  },
  twitter: { card: 'summary_large_image', title: 'Docs — Flux0', images: ['https://flux0.dev/og-image.png'] },
  alternates: { canonical: 'https://flux0.dev/docs' },
};

export default function DocsPage() {
  return (
    <div className="docs-body">
      <DocsNav />

      {/* HEADER */}
      <header className="docs-header">
        <div className="docs-header-inner">
          <Link href="/" className="docs-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Flux0" className="logo-img" style={{ height: '26px' }} />
            <span className="docs-logo-text">
              <span style={{ color: 'var(--accent)' }} /> <span className="docs-logo-sep">/</span> Docs
            </span>
          </Link>
          <div className="docs-header-search">
            <div className="docs-search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <span>Suchen…</span>
              <kbd>⌘K</kbd>
            </div>
          </div>
          <nav className="docs-header-nav">
            <Link href="/" className="docs-header-link">← flux0.dev</Link>
            <a href="https://discord.gg/yqQutP6EKV" className="btn-primary" target="_blank" rel="noopener" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>Discord</a>
          </nav>
          <button className="docs-mobile-toggle" aria-label="Navigation öffnen">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="15" y2="18"/></svg>
            <span>Sections</span>
          </button>
        </div>
      </header>

      <div className="docs-overlay" />

      <div className="docs-layout">

        {/* SIDEBAR */}
        <aside className="docs-sidebar">
          <div className="docs-sidebar-inner">
            <button className="docs-sidebar-close" aria-label="Navigation schließen">✕ Schließen</button>

            <div className="docs-nav-group">
              <span className="docs-nav-group-label">Übersicht</span>
              <a href="#intro" className="docs-nav-link docs-nav-link--active">Einführung</a>
              <a href="#getting-started" className="docs-nav-link">Erste Schritte</a>
            </div>

            <div className="docs-nav-group">
              <div className="docs-nav-product-badge docs-nav-product-badge--luma">✦ LumaSpace</div>
              <a href="#lumaspace-intro" className="docs-nav-link">Übersicht</a>
              <a href="#lumaspace-start" className="docs-nav-link">Quickstart</a>
              <a href="#lumaspace-features" className="docs-nav-link">Features</a>
              <a href="#lumaspace-api" className="docs-nav-link">API</a>
            </div>

            <div className="docs-nav-group">
              <div className="docs-nav-product-badge docs-nav-product-badge--flow">〜 FlowWave</div>
              <a href="#flowwave-intro" className="docs-nav-link">Übersicht</a>
              <a href="#flowwave-builder" className="docs-nav-link">Web Builder</a>
              <a href="#flowwave-commands-ui" className="docs-nav-link">Commands &amp; Events</a>
              <a href="#flowwave-container" className="docs-nav-link">Container Deployment</a>
              <a href="#flowwave-pycord" className="docs-nav-link">pycord v2 Engine</a>
            </div>

            <div className="docs-nav-group">
              <div className="docs-nav-product-badge" style={{ background: 'rgba(139,92,246,0.12)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.25)' }}>⬡ Vex0</div>
              <a href="#vex0-intro" className="docs-nav-link">Übersicht</a>
              <a href="#vex0-start" className="docs-nav-link">Installation</a>
              <a href="#vex0-components" className="docs-nav-link">Komponenten</a>
            </div>

            <div className="docs-nav-group">
              <div className="docs-nav-product-badge" style={{ background: 'rgba(251,191,36,0.10)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.22)' }}>✦ Vylder</div>
              <a href="#vylder-intro" className="docs-nav-link">Übersicht</a>
              <a href="#vylder-features" className="docs-nav-link">Features</a>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="docs-main">
          <div className="docs-content">

            <section className="docs-section" id="intro">
              <div className="docs-breadcrumb">Docs / Einführung</div>
              <h1 className="docs-h1">Flux0 Dokumentation</h1>
              <p className="docs-lead">
                Willkommen in der offiziellen Dokumentation des Flux Network. Hier findest du alles zu unseren Produkten — von der ersten Installation bis zur API-Referenz.
              </p>

              <div className="docs-cards-row">
                <a href="#flowwave-builder" className="docs-quick-card">
                  <span className="docs-quick-icon docs-quick-icon--logo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/flowwave-icon.png" alt="FlowWave" className="product-logo-icon" />
                  </span>
                  <div>
                    <strong>FlowWave</strong>
                    <p>Visueller Bot Builder · Container</p>
                  </div>
                </a>
                <a href="#lumaspace-start" className="docs-quick-card">
                  <span className="docs-quick-icon docs-quick-icon--logo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/lumaspace-icon.png" alt="LumaSpace" className="product-logo-icon" />
                  </span>
                  <div>
                    <strong>LumaSpace</strong>
                    <p>Produktivitätsplattform</p>
                  </div>
                </a>
              </div>
            </section>

            <section className="docs-section" id="getting-started">
              <h2 className="docs-h2">Erste Schritte</h2>
              <p>Wähle ein Produkt aus dem Menü links oder klick direkt auf eine der Karten oben. Alle Produkte sind eigenständig — du kannst mit jedem beginnen, das dich interessiert.</p>
              <div className="docs-callout docs-callout--info">
                <strong>Hinweis:</strong> LumaSpace und FlowWave sind live. Die Dokumentation wird laufend aktualisiert.
              </div>
            </section>

            <div className="docs-divider" />

            {/* ─── LUMASPACE ─── */}
            <div className="docs-product-header docs-product-header--luma" id="lumaspace-intro">
              <span className="docs-product-icon docs-product-icon--logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/lumaspace-icon.png" alt="LumaSpace" className="product-logo-icon" />
              </span>
              <div>
                <h2 className="docs-h1" style={{ margin: 0 }}>LumaSpace</h2>
                <span className="docs-product-tag docs-product-tag--live">Live</span>
              </div>
            </div>

            <section className="docs-section">
              <p className="docs-lead">
                LumaSpace ist eine KI-gestützte Produktivitäts- und Planungsplattform für Teams und Einzelpersonen mit Fokus auf Realtime Collaboration und intelligente Task-Organisation.
              </p>
              <h3 className="docs-h3">Was ist LumaSpace?</h3>
              <p>LumaSpace kombiniert Task-Management, Focus-Sessions und Team-Koordination in einer einzigen Oberfläche. Die KI analysiert Workload und schlägt optimale Zeitpläne vor.</p>
              <div className="docs-feature-list">
                <div className="docs-feature-item"><span className="docs-feature-icon">⚡</span><div><strong>Realtime Collaboration</strong> — Änderungen sind sofort für alle Teammitglieder sichtbar</div></div>
                <div className="docs-feature-item"><span className="docs-feature-icon">🧠</span><div><strong>AI Planning</strong> — Automatische Priorisierung und Scheduling basierend auf Deadlines</div></div>
                <div className="docs-feature-item"><span className="docs-feature-icon">🎯</span><div><strong>Focus Mode</strong> — Deep-Work-Sessions mit automatischem Status und Do-not-disturb</div></div>
              </div>
            </section>

            <section className="docs-section" id="lumaspace-start">
              <h2 className="docs-h2">Quickstart</h2>
              <p>LumaSpace ist eine Web-App — keine Installation notwendig.</p>
              <div className="docs-step"><span className="docs-step-num">1</span><div><strong>Account erstellen</strong><p>Gehe zu <a href="https://lumaspace.de" target="_blank" rel="noopener" className="docs-link">lumaspace.de</a> und registriere dich kostenlos.</p></div></div>
              <div className="docs-step"><span className="docs-step-num">2</span><div><strong>Workspace anlegen</strong><p>Erstelle deinen ersten Workspace — solo oder im Team. Importiere bestehende Tasks aus Notion, Trello oder Linear.</p></div></div>
              <div className="docs-step"><span className="docs-step-num">3</span><div><strong>Loslegen</strong><p>Füge Tasks hinzu, aktiviere den Focus Mode und lass die KI deinen Tag planen.</p></div></div>
            </section>

            <section className="docs-section" id="lumaspace-features">
              <h2 className="docs-h2">Features</h2>
              <h3 className="docs-h3">Task Orchestration</h3>
              <p>Tasks können in Projekten gruppiert, mit Abhängigkeiten verknüpft und automatisch priorisiert werden. Deadlines und Aufwandsschätzungen fließen in die KI-Planung ein.</p>
              <h3 className="docs-h3">Focus Sessions</h3>
              <p>Der Focus Mode startet eine Pomodoro-ähnliche Session, schaltet Ablenkungen aus und trackt produktive Zeit pro Task.</p>
            </section>

            <section className="docs-section" id="lumaspace-api">
              <h2 className="docs-h2">API</h2>
              <div className="docs-callout docs-callout--warn">
                Die LumaSpace API befindet sich in Vorbereitung. Trag dich in den Discord ein, um als erster Zugang zu erhalten.
              </div>
            </section>

            <div className="docs-divider" />

            {/* ─── FLOWWAVE ─── */}
            <div className="docs-product-header docs-product-header--flow" id="flowwave-intro">
              <span className="docs-product-icon docs-product-icon--logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/flowwave-icon.png" alt="FlowWave" className="product-logo-icon" />
              </span>
              <div>
                <h2 className="docs-h1" style={{ margin: 0 }}>FlowWave</h2>
                <span className="docs-product-tag docs-product-tag--live">Open Beta</span>
              </div>
            </div>

            <section className="docs-section">
              <p className="docs-lead">
                FlowWave ist ein <strong>visueller Discord-Bot-Builder im Browser</strong>. Du erstellst deinen Bot komplett per Drag-and-drop — ohne eine einzige Zeile Code zu schreiben. Im Hintergrund läuft alles auf <strong>pycord v2</strong> in einem isolierten Container.
              </p>
              <div className="docs-feature-list">
                <div className="docs-feature-item"><span className="docs-feature-icon">🖥️</span><div><strong>Web Builder</strong> — Bot-Logik visuell im Browser konfigurieren, kein Python-Wissen nötig</div></div>
                <div className="docs-feature-item"><span className="docs-feature-icon">📦</span><div><strong>Container-Deployment</strong> — Jeder Bot läuft in einem eigenen, isolierten Container</div></div>
                <div className="docs-feature-item"><span className="docs-feature-icon">⚡</span><div><strong>pycord v2 Engine</strong> — Professionelle Discord-API-Unterstützung unter der Haube</div></div>
              </div>
              <div className="docs-callout docs-callout--info">
                FlowWave befindet sich in aktiver Entwicklung. Die Web-Oberfläche und Container-Infrastruktur werden gerade aufgebaut. Trag dich im Discord ein, um Early Access zu erhalten.
              </div>
            </section>

            <section className="docs-section" id="flowwave-builder">
              <h2 className="docs-h2">Web Builder</h2>
              <p>Der FlowWave Web Builder ist die zentrale Oberfläche, in der du deinen Discord-Bot zusammenstellst — vollständig im Browser, ohne lokale Installation.</p>
              <div className="docs-step"><span className="docs-step-num">1</span><div><strong>Anmelden &amp; Bot-Projekt erstellen</strong><p>Öffne den FlowWave Web Builder und lege ein neues Bot-Projekt an. Gib deinen Discord Bot Token ein — er wird verschlüsselt gespeichert und nur im Container verwendet.</p></div></div>
              <div className="docs-step"><span className="docs-step-num">2</span><div><strong>Commands &amp; Events visuell konfigurieren</strong><p>Wähle im Builder aus vorgefertigten Slash-Command- und Event-Blöcken. Konfiguriere Namen, Beschreibungen, Optionen und Antworten direkt im UI — kein Code nötig.</p></div></div>
              <div className="docs-step"><span className="docs-step-num">3</span><div><strong>Container deployen</strong><p>Klick auf &quot;Deploy&quot; — FlowWave baut automatisch einen Container mit deiner Konfiguration und startet ihn. Dein Bot ist innerhalb von Sekunden live auf Discord.</p></div></div>
              <div className="docs-step"><span className="docs-step-num">4</span><div><strong>Live-Monitoring</strong><p>Im Dashboard siehst du den Container-Status, Logs und Uptime deines Bots in Echtzeit. Änderungen im Builder werden als neuer Container-Build ausgerollt.</p></div></div>
            </section>

            <section className="docs-section" id="flowwave-commands-ui">
              <h2 className="docs-h2">Commands &amp; Events konfigurieren</h2>
              <p>Alle Bot-Funktionen werden über den visuellen Builder eingestellt — du wählst Blöcke aus und füllst Felder aus.</p>
              <h3 className="docs-h3">Slash Commands</h3>
              <p>Füge einen Slash-Command-Block hinzu und konfiguriere:</p>
              <ul className="docs-list">
                <li><strong>Name</strong> — der Command-Name (z.B. <code className="inline-code">ping</code>, <code className="inline-code">info</code>)</li>
                <li><strong>Beschreibung</strong> — wird Nutzern in Discord angezeigt</li>
                <li><strong>Optionen</strong> — optionale oder Pflicht-Parameter mit Typ-Auswahl (Text, Zahl, User, Channel …)</li>
                <li><strong>Antwort</strong> — statischer Text, Embed-Template oder dynamische Logik-Blöcke</li>
              </ul>
              <h3 className="docs-h3">Events</h3>
              <p>Reagiere auf Discord-Events ohne Code — wähle das Event und definiere die Aktion:</p>
              <ul className="docs-list">
                <li><strong>on_member_join</strong> — Willkommensnachricht automatisch senden</li>
                <li><strong>on_message</strong> — Keyword-Filter oder Auto-Antworten konfigurieren</li>
                <li><strong>on_reaction_add</strong> — Reaction-Roles visuell zuweisen</li>
                <li><strong>on_ready</strong> — Status und Aktivität des Bots beim Start setzen</li>
              </ul>
              <h3 className="docs-h3">UI-Komponenten</h3>
              <p>Buttons, Dropdowns und Modals lassen sich per Block-System an Commands anhängen — inklusive Berechtigungsregeln und Antwortlogik, alles im Builder konfigurierbar.</p>
            </section>

            <section className="docs-section" id="flowwave-container">
              <h2 className="docs-h2">Container Deployment</h2>
              <p>Jeder FlowWave-Bot läuft in einem eigenen, isolierten Container — vollständig gemanaged von FlowWave.</p>
              <h3 className="docs-h3">Wie es funktioniert</h3>
              <div className="docs-feature-list">
                <div className="docs-feature-item"><span className="docs-feature-icon">1</span><div><strong>Build</strong> — FlowWave generiert aus deiner Builder-Konfiguration automatisch ein pycord v2 Projekt und verpackt es in ein Container-Image.</div></div>
                <div className="docs-feature-item"><span className="docs-feature-icon">2</span><div><strong>Deploy</strong> — Das Image wird in einer isolierten Laufzeitumgebung gestartet. Dein Bot-Token ist nur innerhalb des Containers sichtbar.</div></div>
                <div className="docs-feature-item"><span className="docs-feature-icon">3</span><div><strong>Betrieb</strong> — FlowWave überwacht den Container, startet ihn bei Absturz automatisch neu und hält Logs bereit.</div></div>
              </div>
              <h3 className="docs-h3">Updates ausrollen</h3>
              <p>Änderungen im Web Builder lösen automatisch einen neuen Build aus. Der laufende Container wird graceful ersetzt — dein Bot ist nur für wenige Sekunden offline.</p>
              <div className="docs-callout docs-callout--warn">
                Eigene Container-Images oder direktes SSH-Zugriff sind in der aktuellen Alpha nicht vorgesehen. Das Feature ist für spätere Versionen geplant.
              </div>
            </section>

            <section className="docs-section" id="flowwave-pycord">
              <h2 className="docs-h2">pycord v2 Engine</h2>
              <p>Unter der Haube verwendet FlowWave <strong>pycord v2</strong> — eine der leistungsfähigsten Python-Bibliotheken für die Discord-API mit vollständiger Slash-Command- und UI-Unterstützung.</p>
              <h3 className="docs-h3">Was pycord v2 ermöglicht</h3>
              <ul className="docs-list">
                <li>Vollständige Slash-Command- und Application-Command-Unterstützung</li>
                <li>Discord UI-Komponenten: Buttons, Select Menus, Modals</li>
                <li>Autocomplete für Command-Optionen</li>
                <li>Cogs für modulare Bot-Strukturen</li>
                <li>Alle Gateway Events der Discord-API</li>
              </ul>
              <h3 className="docs-h3">Für Entwickler</h3>
              <p>Fortgeschrittene Nutzer können in späteren Versionen von FlowWave eigene pycord v2 Cogs als Module hochladen und in den Builder integrieren — für Funktionen, die über den visuellen Builder hinausgehen.</p>
              <div className="docs-callout docs-callout--info">
                Du möchtest direkt mit pycord v2 arbeiten? Die offizielle Dokumentation findest du unter{' '}
                <a href="https://docs.pycord.dev" target="_blank" rel="noopener" className="docs-link">docs.pycord.dev</a>.
              </div>
            </section>

            <div className="docs-divider" />

            {/* ─── VEX0 ─── */}
            <div className="docs-product-header" id="vex0-intro" style={{ borderLeft: '3px solid #a78bfa' }}>
              <span className="docs-product-icon" style={{ background: 'rgba(139,92,246,0.15)', fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⬡</span>
              <div>
                <h2 className="docs-h1" style={{ margin: 0 }}>Vex0</h2>
                <span className="docs-product-tag" style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}>In Entwicklung</span>
              </div>
            </div>

            <section className="docs-section">
              <p className="docs-lead">
                Vex0 ist ein <strong>Open Source Component Framework</strong> für moderne Web-Apps — designed für Entwickler, die schnelle, konsistente UI-Komponenten ohne Overhead wollen.
              </p>
              <div className="docs-feature-list">
                <div className="docs-feature-item"><span className="docs-feature-icon">⚡</span><div><strong>Zero Config</strong> — Komponenten direkt importieren, kein Build-Setup nötig</div></div>
                <div className="docs-feature-item"><span className="docs-feature-icon">🎨</span><div><strong>Theming</strong> — CSS-Variablen-basiertes Design-System, leicht anpassbar</div></div>
                <div className="docs-feature-item"><span className="docs-feature-icon">📦</span><div><strong>Tree-shakeable</strong> — Nur die Komponenten, die du nutzt, landen im Bundle</div></div>
              </div>
              <div className="docs-callout docs-callout--info">
                Vex0 befindet sich in aktiver Entwicklung. Melde dich im Discord um Early Access und Updates zu erhalten.
              </div>
            </section>

            <section className="docs-section" id="vex0-start">
              <h2 className="docs-h2">Installation</h2>
              <div className="docs-callout docs-callout--warn">
                Das npm-Paket ist noch nicht öffentlich verfügbar. Die Installationsanleitung erscheint mit dem ersten Release.
              </div>
              <p>Geplant:</p>
              <pre style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '14px 18px', fontSize: '0.84rem', overflowX: 'auto' }}><code>npm install @vex0/ui</code></pre>
            </section>

            <section className="docs-section" id="vex0-components">
              <h2 className="docs-h2">Komponenten</h2>
              <p>Vex0 wird eine vollständige Komponentenbibliothek für React/Next.js mitbringen:</p>
              <ul className="docs-list">
                <li><code className="inline-code">Button</code> — Varianten: primary, ghost, destructive</li>
                <li><code className="inline-code">Card</code> / <code className="inline-code">CardContent</code> — Flexible Container-Komponente</li>
                <li><code className="inline-code">Input</code> / <code className="inline-code">Textarea</code> — Form-Elemente mit Validierungsstate</li>
                <li><code className="inline-code">Modal</code> — Accessible Dialog mit Backdrop</li>
                <li><code className="inline-code">Badge</code> / <code className="inline-code">Tag</code> — Status-Indikatoren</li>
              </ul>
            </section>

            <div className="docs-divider" />

            {/* ─── VYLDER ─── */}
            <div className="docs-product-header" id="vylder-intro" style={{ borderLeft: '3px solid #fbbf24' }}>
              <span className="docs-product-icon docs-product-icon--logo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/vylder-icon.png" alt="Vylder" className="product-logo-icon" />
              </span>
              <div>
                <h2 className="docs-h1" style={{ margin: 0 }}>Vylder</h2>
                <span className="docs-product-tag" style={{ background: 'rgba(251,191,36,0.12)', color: '#fbbf24' }}>Coming Soon</span>
              </div>
            </div>

            <section className="docs-section">
              <p className="docs-lead">
                Vylder ist ein <strong>visueller Website-Builder mit integriertem Code-Editor</strong> — für Entwickler und Designer, die schnell professionelle Websites erstellen wollen, ohne zwischen Tool und IDE zu wechseln.
              </p>
              <div className="docs-feature-list">
                <div className="docs-feature-item"><span className="docs-feature-icon">🖱️</span><div><strong>Visual Editor</strong> — Elemente per Drag-and-drop platzieren und direkt im Browser stylen</div></div>
                <div className="docs-feature-item"><span className="docs-feature-icon">💻</span><div><strong>Code Editor</strong> — Jederzeit in den Code wechseln und manuell anpassen</div></div>
                <div className="docs-feature-item"><span className="docs-feature-icon">🚀</span><div><strong>One-Click Deploy</strong> — Direkt aus Vylder auf vylder.dev oder eigene Domain deployen</div></div>
              </div>
              <div className="docs-callout docs-callout--info">
                Vylder ist noch nicht öffentlich verfügbar. Auf <a href="https://vylder.dev" target="_blank" rel="noopener" className="docs-link">vylder.dev</a> kannst du dich für Early Access eintragen.
              </div>
            </section>

            <section className="docs-section" id="vylder-features">
              <h2 className="docs-h2">Geplante Features</h2>
              <h3 className="docs-h3">Visual + Code Hybrid</h3>
              <p>Anders als reine No-Code-Tools sperrt Vylder dich nicht ein — du kannst jederzeit zwischen der visuellen Ansicht und dem echten Code hin- und herschalten. Änderungen werden in beide Richtungen synchronisiert.</p>
              <h3 className="docs-h3">Component Library</h3>
              <p>Vylder kommt mit einer eingebauten Komponentenbibliothek (basierend auf Vex0) — fertige Sektionen, Navigation, Hero-Bereiche und mehr als Ausgangspunkt.</p>
              <h3 className="docs-h3">Export &amp; Deploy</h3>
              <p>Fertige Projekte können als statische HTML/CSS-Seite exportiert oder direkt über Vylder gehostet werden. Custom-Domain-Support ist geplant.</p>
            </section>

            <div className="docs-footer">
              <p>Fragen? Komm in unseren <a href="https://discord.gg/yqQutP6EKV" target="_blank" rel="noopener" className="docs-link">Discord Server</a>.</p>
              <p className="docs-footer-copy">© 2026 Flux0 · flux0.dev · Powered by Flux Network</p>
            </div>

          </div>
        </main>
      </div>

      <CookieNotice />
    </div>
  );
}
