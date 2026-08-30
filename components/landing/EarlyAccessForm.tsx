'use client';

import { useState } from 'react';

export default function EarlyAccessForm() {
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'ok') {
    return (
      <div className="ea-success">
        <span className="ea-success-icon">✓</span>
        <span>Du bist auf der Liste — wir melden uns!</span>
      </div>
    );
  }

  return (
    <form className="ea-form" onSubmit={handleSubmit}>
      <input
        className="ea-input"
        type="email"
        placeholder="deine@email.de"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        disabled={status === 'loading'}
      />
      <button className="ea-btn" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? '...' : 'Early Access →'}
      </button>
      {status === 'error' && <span className="ea-error">Fehler — versuch es nochmal.</span>}
    </form>
  );
}
