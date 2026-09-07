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

const NAV_LINKS_DE = [
  { href: '#produkte',                        label: 'Produkte'  },
  { href: '#roadmap',                         label: 'Roadmap'   },
  { href: '/docs',                            label: 'Docs'      },
  { href: 'https://discord.gg/D9GwqWpwHT',   label: 'Community', external: true },
];
const NAV_LINKS_EN = [
  { href: '#produkte',                        label: 'Products'  },
  { href: '#roadmap',                         label: 'Roadmap'   },
  { href: '/docs',                            label: 'Docs'      },
  { href: 'https://discord.gg/D9GwqWpwHT',   label: 'Community', external: true },
];

function getAttr(attr: string, fallback: string) {
  if (typeof document === 'undefined') return fallback;
  return document.documentElement.getAttribute(attr) ?? fallback;
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar() {
  const [user, setUser]         = useState<MeData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [theme, setTheme]       = useState<'dark' | 'light'>('dark');
  const [lang, setLang]         = useState<'de' | 'en'>('de');
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
    const check = () => setIsMobile(window.innerWidth < 700);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function onOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false);
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [menuOpen]);

  // Restore prefs on mount
  useEffect(() => {
    setTheme((getAttr('data-theme', 'dark') as 'dark' | 'light'));
    setLang((getAttr('data-lang', 'de') as 'de' | 'en'));
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  function toggleLang() {
    const next = lang === 'de' ? 'en' : 'de';
    setLang(next);
    document.documentElement.setAttribute('data-lang', next);
    localStorage.setItem('lang', next);
  }

  const NAV_LINKS = lang === 'de' ? NAV_LINKS_DE : NAV_LINKS_EN;
  const displayName = user ? (user.global_name || user.username) : null;
  const loginLabel = lang === 'de' ? 'Login' : 'Login';

  const iconBtnStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: '8px',
    padding: '5px 7px',
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.65)',
    transition: 'color 0.15s, border-color 0.15s',
    flexShrink: 0,
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: '900px',
        zIndex: 100,
      }}
      aria-label="Navigation"
    >
      <div
        ref={menuRef}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'nowrap',
          height: '52px',
          padding: '0 8px 0 16px',
          background: scrolled
            ? 'rgba(8, 8, 8, 0.92)'
            : 'rgba(12, 12, 12, 0.76)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: '16px',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: '0 2px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)',
          transition: 'background 0.3s',
          gap: '4px',
        }}
        className="nav-pill-inner"
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          style={{ display: 'flex', alignItems: 'center', flexShrink: 0, textDecoration: 'none', marginRight: '8px' }}
        >
          <Image
            src="/logo1.png"
            alt="Flux Network"
            width={120}
            height={32}
            priority
            style={{ height: '22px', width: 'auto', display: 'block' }}
          />
        </Link>

        {/* Desktop links */}
        <ul
          className="nav-desktop-links"
          style={{
            display: 'flex',
            listStyle: 'none',
            gap: '2px',
            flex: 1,
            justifyContent: 'center',
            margin: 0,
            padding: 0,
          }}
        >
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener' } : {})}
                style={{
                  textDecoration: 'none',
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: '0.84rem',
                  fontWeight: 500,
                  padding: '6px 12px',
                  borderRadius: '10px',
                  display: 'block',
                  transition: 'color 0.15s, background 0.15s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.95)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, marginLeft: 'auto' }}>

          {/* Theme toggle */}
          <button
            aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            onClick={toggleTheme}
            style={iconBtnStyle}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Language toggle */}
          <button
            aria-label="Switch language"
            onClick={toggleLang}
            style={{ ...iconBtnStyle, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.04em', padding: '5px 8px' }}
          >
            {lang === 'de' ? 'EN' : 'DE'}
          </button>

          {user ? (
            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
              {user.avatar ? (
                <Image
                  src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64`}
                  alt={displayName ?? ''}
                  width={28}
                  height={28}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid rgba(255,255,255,0.2)', display: 'block' }}
                />
              ) : (
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#fff', color: '#000', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {displayName?.[0]?.toUpperCase() ?? '?'}
                </div>
              )}
            </Link>
          ) : (
            <a
              href="/dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                background: 'transparent',
                color: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: isMobile ? '6px 11px' : '7px 14px',
                borderRadius: '10px',
                whiteSpace: 'nowrap',
                letterSpacing: '-0.01em',
                border: '1px solid rgba(255,255,255,0.35)',
              }}
            >
              {loginLabel}
            </a>
          )}

          {/* Hamburger */}
          <button
            aria-label="Menü"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '5px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px',
              flexShrink: 0,
            }}
            className="nav-hamburger"
          >
            <span style={{
              display: 'block', width: '18px', height: '1.5px',
              background: 'rgba(255,255,255,0.8)', borderRadius: '2px',
              transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
              transition: 'transform 0.2s',
            }} />
            <span style={{
              display: 'block', width: '18px', height: '1.5px',
              background: 'rgba(255,255,255,0.8)', borderRadius: '2px',
              opacity: menuOpen ? 0 : 1,
              transition: 'opacity 0.2s',
            }} />
            <span style={{
              display: 'block', width: '18px', height: '1.5px',
              background: 'rgba(255,255,255,0.8)', borderRadius: '2px',
              transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              transition: 'transform 0.2s',
            }} />
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            left: 0, right: 0,
            background: 'rgba(8, 8, 8, 0.96)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '14px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            animation: 'navMenuIn 0.15s ease',
          }}>
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                {...(link.external ? { target: '_blank', rel: 'noopener' } : {})}
                style={{
                  textDecoration: 'none',
                  color: 'rgba(255,255,255,0.65)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  padding: '10px 14px',
                  borderRadius: '10px',
                  transition: 'color 0.15s, background 0.15s',
                }}
              >
                {link.label}
              </a>
            ))}

            {/* Mobile lang + theme row */}
            <div style={{ display: 'flex', gap: '8px', padding: '6px 14px 4px' }}>
              <button
                onClick={toggleTheme}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px', padding: '9px', cursor: 'pointer', color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.78rem', fontWeight: 500,
                }}
              >
                {theme === 'dark' ? <><SunIcon /> Light</> : <><MoonIcon /> Dark</>}
              </button>
              <button
                onClick={toggleLang}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px', padding: '9px', cursor: 'pointer', color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.04em',
                }}
              >
                {lang === 'de' ? '🇬🇧 EN' : '🇩🇪 DE'}
              </button>
            </div>

            {user ? (
              <a
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  textDecoration: 'none', color: 'rgba(255,255,255,0.85)',
                  fontSize: '0.875rem', fontWeight: 600, padding: '10px 14px',
                  borderRadius: '10px', marginTop: '4px', background: 'rgba(255,255,255,0.05)',
                }}
              >
                {user.avatar ? (
                  <img
                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64`}
                    alt=""
                    style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#fff', color: '#000', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {(user.global_name || user.username)?.[0]?.toUpperCase() ?? '?'}
                  </div>
                )}
                {user.global_name || user.username}
              </a>
            ) : (
              <a
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block', textDecoration: 'none', textAlign: 'center',
                  background: 'transparent', color: '#ffffff', fontSize: '0.875rem',
                  fontWeight: 700, padding: '11px 14px', borderRadius: '10px',
                  marginTop: '4px', border: '1px solid rgba(255,255,255,0.35)',
                }}
              >
                {loginLabel}
              </a>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
