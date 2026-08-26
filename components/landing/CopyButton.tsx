'use client';

import { useState } from 'react';

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <button
      className={`mc-copy-btn${copied ? ' copied' : ''}`}
      onClick={handleCopy}
    >
      {copied ? 'Kopiert!' : 'Kopieren'}
    </button>
  );
}
