'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MeData {
  id: string;
  avatar: string | null;
  username: string;
  global_name?: string;
}

export default function Navbar() {
  const [user, setUser] = useState<MeData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/api/me', { credentials: 'include' })
      .then(r => r.ok ? r.json() : null)
      .then((data: MeData | null) => { if (data?.id) setUser(data); })
      .catch(() => {});
  }, []);

  const displayName = user ? (user.global_name || user.username) : null;

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link href="/" className="logo">
          <Image src="/logo1.png" alt="Flux Network" className="logo-img" width={120} height={32} priority />
        </Link>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {[
            { href: '#pakete', label: 'Pakete' },
            { href: '#prozess', label: 'Prozess' },
            { href: '/design.html', label: 'Design' },
            { href: '#products', label: 'Produkte' },
            { href: '/docs.html', label: 'Docs' },
            { href: '/community.html', label: 'Community' },
          ].map(link => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          {user ? (
            <Link href="/dashboard" className="nav-user-link">
              {user.avatar ? (
                <Image
                  src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64`}
                  alt={displayName ?? ''}
                  width={32}
                  height={32}
                  className="nav-user-avatar"
                />
              ) : (
                <div className="nav-user-placeholder">{displayName?.[0]?.toUpperCase() ?? '?'}</div>
              )}
            </Link>
          ) : (
            <Link href="/dashboard" className="btn-join">Login</Link>
          )}
          <button
            className="nav-toggle"
            aria-label="Menü"
            onClick={() => setMenuOpen(v => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}
