'use client';

import { useEffect, useRef, useState } from 'react';
import type { UserData, ProjectData, DocItem, Ticket, AdminUser } from '@/lib/types';
import DiscordAvatar from '@/components/DiscordAvatar';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import PanelProjekt from './panels/PanelProjekt';
import PanelAnfrage from './panels/PanelAnfrage';
import PanelDokumente from './panels/PanelDokumente';
import PanelSupport from './panels/PanelSupport';
import PanelVerbindungen from './panels/PanelVerbindungen';
import PanelAdmin from './panels/PanelAdmin';

type View = 'loading' | 'login' | 'dashboard';
type EmailStatus = 'idle' | 'loading' | 'error';

export type PanelId = 'projekt' | 'anfrage' | 'dokumente' | 'support' | 'verbindungen' | 'admin';

const DISCORD_AUTH_URL =
  'https://discord.com/oauth2/authorize?client_id=1144724108135911554&response_type=code&redirect_uri=https%3A%2F%2Fflux0.dev%2Fapi%2FcallBack&scope=identify';

export default function DashboardClient() {
  const [view, setView] = useState<View>('loading');
  const [user, setUser] = useState<UserData | null>(null);
  const [project, setProject] = useState<ProjectData | null>(null);
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activePanel, setActivePanel] = useState<PanelId>('projekt');
  const [errorMsg, setErrorMsg]       = useState<string | null>(null);
  const [emailVal, setEmailVal]       = useState('');
  const [passVal, setPassVal]         = useState('');
  const [emailStatus, setEmailStatus] = useState<EmailStatus>('idle');
  const [emailErr, setEmailErr]       = useState<string | null>(null);

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // URL error from OAuth callback
    const urlError = new URLSearchParams(window.location.search).get('error');
    if (urlError) {
      const ERRORS: Record<string, string> = {
        cancelled: 'Login abgebrochen.',
        token: 'Discord hat keinen gültigen Token zurückgegeben.',
        server: 'Interner Fehler beim Login.',
      };
      setErrorMsg(ERRORS[urlError] || 'Unbekannter Fehler.');
    }

    // Restore last active panel
    try {
      const saved = localStorage.getItem('flux0-dash-section') as PanelId | null;
      if (saved) setActivePanel(saved);
    } catch {}

    fetch('/api/me', { credentials: 'include' })
      .then(r => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json() as Promise<UserData>;
      })
      .then(data => {
        setUser(data);
        setView('dashboard');

        // Load user data
        fetch('/api/user-data', { credentials: 'include' })
          .then(r => r.ok ? r.json() : null)
          .then((json: { docs?: DocItem[] } | null) => {
            if (json?.docs) setDocs(json.docs);
          }).catch(() => {});

        // Load project
        fetch('/api/my-project', { credentials: 'include' })
          .then(r => r.ok ? r.json() : null)
          .then((p: ProjectData | null) => { if (p) setProject(p); })
          .catch(() => {});

        // Load tickets
        fetch('/api/ticket', { credentials: 'include' })
          .then(r => r.ok ? r.json() : null)
          .then((json: { tickets?: Ticket[] } | null) => { if (json?.tickets) setTickets(json.tickets); })
          .catch(() => {});
      })
      .catch(() => setView('login'));
  }, []);

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setEmailErr(null);
    setEmailStatus('loading');
    try {
      const res = await fetch('/api/auth/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: emailVal, password: passVal }),
      });
      const data = await res.json() as { ok?: boolean; error?: string };
      if (data.ok) {
        window.location.reload();
      } else {
        setEmailErr(data.error || 'Fehler beim Login.');
        setEmailStatus('error');
      }
    } catch {
      setEmailErr('Verbindungsfehler.');
      setEmailStatus('error');
    }
  }

  function navigate(panel: PanelId) {
    setActivePanel(panel);
    try { localStorage.setItem('flux0-dash-section', panel); } catch {}
  }

  if (view === 'loading') {
    return (
      <div className="dash-app" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--dim)', fontSize: '0.9rem' }}>Wird geladen…</div>
      </div>
    );
  }

  if (view === 'login') {
    return (
      <div className="dash-app" style={{ alignItems: 'center', justifyContent: 'center' }}>
        {errorMsg && (
          <div style={{ marginBottom: 16, padding: '10px 16px', background: 'rgba(245,158,11,.1)', border: '1px solid #f59e0b', borderRadius: 10, color: '#f59e0b', fontSize: '0.85rem', maxWidth: 400, textAlign: 'center' }}>
            {errorMsg}
          </div>
        )}
        <div className="dash-login-card">
          <img src="/logo1.png" alt="Flux Network" style={{ height: 24, width: 'auto', marginBottom: 24, opacity: 0.9 }} />
          <h2 style={{ marginBottom: 6 }}>Anmelden</h2>
          <p style={{ marginBottom: 20 }}>Early Access &amp; Beta-Releases — für alle die eingeloggt sind.</p>

          {/* Email form */}
          <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
            <input
              type="email"
              placeholder="Email"
              value={emailVal}
              onChange={e => setEmailVal(e.target.value)}
              required
              disabled={emailStatus === 'loading'}
              className="dash-login-input"
            />
            <input
              type="password"
              placeholder="Passwort (min. 6 Zeichen)"
              value={passVal}
              onChange={e => setPassVal(e.target.value)}
              required
              disabled={emailStatus === 'loading'}
              className="dash-login-input"
            />
            {emailErr && (
              <div style={{ fontSize: '0.78rem', color: '#f87171', textAlign: 'center' }}>{emailErr}</div>
            )}
            <button type="submit" className="dash-login-email-btn" disabled={emailStatus === 'loading'}>
              {emailStatus === 'loading' ? 'Wird geladen…' : 'Anmelden / Registrieren →'}
            </button>
          </form>

          <div className="dash-login-divider"><span>oder</span></div>

          <a href={DISCORD_AUTH_URL} className="btn-discord">
            <DiscordIcon size={18} />
            Mit Discord einloggen
          </a>
          <p style={{ fontSize: '0.72rem', color: 'var(--dim)', marginTop: 16, textAlign: 'center' }}>
            Neue Email-Adresse? Konto wird automatisch erstellt.
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const userName = user.global_name || user.username || '—';

  return (
    <div className="dash-app">
      {/* Mobile header */}
      <div className="dash-mobile-header">
        <img src="/logo1.png" alt="Flux0" className="dash-mobile-logo" />
        <div className="dash-mobile-avatar">
          <DiscordAvatar id={user.id} avatar={user.avatar} username={userName} size={60} style={{ width: '100%', height: '100%' }} />
        </div>
      </div>

      {/* Desktop top bar */}
      <TopBar user={user} userName={userName} />

      <div className="dash-body">
        <Sidebar
          isAdmin={user.isAdmin}
          activePanel={activePanel}
          onNavigate={navigate}
        />
        <main className="dash-main">
          <div className={`dash-panel${activePanel === 'projekt' ? ' active' : ''}`}>
            <div className="dash-panel-title">Mein Projekt</div>
            <PanelProjekt project={project} />
          </div>
          <div className={`dash-panel${activePanel === 'anfrage' ? ' active' : ''}`}>
            <div className="dash-panel-title">Neue Anfrage</div>
            <PanelAnfrage />
          </div>
          <div className={`dash-panel${activePanel === 'dokumente' ? ' active' : ''}`}>
            <div className="dash-panel-title">Dokumente</div>
            <PanelDokumente docs={docs} />
          </div>
          <div className={`dash-panel${activePanel === 'support' ? ' active' : ''}`}>
            <div className="dash-panel-title">Support</div>
            <PanelSupport tickets={tickets} onTicketAdded={t => setTickets(prev => [t, ...prev])} />
          </div>
          <div className={`dash-panel${activePanel === 'verbindungen' ? ' active' : ''}`}>
            <div className="dash-panel-title">Verbindungen</div>
            <PanelVerbindungen user={user} userName={userName} />
          </div>
          {user.isAdmin && (
            <div className={`dash-panel dash-panel-admin${activePanel === 'admin' ? ' active' : ''}`}>
              <PanelAdmin />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function DiscordIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 71 55" fill="currentColor">
      <path d="M60.1 4.9A58.5 58.5 0 0 0 45.5.7a.2.2 0 0 0-.2.1 40.7 40.7 0 0 0-1.8 3.7 54 54 0 0 0-16.2 0A37.7 37.7 0 0 0 25.5.8a.2.2 0 0 0-.2-.1A58.4 58.4 0 0 0 10.7 4.9a.2.2 0 0 0-.1.1C1.6 18.1-.9 31 .3 43.7a.2.2 0 0 0 .1.1 58.8 58.8 0 0 0 17.7 9 .2.2 0 0 0 .2-.1 42 42 0 0 0 3.6-5.9.2.2 0 0 0-.1-.3 38.7 38.7 0 0 1-5.5-2.6.2.2 0 0 1 0-.4l1.1-.8a.2.2 0 0 1 .2 0c11.6 5.3 24.1 5.3 35.5 0a.2.2 0 0 1 .2 0l1.1.8a.2.2 0 0 1 0 .4 36 36 0 0 1-5.5 2.6.2.2 0 0 0-.1.3 47.1 47.1 0 0 0 3.6 5.9.2.2 0 0 0 .2.1 58.6 58.6 0 0 0 17.8-9 .2.2 0 0 0 .1-.1c1.5-15.2-2.5-28-10.6-39.7a.2.2 0 0 0-.1-.1ZM23.7 36.1c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2Zm23.7 0c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.6 0 6.5 3.3 6.4 7.2 0 4-2.8 7.2-6.4 7.2Z" />
    </svg>
  );
}
