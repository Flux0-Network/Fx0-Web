'use client';

import { useEffect, useState } from 'react';
import type { AdminUser, Ticket, DocItem } from '@/lib/types';
import DiscordAvatar from '@/components/DiscordAvatar';

type AdminTab = 'benutzer' | 'tickets' | 'logs';

interface LogEntry {
  userId: string;
  username?: string;
  global_name?: string;
  avatar?: string;
  action: string;
  timestamp: number;
  ip?: string | null;
}

export default function PanelAdmin() {
  const [tab, setTab] = useState<AdminTab>('benutzer');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loadedTabs, setLoadedTabs] = useState<Set<AdminTab>>(new Set());
  const [loading, setLoading] = useState<Record<AdminTab, boolean>>({ benutzer: true, tickets: false, logs: false });
  const [modalUser, setModalUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    loadTab('benutzer');
  }, []);

  async function loadTab(t: AdminTab) {
    if (loadedTabs.has(t)) { setTab(t); return; }
    setTab(t);
    setLoading(s => ({ ...s, [t]: true }));
    try {
      if (t === 'benutzer') {
        const r = await fetch('/api/admin-users', { credentials: 'include' });
        const { users: u = [] } = await r.json() as { users: AdminUser[] };
        setUsers(u);
      } else if (t === 'tickets') {
        const r = await fetch('/api/admin-tickets', { credentials: 'include' });
        const { tickets: tk = [] } = await r.json() as { tickets: Ticket[] };
        setTickets(tk);
      } else {
        const r = await fetch('/api/admin-logs', { credentials: 'include' });
        const { logs: l = [] } = await r.json() as { logs: LogEntry[] };
        setLogs(l);
      }
    } catch {}
    setLoadedTabs(s => new Set([...s, t]));
    setLoading(s => ({ ...s, [t]: false }));
  }

  return (
    <>
      <div className="dash-admin-subnav">
        {(['benutzer', 'tickets', 'logs'] as AdminTab[]).map(t => (
          <button key={t} className={`dash-admin-tab${tab === t ? ' active' : ''}`} onClick={() => loadTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div className="dash-admin-content">
        {tab === 'benutzer' && (
          loading.benutzer ? <Spinner /> :
          users.length === 0 ? <Empty msg="Noch keine Benutzer." /> :
          <UsersTab users={users} onSelectUser={setModalUser} />
        )}
        {tab === 'tickets' && (
          loading.tickets ? <Spinner /> :
          tickets.length === 0 ? <Empty msg="Noch keine Tickets." /> :
          <TicketsTab tickets={tickets} />
        )}
        {tab === 'logs' && (
          loading.logs ? <Spinner /> :
          logs.length === 0 ? <Empty msg="Keine Logs vorhanden." /> :
          <LogsTab logs={logs} />
        )}
      </div>
      {modalUser && (
        <UserModal user={modalUser} onClose={() => setModalUser(null)} onUpdate={updated => {
          setUsers(u => u.map(x => x.id === updated.id ? { ...x, project: updated.project } : x));
          setModalUser(m => m ? { ...m, project: updated.project } : null);
        }} />
      )}
    </>
  );
}

// ─── Users tab ─────────────────────────────────────────────────────────────

const STATUS_COLORS = ['#f59e0b', '#3b82f6', '#22c55e'];
const STATUS_LABELS_SHORT = ['Offen', 'In Arbeit', 'Fertig'];

function UsersTab({ users, onSelectUser }: { users: AdminUser[]; onSelectUser: (u: AdminUser) => void }) {
  const withProject = users.filter(u => u.project).length;
  const done = users.filter(u => u.project?.status === 2).length;

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'var(--border)', marginBottom: 1 }}>
        {[['Benutzer', users.length, 'var(--fg)'], ['Mit Anfrage', withProject, 'var(--fg)'], ['Abgeschlossen', done, '#22c55e']].map(([label, val, color]) => (
          <div key={label as string} style={{ background: 'var(--bg)', padding: '14px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: color as string }}>{val}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>
      {users.map(u => {
        const name = u.global_name || u.username || '?';
        const proj = u.project;
        const si = typeof proj?.status === 'number' ? proj.status : 0;
        return (
          <div
            key={u.id}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 20px', borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background .12s' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
            onMouseLeave={e => (e.currentTarget.style.background = '')}
            onClick={() => onSelectUser(u)}
          >
            <div style={{ width: 38, height: 38, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
              <DiscordAvatar id={u.id} avatar={u.avatar} username={name} size={64} style={{ width: '100%', height: '100%', fontSize: '0.95rem', fontWeight: 700 }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{name}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--dim)', marginTop: 1, fontFamily: 'monospace' }}>{u.id}</div>
              {proj && (
                <div style={{ marginTop: 5, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 20, background: 'var(--surface)', color: 'var(--muted)' }}>{proj.paket || 'Anfrage'}</span>
                  <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 20, border: `1px solid ${STATUS_COLORS[si]}`, color: STATUS_COLORS[si] }}>{STATUS_LABELS_SHORT[si]}</span>
                </div>
              )}
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, color: 'var(--dim)', marginTop: 2 }}><polyline points="9 18 15 12 9 6" /></svg>
          </div>
        );
      })}
    </div>
  );
}

// ─── Tickets tab ────────────────────────────────────────────────────────────

function TicketsTab({ tickets }: { tickets: Ticket[] }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [replies, setReplies] = useState<Record<string, string>>({});
  const [ticketList, setTicketList] = useState(tickets);

  const open = ticketList.filter(t => t.status !== 'closed').length;

  async function sendReply(t: Ticket) {
    const msg = replies[t.id]?.trim(); if (!msg) return;
    const r = await fetch('/api/admin-tickets', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ticketId: t.id, reply: msg }) });
    if (r.ok) {
      setReplies(s => ({ ...s, [t.id]: '' }));
      setTicketList(prev => prev.map(tk => tk.id === t.id ? { ...tk, replies: [...tk.replies, { from: 'admin', text: msg, createdAt: Date.now() }] } : tk));
    }
  }

  async function closeTicket(id: string) {
    await fetch('/api/admin-tickets', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ticketId: id, status: 'closed' }) });
    setTicketList(prev => prev.map(t => t.id === id ? { ...t, status: 'closed' } : t));
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 1, background: 'var(--border)', marginBottom: 1 }}>
        {[['Offen', open, '#3b82f6'], ['Geschlossen', ticketList.length - open, 'var(--fg)']].map(([l, v, c]) => (
          <div key={l as string} style={{ background: 'var(--bg)', padding: '14px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: c as string }}>{v}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>
      {ticketList.map(t => {
        const isOpen2 = t.status !== 'closed';
        const name = t.global_name || t.username || '?';
        const exp = expanded[t.id];
        return (
          <div key={t.id} style={{ borderBottom: '1px solid var(--border)', borderLeft: `3px solid ${isOpen2 ? '#3b82f6' : 'transparent'}` }}>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px', cursor: 'pointer', transition: 'background .12s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
              onMouseLeave={e => (e.currentTarget.style.background = '')}
              onClick={() => setExpanded(s => ({ ...s, [t.id]: !s[t.id] }))}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.subject}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 2 }}>{name} · {new Date(t.createdAt).toLocaleDateString('de-DE')} · {(t.replies || []).length} Antworten</div>
              </div>
              <span style={{ fontSize: '0.68rem', padding: '3px 9px', borderRadius: 20, border: `1px solid ${isOpen2 ? '#3b82f6' : 'var(--border)'}`, color: isOpen2 ? '#3b82f6' : 'var(--muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>{isOpen2 ? 'Offen' : 'Geschlossen'}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--dim)', transform: exp ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▾</span>
            </div>
            {exp && (
              <div style={{ padding: '0 16px 16px' }}>
                <div style={{ padding: '10px 14px', background: 'var(--surface)', borderRadius: 10, fontSize: '0.84rem', margin: '10px 0', whiteSpace: 'pre-wrap', wordBreak: 'break-word', lineHeight: 1.5 }}>{t.message}</div>
                {t.replies.map((rpl, i) => (
                  <div key={i} style={{ display: 'flex', marginBottom: 6, justifyContent: rpl.from === 'admin' ? 'flex-end' : 'flex-start' }}>
                    <span style={{ padding: '8px 13px', borderRadius: 14, fontSize: '0.83rem', maxWidth: '78%', lineHeight: 1.4, wordBreak: 'break-word', background: rpl.from === 'admin' ? '#3b82f6' : 'var(--surface)', color: rpl.from === 'admin' ? '#fff' : 'var(--fg)' }}>{rpl.text || rpl.message || ''}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                  <input value={replies[t.id] || ''} onChange={e => setReplies(s => ({ ...s, [t.id]: e.target.value }))} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); sendReply(t); } }} placeholder="Als Admin antworten…" style={{ flex: 1, padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 8, background: 'var(--bg)', color: 'var(--fg)', fontSize: '0.84rem', minWidth: 0, outline: 'none' }} />
                  <button onClick={() => sendReply(t)} style={{ padding: '8px 13px', borderRadius: 8, background: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                  </button>
                  {isOpen2 && <button onClick={() => closeTicket(t.id)} style={{ padding: '8px 13px', borderRadius: 8, background: 'var(--surface)', color: 'var(--muted)', border: '1px solid var(--border-md)', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit' }}>Schließen</button>}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Logs tab ───────────────────────────────────────────────────────────────

function LogsTab({ logs }: { logs: LogEntry[] }) {
  return (
    <div>
      {logs.map((l, i) => {
        const name = l.global_name || l.username || l.userId;
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
              <DiscordAvatar id={l.userId} avatar={l.avatar} username={name} size={64} style={{ width: '100%', height: '100%', fontSize: '0.8rem', fontWeight: 600 }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{name}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--dim)', marginTop: 1 }}>{l.action} {l.ip ? `· ${l.ip}` : ''}</div>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--dim)', flexShrink: 0 }}>
              {new Date(l.timestamp).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── User modal ─────────────────────────────────────────────────────────────

function UserModal({ user, onClose, onUpdate }: { user: AdminUser; onClose: () => void; onUpdate: (u: AdminUser) => void }) {
  const name = user.global_name || user.username || '?';
  const proj = user.project;
  const [status, setStatus] = useState(proj?.status ?? 0);
  const [projName, setProjName] = useState(proj?.name || '');
  const [paket, setPaket] = useState(proj?.paket || '');
  const [note, setNote] = useState(proj?.note || '');
  const [saving, setSaving] = useState(false);
  const [savedOk, setSavedOk] = useState(false);
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [docsLoaded, setDocsLoaded] = useState(false);
  const [docName, setDocName] = useState('');
  const [docUrl, setDocUrl] = useState('');
  const [docType, setDocType] = useState('Angebot');
  const [addingDoc, setAddingDoc] = useState(false);

  useEffect(() => {
    fetch(`/api/admin-users?userId=${user.id}`, { credentials: 'include' })
      .then(r => r.json() as Promise<{ docs: DocItem[] }>)
      .then(({ docs: d = [] }) => { setDocs(d); setDocsLoaded(true); })
      .catch(() => setDocsLoaded(true));
  }, [user.id]);

  async function saveProject() {
    setSaving(true);
    const r = await fetch('/api/admin-users', { method: 'PATCH', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: user.id, status, name: projName, paket, note }) });
    if (r.ok) {
      const { proj: p } = await r.json() as { proj: { status: number; name?: string; paket?: string; note?: string } };
      onUpdate({ ...user, project: p as AdminUser['project'] });
      setSavedOk(true);
      setTimeout(() => setSavedOk(false), 1600);
    }
    setSaving(false);
  }

  async function updateStatus(i: number) {
    if (i === status) return;
    await fetch('/api/admin-users', { method: 'PATCH', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: user.id, status: i }) });
    setStatus(i);
    onUpdate({ ...user, project: { ...user.project, status: i } as AdminUser['project'] });
  }

  async function deleteDoc(docId: string) {
    if (!confirm('Dokument löschen?')) return;
    const r = await fetch('/api/admin-users', { method: 'DELETE', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: user.id, docId }) });
    if (r.ok) setDocs(d => d.filter(x => x.id !== docId));
  }

  async function addDoc() {
    if (!docName.trim() || !docUrl.trim()) return;
    setAddingDoc(true);
    const r = await fetch('/api/admin-users', { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: user.id, name: docName.trim(), url: docUrl.trim(), type: docType }) });
    if (r.ok) {
      const { doc } = await r.json() as { doc: DocItem };
      setDocs(d => [doc, ...d]);
      setDocName(''); setDocUrl('');
    }
    setAddingDoc(false);
  }

  return (
    <div className="aum-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="aum-panel">
        <div className="aum-header">
          <div className="aum-avatar">
            <DiscordAvatar id={user.id} avatar={user.avatar} username={name} size={128} style={{ width: '100%', height: '100%', fontSize: '1.1rem', fontWeight: 700 }} />
          </div>
          <div className="aum-title"><h3>{name}</h3><small>{user.id}</small></div>
          <button className="aum-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        <div className="aum-body">
          {/* Project section */}
          <div className="aum-section">
            <div className="aum-section-title">Projekt</div>
            {!proj ? (
              <div style={{ fontSize: '0.84rem', color: 'var(--dim)', padding: '10px 0' }}>Kein aktives Projekt.</div>
            ) : (
              <>
                <div className="aum-status-row">
                  {STATUS_LABELS_SHORT.map((lbl, i) => (
                    <button key={lbl} className={`aum-status-btn${i === status ? ' active' : ''}`} style={i === status ? { background: STATUS_COLORS[i], color: '#fff', borderColor: STATUS_COLORS[i] } : {}} onClick={() => updateStatus(i)}>
                      {lbl}
                    </button>
                  ))}
                </div>
                <div className="aum-field"><label>Projektname</label><input value={projName} onChange={e => setProjName(e.target.value)} placeholder="z.B. Firmenwebsite" /></div>
                <div className="aum-field"><label>Paket</label><input value={paket} onChange={e => setPaket(e.target.value)} placeholder="z.B. Individuell" /></div>
                <div className="aum-field"><label>Notiz (intern)</label><textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Interne Notiz…" /></div>
                <button className="aum-btn aum-btn-primary" onClick={saveProject} disabled={saving}>{saving ? '…' : savedOk ? 'Gespeichert ✓' : 'Speichern'}</button>
              </>
            )}
          </div>
          {/* Documents section */}
          <div className="aum-section">
            <div className="aum-section-title">Dokumente</div>
            {docsLoaded && docs.length === 0 && <div style={{ fontSize: '0.82rem', color: 'var(--dim)', padding: '6px 0 10px' }}>Keine Dokumente.</div>}
            {docs.map(doc => (
              <div key={doc.id} className="aum-doc-row">
                <span className="aum-doc-type">{doc.type}</span>
                <a href={doc.url} target="_blank" rel="noopener" className="aum-doc-name" style={{ color: 'var(--muted)' }}>{doc.name}</a>
                <button className="aum-doc-del" onClick={() => deleteDoc(doc.id)}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /></svg>
                </button>
              </div>
            ))}
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 7 }}>
              <div className="aum-field" style={{ margin: 0 }}><label>Name</label><input value={docName} onChange={e => setDocName(e.target.value)} placeholder="z.B. Angebot #001" /></div>
              <div className="aum-field" style={{ margin: 0 }}><label>URL</label><input value={docUrl} onChange={e => setDocUrl(e.target.value)} placeholder="https://…" /></div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <select value={docType} onChange={e => setDocType(e.target.value)} style={{ padding: '7px 10px', background: 'var(--surface)', border: '1px solid var(--border-md)', borderRadius: 8, color: 'var(--fg)', fontSize: '0.83rem', fontFamily: 'inherit', outline: 'none', flex: 1 }}>
                  {['Angebot', 'Rechnung', 'Vertrag', 'Dokument', 'Sonstiges'].map(t => <option key={t}>{t}</option>)}
                </select>
                <button className="aum-btn aum-btn-ghost" onClick={addDoc} disabled={addingDoc}>{addingDoc ? '…' : '+ Hinzufügen'}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spinner() {
  return <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--muted)', fontSize: '0.85rem' }}>Wird geladen…</div>;
}

function Empty({ msg }: { msg: string }) {
  return <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--muted)', fontSize: '0.85rem' }}>{msg}</div>;
}
