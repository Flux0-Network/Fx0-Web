'use client';

import { useState } from 'react';
import type { Ticket } from '@/lib/types';

const STATUS_LABEL: Record<string, string> = { open: 'Offen', in_progress: 'In Bearbeitung', closed: 'Geschlossen' };
const STATUS_COLOR: Record<string, string> = { open: '#f59e0b', in_progress: '#3b82f6', closed: '#22c55e' };

interface Props {
  tickets: Ticket[];
  onTicketAdded: (t: Ticket) => void;
}

export default function PanelSupport({ tickets, onTicketAdded }: Props) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [openTickets, setOpenTickets] = useState<Record<string, boolean>>({});
  const [replies, setReplies] = useState<Record<string, string>>({});
  const [replySending, setReplySending] = useState<Record<string, boolean>>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) { setError('Bitte fülle alle Felder aus.'); return; }
    setError('');
    setLoading(true);
    try {
      const r = await fetch('/api/ticket', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, message }),
      });
      if (!r.ok) throw new Error((await r.json()).error || 'Fehler');
      const { id } = await r.json() as { id: string; ok: boolean };
      const newTicket: Ticket = { id, userId: '', username: '', subject, message, status: 'open', createdAt: Date.now(), replies: [] };
      onTicketAdded(newTicket);
      setSuccess(true);
      setSubject('');
      setMessage('');
    } catch {
      setError('Senden fehlgeschlagen — versuch es nochmal.');
    }
    setLoading(false);
  }

  async function sendReply(ticketId: string) {
    const msg = replies[ticketId]?.trim();
    if (!msg) return;
    setReplySending(s => ({ ...s, [ticketId]: true }));
    const r = await fetch('/api/ticket', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticketId, message: msg }),
    });
    if (r.ok) setReplies(s => ({ ...s, [ticketId]: '' }));
    setReplySending(s => ({ ...s, [ticketId]: false }));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Form */}
      {success ? (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '20px 24px', background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border-md)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
          <div><strong>Ticket gesendet!</strong><p style={{ color: 'var(--dim)', fontSize: '0.85rem', marginTop: 4 }}>Wir melden uns so schnell wie möglich.</p></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 520 }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--dim)', display: 'block', marginBottom: 6 }}>Betreff</label>
            <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Worum geht es?" style={{ width: '100%', padding: '9px 14px', background: 'var(--surface)', border: '1px solid var(--border-md)', borderRadius: 10, color: 'var(--fg)', fontSize: '0.88rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--dim)', display: 'block', marginBottom: 6 }}>Nachricht</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Beschreibe dein Anliegen so genau wie möglich." rows={4} style={{ width: '100%', padding: '9px 14px', background: 'var(--surface)', border: '1px solid var(--border-md)', borderRadius: 10, color: 'var(--fg)', fontSize: '0.88rem', fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          {error && <div style={{ padding: '10px 14px', background: 'rgba(245,158,11,.08)', border: '1px solid #f59e0b', borderRadius: 8, color: '#f59e0b', fontSize: '0.84rem' }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ padding: '11px 20px', background: 'var(--fg)', color: 'var(--bg)', border: 'none', borderRadius: 10, fontSize: '0.9rem', fontWeight: 600, fontFamily: 'inherit', cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.7 : 1, alignSelf: 'flex-start' }}>
            {loading ? 'Wird gesendet…' : 'Ticket senden →'}
          </button>
        </form>
      )}

      {/* Ticket list */}
      {tickets.length > 0 && (
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--dim)', marginBottom: 12 }}>Meine Tickets</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {tickets.map(t => {
              const isOpen = openTickets[t.id];
              const color = STATUS_COLOR[t.status] || '#888';
              return (
                <div key={t.id} style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', background: 'var(--bg)' }}>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', cursor: 'pointer', userSelect: 'none' }}
                    onClick={() => setOpenTickets(s => ({ ...s, [t.id]: !s[t.id] }))}
                  >
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0, display: 'inline-block' }} />
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, flex: 1 }}>{t.subject}</span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, color }}>{STATUS_LABEL[t.status] || t.status}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--dim)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▾</span>
                  </div>
                  {isOpen && (
                    <div style={{ borderTop: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 16, maxHeight: 320, overflowY: 'auto' }}>
                        <Bubble from="user" text={t.message} date={t.createdAt} />
                        {t.replies.map((r, i) => (
                          <Bubble key={i} from={r.from} text={r.text || r.message || ''} date={r.createdAt} />
                        ))}
                      </div>
                      {t.status !== 'closed' && (
                        <div style={{ display: 'flex', gap: 8, padding: '0 16px 16px' }}>
                          <input
                            value={replies[t.id] || ''}
                            onChange={e => setReplies(s => ({ ...s, [t.id]: e.target.value }))}
                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); sendReply(t.id); } }}
                            placeholder="Antworten…"
                            style={{ flex: 1, padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 8, background: 'var(--bg)', color: 'var(--fg)', fontSize: '0.84rem', outline: 'none' }}
                          />
                          <button onClick={() => sendReply(t.id)} disabled={replySending[t.id]} style={{ padding: '8px 13px', borderRadius: 8, background: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Bubble({ from, text, date }: { from: string; text: string; date: number }) {
  const isUser = from === 'user';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start' }}>
      <div style={{ maxWidth: '80%', padding: '9px 13px', borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px', fontSize: '0.84rem', lineHeight: 1.45, background: isUser ? 'var(--accent)' : 'var(--surface)', color: isUser ? '#fff' : 'var(--fg)', wordBreak: 'break-word' }}>
        {text}
      </div>
      <div style={{ fontSize: '0.68rem', color: 'var(--dim)', marginTop: 3 }}>
        {isUser ? 'Du' : 'Support'} · {new Date(date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
}
