'use client';

import type { PanelId } from './DashboardClient';

interface NavItem {
  id: PanelId;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'projekt', label: 'Mein Projekt',
    icon: <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm13 4v4m-2-2h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
  {
    id: 'anfrage', label: 'Neue Anfrage',
    icon: <><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" fill="none" /><path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></>,
  },
  {
    id: 'dokumente', label: 'Dokumente',
    icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" /><polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.7" fill="none" /><line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /><line x1="8" y1="17" x2="12" y2="17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></>,
  },
  {
    id: 'support', label: 'Support',
    icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" />,
  },
  {
    id: 'verbindungen', label: 'Verbindungen',
    icon: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" /></>,
  },
];

const ADMIN_ITEM: NavItem = {
  id: 'admin', label: 'Admin',
  icon: <><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" /></>,
};

interface Props {
  isAdmin: boolean;
  activePanel: PanelId;
  onNavigate: (panel: PanelId) => void;
}

export default function Sidebar({ isAdmin, activePanel, onNavigate }: Props) {
  const items = isAdmin ? [...NAV_ITEMS, ADMIN_ITEM] : NAV_ITEMS;

  return (
    <aside className="dash-sidebar">
      <nav className="dash-sidenav">
        {items.map(({ id, label, icon }) => (
          <button
            key={id}
            className={`dash-sidenav-item${activePanel === id ? ' active' : ''}`}
            title={label}
            onClick={() => onNavigate(id)}
          >
            <svg className="dash-sidenav-icon" viewBox="0 0 24 24" width="16" height="16">
              {icon}
            </svg>
            <span className="dash-sidenav-label">{label}</span>
          </button>
        ))}
      </nav>
      <div className="dash-sidebar-footer">
        <a href="/api/logout" title="Ausloggen">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span className="dash-sidenav-label">Ausloggen</span>
        </a>
      </div>
    </aside>
  );
}
