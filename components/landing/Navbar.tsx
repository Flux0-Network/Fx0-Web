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
  { href: '#produkte',                        label: 'Produkte'  },
  { href: '#roadmap',                         label: 'Roadmap'   },
  { href: '/docs',                            label: 'Docs'      },
  { href: 'https://discord.gg/D9GwqWpwHT',   label: 'Community', external: true },
];

export default function Navbar() {
  const [user, setUser]         = useState<MeData | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
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

  const displayName = user ? (user.global_name || user.username) : null;

  return (
    <nav
      style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: '860px',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, marginLeft: 'auto' }}>
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
              Login
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
            {user ? (
              <a
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  textDecoration: 'none',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  padding: '10px 14px',
                  borderRadius: '10px',
                  marginTop: '6px',
                  background: 'rgba(255,255,255,0.05)',
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
                  display: 'block',
                  textDecoration: 'none',
                  textAlign: 'center',
                  background: 'transparent',
                  color: '#ffffff',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  padding: '11px 14px',
                  borderRadius: '10px',
                  marginTop: '6px',
                  border: '1px solid rgba(255,255,255,0.35)',
                }}
              >
                Login
              </a>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
