import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import SiteFooter from '@/components/landing/SiteFooter';
import CookieNotice from '@/components/landing/CookieNotice';
import DiscordStats from '@/components/landing/DiscordStats';
import CopyButton from '@/components/landing/CopyButton';

export const metadata: Metadata = {
  title: 'Community — Flux Network',
  description: 'Werde Teil der Flux Network Community — Discord, Minecraft Server und mehr.',
};

const TOPICS = [
  {
    color: { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', text: '#d97706' },
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/><path d="M8.5 8.5 A5 5 0 1 0 15.5 15.5"/></svg>,
    title: 'Crypto & Web3',
    text: 'Diskussionen über Bitcoin, Altcoins, DeFi, NFTs und Blockchain-Entwicklung. Marktanalysen, Alpha und tägliche Bewegungen.',
  },
  {
    color: { bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.2)', text: '#7c3aed' },
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    title: 'Entwicklung',
    text: 'Code-Reviews, Projekt-Vorstellungen, Hilfe bei Bugs — egal ob Web, Backend oder Mobile. Hier lernt man zusammen.',
  },
  {
    color: { bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)', text: '#16a34a' },
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M6 7h4M6 11h2"/></svg>,
    title: 'Gaming',
    text: 'Minecraft, Valorant, weitere Games — organisierte Sessions, Server-Updates und alles rund ums Zocken in der Community.',
  },
  {
    color: { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)', text: '#2563eb' },
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12"/><path d="M12 6v6l4 2"/><circle cx="4" cy="6" r="2"/><path d="M4 8v2"/></svg>,
    title: 'KI & Tech',
    text: 'Neue AI-Tools, Modelle, Automatisierung und Technik-News — wer hier drinsteckt, bekommt es als erstes mit.',
  },
  {
    color: { bg: 'rgba(236,72,153,0.08)', border: 'rgba(236,72,153,0.2)', text: '#db2777' },
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M15 9h.01M9 15l2-2 2 2 3-3"/></svg>,
    title: 'Design & UI',
    text: 'Webdesign, UI-Inspiration, Farben und Typografie — zeig deine Arbeiten, hol dir Feedback oder lass dich einfach inspirieren.',
  },
  {
    color: { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', text: '#d97706' },
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    title: 'Allgemein',
    text: 'Off-Topic, Memes, Vorstellungen — hier ist alles erlaubt was keinen anderen Channel hat. Entspannt und ohne Thema.',
  },
];

const MC_TAGS = ['Survival', '500+ Mods', 'Tech & Magic', 'Quests', 'Community'];

export default function CommunityPage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <div className="comm-hero">
        <div className="container">
          <div className="section-label-row" style={{ justifyContent: 'center', marginBottom: '16px' }}>
            <span className="dot dot--grün" />
            COMMUNITY
          </div>
          <h1>
            Werde Teil von<br />
            <span style={{ color: 'var(--accent)' }}>Flux Network.</span>
          </h1>
          <p>Discord, Minecraft &amp; mehr — eine aktive Community rund um Technik, Gaming und Entwicklung.</p>
          <a href="https://discord.gg/D9GwqWpwHT" className="btn-primary" target="_blank" rel="noopener">
            Discord beitreten →
          </a>
        </div>
      </div>

      {/* DISCORD */}
      <section className="comm-section">
        <div className="container">
          <div className="comm-section-label">
            <span className="dot" style={{ background: '#5865f2' }} />
            DISCORD
          </div>
          <h2 className="comm-section-title">Unser Discord-Server</h2>
          <p className="comm-section-sub">
            Stell Fragen, zeig deine Projekte, chatte mit anderen — der Flux Network Discord ist die Anlaufstelle für alles.
          </p>

          <div className="discord-card">
            <div className="discord-card-icon">
              <svg viewBox="0 0 71 55">
                <path d="M60.1 4.9A58.5 58.5 0 0 0 45.5.7a.2.2 0 0 0-.2.1 40.7 40.7 0 0 0-1.8 3.7 54 54 0 0 0-16.2 0A37.7 37.7 0 0 0 25.5.8a.2.2 0 0 0-.2-.1A58.4 58.4 0 0 0 10.7 4.9a.2.2 0 0 0-.1.1C1.6 18.1-.9 31 .3 43.7a.2.2 0 0 0 .1.1 58.8 58.8 0 0 0 17.7 9 .2.2 0 0 0 .2-.1 42 42 0 0 0 3.6-5.9.2.2 0 0 0-.1-.3 38.7 38.7 0 0 1-5.5-2.6.2.2 0 0 1 0-.4l1.1-.8a.2.2 0 0 1 .2 0c11.6 5.3 24.1 5.3 35.5 0a.2.2 0 0 1 .2 0l1.1.8a.2.2 0 0 1 0 .4 36 36 0 0 1-5.5 2.6.2.2 0 0 0-.1.3 47.1 47.1 0 0 0 3.6 5.9.2.2 0 0 0 .2.1 58.6 58.6 0 0 0 17.8-9 .2.2 0 0 0 .1-.1c1.5-15.2-2.5-28-10.6-39.7a.2.2 0 0 0-.1-.1ZM23.7 36.1c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2Zm23.7 0c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2Z" />
              </svg>
            </div>
            <div className="discord-card-body">
              <div className="discord-card-name">Flux Network</div>
              <div className="discord-card-meta">discord.gg/D9GwqWpwHT</div>
              <DiscordStats />
              <a href="https://discord.gg/D9GwqWpwHT" className="btn-primary" target="_blank" rel="noopener" style={{ display: 'inline-flex' }}>
                Beitreten →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* THEMEN */}
      <section className="comm-section">
        <div className="container">
          <div className="comm-section-label">
            <span className="dot dot--gelb" />
            THEMEN &amp; CHANNELS
          </div>
          <h2 className="comm-section-title">Worüber wir reden.</h2>
          <p className="comm-section-sub">Von Krypto bis Code — bei uns ist jeder Themenbereich vertreten.</p>

          <div className="community-grid">
            {TOPICS.map(topic => (
              <div key={topic.title} className="community-card">
                <div
                  className="community-card-icon"
                  style={{ background: topic.color.bg, borderColor: topic.color.border, color: topic.color.text }}
                >
                  {topic.icon}
                </div>
                <h3>{topic.title}</h3>
                <p>{topic.text}</p>
                <a
                  href="https://discord.gg/D9GwqWpwHT"
                  className="btn-ghost"
                  target="_blank"
                  rel="noopener"
                  style={{ fontSize: '0.82rem', padding: '6px 14px' }}
                >
                  Zum Channel →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MINECRAFT */}
      <section className="comm-section">
        <div className="container">
          <div className="comm-section-label">
            <span className="dot" style={{ background: '#4ade80' }} />
            MINECRAFT
          </div>
          <h2 className="comm-section-title">Unser Modded Server</h2>
          <p className="comm-section-sub">
            All The Mods 10 — hunderte Mods, endlose Möglichkeiten. Tritt unserem Server bei und bau mit der Community.
          </p>

          <div className="mc-card">
            <div className="mc-card-header">
              <div className="mc-card-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
                </svg>
              </div>
              <div>
                <div className="mc-card-title">Flux Network · ATM10</div>
                <div className="mc-card-version">All The Mods 10 · v8.0 · MC 1.21.1</div>
              </div>
              <div className="mc-online-dot" title="Server online" />
            </div>

            <div className="mc-card-body">
              <div className="mc-info-grid">
                {[
                  { label: 'Modpack', val: 'All The Mods 10' },
                  { label: 'Version', val: '8.0' },
                  { label: 'Minecraft', val: '1.21.1' },
                  { label: 'Modloader', val: 'NeoForge' },
                ].map(item => (
                  <div key={item.label} className="mc-info-item">
                    <span className="mc-info-label">{item.label}</span>
                    <span className="mc-info-val">{item.val}</span>
                  </div>
                ))}
              </div>

              <div className="mc-ip-row">
                <div>
                  <div className="mc-ip-label">Server-IP</div>
                  <div className="mc-ip-val">mc.flux0.dev</div>
                </div>
                <CopyButton text="mc.flux0.dev" />
              </div>

              <div className="mc-tags">
                {MC_TAGS.map(tag => (
                  <span key={tag} className="mc-tag">
                    <span className="mc-tag-dot" />
                    {tag}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: '1.6', margin: '0' }}>
                Das Modpack herunterladen:{' '}
                <a href="https://www.curseforge.com/minecraft/modpacks/all-the-mods-10" target="_blank" rel="noopener" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '600' }}>
                  CurseForge →
                </a>
                {' '}oder{' '}
                <a href="https://modrinth.com/modpack/all-the-mods-10" target="_blank" rel="noopener" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: '600' }}>
                  Modrinth →
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <CookieNotice />
    </>
  );
}
