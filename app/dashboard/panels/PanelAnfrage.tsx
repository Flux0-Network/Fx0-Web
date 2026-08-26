'use client';

import { useState } from 'react';

const PAKETE = ['Starter', 'Business', 'Premium', 'Individuell'];

export default function PanelAnfrage() {
  const [paket, setPaket] = useState('Starter');
  const [beschreibung, setBeschreibung] = useState('');
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!beschreibung.trim()) { setError('Bitte beschreibe dein Projekt.'); return; }
    setError('');
    setLoading(true);
    try {
      const r = await fetch('/api/anfrage', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paket, beschreibung, budget }),
      });
      if (!r.ok) throw new Error((await r.json()).error || 'Fehler');
      setSuccess(true);
    } catch {
      setError('Senden fehlgeschlagen — versuch es nochmal oder schreib uns direkt auf Discord.');
    }
    setLoading(false);
  }

  if (success) {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '20px 24px', background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border-md)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
        <div>
          <strong>Anfrage gesendet!</strong>
          <p style={{ color: 'var(--dim)', fontSize: '0.85rem', marginTop: 4 }}>Wir melden uns innerhalb von 24 Stunden — schau auch in deinen Discord.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520 }}>
      {/* Paket auswahl */}
      <div>
        <label style={{ fontSize: '0.8rem', color: 'var(--dim)', display: 'block', marginBottom: 8 }}>Paket</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {PAKETE.map(p => (
            <button
              key={p}
              type="button"
              onClick={() => setPaket(p)}
              style={{ padding: '6px 16px', borderRadius: 20, border: `1px solid ${paket === p ? 'var(--fg)' : 'var(--border-md)'}`, background: paket === p ? 'var(--fg)' : 'none', color: paket === p ? 'var(--bg)' : 'var(--muted)', cursor: 'pointer', fontSize: '0.84rem', fontFamily: 'inherit', fontWeight: paket === p ? 600 : 400 }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={{ fontSize: '0.8rem', color: 'var(--dim)', display: 'block', marginBottom: 6 }}>Projektbeschreibung *</label>
        <textarea
          value={beschreibung}
          onChange={e => setBeschreibung(e.target.value)}
          placeholder="Beschreibe dein Projekt so genau wie möglich — was soll gebaut werden, wer ist die Zielgruppe, welche Funktionen braucht du?"
          rows={5}
          style={{ width: '100%', padding: '10px 14px', background: 'var(--surface)', border: '1px solid var(--border-md)', borderRadius: 10, color: 'var(--fg)', fontSize: '0.88rem', fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
        />
      </div>

      <div>
        <label style={{ fontSize: '0.8rem', color: 'var(--dim)', display: 'block', marginBottom: 6 }}>Budget (optional)</label>
        <input
          value={budget}
          onChange={e => setBudget(e.target.value)}
          placeholder="z.B. 500–1500€"
          style={{ width: '100%', padding: '9px 14px', background: 'var(--surface)', border: '1px solid var(--border-md)', borderRadius: 10, color: 'var(--fg)', fontSize: '0.88rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
        />
      </div>

      {error && <div style={{ padding: '10px 14px', background: 'rgba(245,158,11,.08)', border: '1px solid #f59e0b', borderRadius: 8, color: '#f59e0b', fontSize: '0.84rem' }}>{error}</div>}

      <button type="submit" disabled={loading} style={{ padding: '11px 20px', background: 'var(--fg)', color: 'var(--bg)', border: 'none', borderRadius: 10, fontSize: '0.9rem', fontWeight: 600, fontFamily: 'inherit', cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.7 : 1, alignSelf: 'flex-start' }}>
        {loading ? 'Wird gesendet…' : 'Anfrage senden →'}
      </button>
    </form>
  );
}
