'use client';

import { useEffect, useRef, useState } from 'react';
import type { UserData } from '@/lib/types';
import DiscordAvatar from '@/components/DiscordAvatar';

interface Props {
  user: UserData;
  userName: string;
}

export default function TopBar({ user, userName }: Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  function handleRename() {
    const current = localStorage.getItem('flux0-display-name') || userName;
    const next = window.prompt('Anzeigename ändern:', current);
    if (next !== null && next.trim()) {
      localStorage.setItem('flux0-display-name', next.trim());
      window.location.reload();
    }
    setOpen(false);
  }

  const displayName = typeof window !== 'undefined'
    ? (localStorage.getItem('flux0-display-name') || userName)
    : userName;

  return (
    <header className="dash-top-bar">
      <a href="/" className="dash-top-bar-logo">
        <img src="/logo1.png" alt="Flux Network" />
      </a>
      <div className="dash-top-bar-spacer" />
      <div
        className="dash-top-bar-profile"
        ref={dropdownRef}
        onClick={e => { e.stopPropagation(); setOpen(v => !v); }}
      >
        <span className="dash-top-bar-name">{displayName}</span>
        <div className="dash-top-bar-avatar">
          <DiscordAvatar id={user.id} avatar={user.avatar} username={userName} size={64} style={{ width: '100%', height: '100%', fontSize: '0.82rem', fontWeight: 600 }} />
        </div>
        <span className="dash-top-bar-caret">▾</span>
        <div className={`dash-top-bar-dropdown${open ? ' open' : ''}`}>
          <button onClick={handleRename}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
            Name ändern
          </button>
          <hr />
          <a href="/api/logout" style={{ color: '#ef4444' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Ausloggen
          </a>
        </div>
      </div>
    </header>
  );
}
