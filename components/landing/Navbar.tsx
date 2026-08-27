'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MeData {
  id: string;
  avatar: string | null;
  username: string;
  global_name?: string;
}

const NAV_LINKS = [
  { href: '#pakete',    label: 'Pakete' },
  { href: '#prozess',   label: 'Prozess' },
  { href: '#products',  label: 'Produkte' },
  { href: '/community.html', label: 'Community' },
];

export default function Navbar() {
  const [user, setUser]       = useState<MeData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/me', { credentials: 'include' })
      .then(r => r.ok ? r.json() : null)
      .then((data: MeData | null) => { if (data?.id) setUser(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [menuOpen]);

  const displayName = user ? (user.global_name || user.username) : null;

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} aria-label="Navigation">
      <div className="nav-pill" ref={menuRef}>
        {/* Logo */}
        <Link href="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <Image src="/logo1.png" alt="Flux Network" width={96} height={24} priority />
        </Link>

        {/* Desktop links */}
        <ul className="nav-links" role="list">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a href={link.href} className="nav-link">{link.label}</a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="nav-end">
          {user ? (
            <Link href="/dashboard" className="nav-user-link" title={displayName ?? 'Dashboard'}>
              {user.avatar ? (
                <Image
                  src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64`}
                  alt={displayName ?? ''}
                  width={28}
                  height={28}
                  className="nav-avatar"
                />
              ) : (
                <div className="nav-avatar-placeholder">{displayName?.[0]?.toUpperCase() ?? '?'}</div>
              )}
            </Link>
          ) : (
            <a href="https://discord.gg/D9GwqWpwHT" className="nav-cta" target="_blank" rel="noopener">
              Angebot anfragen
            </a>
          )}

          {/* Hamburger */}
          <button
            className={`nav-toggle${menuOpen ? ' nav-toggle--open' : ''}`}
            aria-label="Menü öffnen"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="nav-mobile-menu">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} className="nav-mobile-link" onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <a
              href="https://discord.gg/D9GwqWpwHT"
              className="nav-mobile-cta"
              target="_blank"
              rel="noopener"
              onClick={() => setMenuOpen(false)}
            >
              Angebot anfragen →
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
