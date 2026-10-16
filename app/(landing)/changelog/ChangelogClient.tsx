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
    descEn: 'One account, unlimited Discord servers. Plus 12 pre-built bot templates for moderation, welcome messages and ticket systems.',
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
    descEn: 'AI automatically suggests focus blocks based on deadlines and work history. Calendar sync with Google Calendar and Outlook now available in all plans.',
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
    descEn: 'Reaction role event handlers configurable directly in the builder. The embed builder now supports fields, thumbnails and footers without any coding knowledge.',
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
    descEn: 'Vex0 is now publicly available on GitHub. New components: Button (6 variants), Card with CardContent, Badge and StatusBadge. Zero config, copy-paste ready.',
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
    descEn: 'Multiple users can now work simultaneously in the same workspace. Cursor presence, live comments and simultaneous task editing without conflicts.',
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
    descEn: 'FlowWave enters open beta. Create Discord bots without a single line of code: configure slash commands, events and simple response logic directly in the browser.',
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
    descEn: 'Photos can now be uploaded directly via the app and assigned to construction phases. Automatic GPS geotagging and timestamps for complete documentation.',
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
    descEn: 'After 8 months of development, LumaSpace is officially live. AI-powered productivity system for teams and solo workers with task management, focus sessions and workflows.',
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
        {filtered.map((u, i) => (
          <div key={i} className="cl-entry">
            <div className="cl-entry-meta">
              <span className="changelog-date">{u.date}</span>
              <span className={`changelog-tag ${u.tagCls}`}>{u.product}</span>
              <span className="changelog-version">{u.version}</span>
            </div>
            <div className="cl-entry-body">
              <h3 className="cl-entry-title">{u.title}</h3>
              <p className="cl-entry-desc">{u.descDe}</p>
              {u.changes && (
                <ul className="cl-changes">
                  {u.changes.map((c, j) => <li key={j}>{c}</li>)}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
