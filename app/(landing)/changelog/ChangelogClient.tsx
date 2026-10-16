'use client';

import { useState } from 'react';

export const UPDATES = [
  {
    date: 'Okt 2026',
    product: 'FlowWave',
    version: 'v0.9.0',
    tagCls: 'cl-tag--flow',
    title: 'Multi-Server-Support & Bot-Templates',
    descDe: 'Ein Account, beliebig viele Discord-Server. Dazu kommen 12 vorgefertigte Bot-Templates für Moderation, Willkommen-Nachrichten und Ticket-Systeme.',
    changes: [
      'Multi-Server-Dashboard mit Quick-Switch',
      '12 Bot-Templates (Moderation, Welcome, Tickets)',
      'Verbesserter Embed-Builder mit Live-Vorschau',
      'Bug: Slash Commands wurden bei > 25 Optionen nicht gespeichert',
    ],
  },
  {
    date: 'Sep 2026',
    product: 'LumaSpace',
    version: 'v1.2.0',
    tagCls: 'cl-tag--luma',
    title: 'KI-Focus-Blöcke & Kalender-Sync',
    descDe: 'KI schlägt automatisch Focus-Blöcke basierend auf Deadlines und Arbeitshistorie vor. Kalender-Sync mit Google Calendar und Outlook ist jetzt in allen Plänen verfügbar.',
    changes: [
      'KI-Focus-Blöcke mit automatischer Priorisierung',
      'Google Calendar & Outlook Sync',
      'Verbesserte Task-Priorisierung via ML',
      'Schnellere Ladezeiten durch Edge Caching',
    ],
  },
  {
    date: 'Aug 2026',
    product: 'FlowWave',
    version: 'v0.8.0',
    tagCls: 'cl-tag--flow',
    title: 'Reaction Roles & verbesserter Embed-Builder',
    descDe: 'Event-Handler für Reaction Roles direkt im Builder konfigurierbar. Der Embed-Builder unterstützt jetzt Felder, Thumbnails und Footer ohne Codekenntnisse.',
    changes: [
      'Reaction Roles via on_reaction_add Handler',
      'Embed-Builder: Felder, Thumbnails, Footer',
      'Conditional Logic Blöcke (if/else im Builder)',
      'Performance: Deploy-Zeit von ~90s auf ~18s reduziert',
    ],
  },
  {
    date: 'Jul 2026',
    product: 'Vex0',
    version: 'v0.3.0',
    tagCls: 'cl-tag--vex',
    title: 'Button, Card & Badge Open Source Release',
    descDe: 'Vex0 ist jetzt auf GitHub öffentlich verfügbar. Neue Komponenten: Button (6 Varianten), Card mit CardContent, Badge und StatusBadge. Zero Config, direkt kopierbar.',
    changes: [
      'Open Source Release auf GitHub',
      'Button: primary, ghost, destructive, outline, subtle, link',
      'Card & CardContent Komponente',
      'Badge & StatusBadge mit Farbvarianten',
      'TypeScript-first mit vollständigen Types',
    ],
  },
  {
    date: 'Jun 2026',
    product: 'LumaSpace',
    version: 'v1.1.0',
    tagCls: 'cl-tag--luma',
    title: 'Realtime Collaboration für Teams',
    descDe: 'Mehrere Nutzer können jetzt gleichzeitig im selben Workspace arbeiten. Cursor-Präsenz, Live-Kommentare und gleichzeitige Task-Bearbeitung ohne Konflikte.',
    changes: [
      'Realtime-Cursor-Präsenz für alle Team-Mitglieder',
      'Live-Kommentare auf Tasks',
      'Conflict-free gleichzeitige Bearbeitung (CRDT)',
      'Team-Aktivitätsfeed in der Seitenleiste',
    ],
  },
  {
    date: 'Mai 2026',
    product: 'FlowWave',
    version: 'v0.7.0',
    tagCls: 'cl-tag--flow',
    title: 'Slash Command Builder Launch',
    descDe: 'FlowWave geht in die Open Beta. Discord-Bots ohne eine Zeile Code erstellen: Slash Commands, Events und einfache Antwort-Logik direkt im Browser konfigurieren.',
    changes: [
      'Visueller Slash-Command-Builder',
      'Event-Handler für on_message, on_ready, on_member_join',
      'Container-Deployment auf Knopfdruck',
      'Discord OAuth Login für Bot-Token-Verwaltung',
    ],
  },
  {
    date: 'Apr 2026',
    product: 'BuildFrameOS',
    version: 'v0.4.0',
    tagCls: 'cl-tag--lyq',
    title: 'Foto-Dokumentation & Bauphasen-Tracker',
    descDe: 'Fotos können jetzt direkt per App hochgeladen und Bauphasen zugeordnet werden. Automatische GPS-Geotagging und Zeitstempel für lückenlose Dokumentation.',
    changes: [
      'Foto-Upload direkt aus der mobilen App',
      'GPS-Geotagging automatisch',
      'Bauphassen-Tracker mit Fortschrittsanzeige',
      'PDF-Export des Bautagebuches',
    ],
  },
  {
    date: 'Mrz 2026',
    product: 'LumaSpace',
    version: 'v1.0.0',
    tagCls: 'cl-tag--luma',
    title: 'LumaSpace geht live',
    descDe: 'Nach 8 Monaten Entwicklung ist LumaSpace offiziell live. KI-gestütztes Produktivitätssystem für Teams und Solo-Worker mit Task-Management, Fokus-Sessions und Workflows.',
    changes: [
      'Task-Management mit KI-Priorisierung',
      'Focus-Session-Timer mit Deep Work Tracking',
      'Workflow-Automatisierung (Zapier-ähnlich)',
      'Team-Workspaces mit Rollen und Berechtigungen',
      'Mobile App (iOS & Android)',
    ],
  },
];

const PRODUCTS = ['Alle', 'LumaSpace', 'FlowWave', 'Vex0', 'BuildFrameOS'];

function buildOgUrl(u: typeof UPDATES[0], base = '') {
  const p = new URLSearchParams({
    product:  u.product,
    version:  u.version,
    title:    u.title,
    date:     u.date,
    changes:  u.changes.slice(0, 4).join('|'),
  });
  return `${base}/api/og?${p.toString()}`;
}

function discordText(u: typeof UPDATES[0]) {
  const lines = [
    `**${u.product} ${u.version}** — ${u.title}`,
    `*${u.date}*`,
    '',
    u.descDe,
    '',
    '**Was ist neu:**',
    ...u.changes.map(c => `+ ${c}`),
    '',
    '🔗 flux0.dev/changelog',
  ];
  return lines.join('\n');
}

function UpdateCard({ u }: { u: typeof UPDATES[0] }) {
  const [copied, setCopied] = useState(false);
  const ogUrl = buildOgUrl(u);

  async function handleCopy() {
    await navigator.clipboard.writeText(discordText(u));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleDownload() {
    const res = await fetch(ogUrl);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${u.product}-${u.version}.png`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="cl-entry">
      <div className="cl-entry-meta">
        <span className="changelog-date">{u.date}</span>
        <span className={`changelog-tag ${u.tagCls}`}>{u.product}</span>
        <span className="changelog-version">{u.version}</span>
      </div>
      <div className="cl-entry-body">
        <h3 className="cl-entry-title">{u.title}</h3>
        <p className="cl-entry-desc">{u.descDe}</p>

        {/* Banner */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ogUrl}
          alt={`${u.product} ${u.version} Banner`}
          className="cl-banner"
          loading="lazy"
        />

        {/* Changes */}
        <ul className="cl-changes">
          {u.changes.map((c, j) => <li key={j}>{c}</li>)}
        </ul>

        {/* Actions */}
        <div className="cl-actions">
          <button className="cl-action-btn" onClick={handleDownload} title="Banner als PNG laden">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            PNG laden
          </button>
          <button className="cl-action-btn cl-action-btn--discord" onClick={handleCopy}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            {copied ? 'Kopiert!' : 'Discord-Text kopieren'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChangelogClient() {
  const [filter, setFilter] = useState('Alle');
  const filtered = filter === 'Alle' ? UPDATES : UPDATES.filter(u => u.product === filter);

  return (
    <>
      <div className="cl-filter-row">
        {PRODUCTS.map(p => (
          <button
            key={p}
            className={`cl-filter-btn${filter === p ? ' cl-filter-btn--active' : ''}`}
            onClick={() => setFilter(p)}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="cl-entries">
        {filtered.map((u, i) => <UpdateCard key={i} u={u} />)}
      </div>
    </>
  );
}
