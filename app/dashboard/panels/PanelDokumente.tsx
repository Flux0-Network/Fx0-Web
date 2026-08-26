'use client';

import type { DocItem } from '@/lib/types';

interface Props {
  docs: DocItem[];
}

export default function PanelDokumente({ docs }: Props) {
  if (!docs.length) {
    return (
      <div style={{ color: 'var(--dim)', fontSize: '0.88rem', padding: '24px 0' }}>
        Noch keine Dokumente vorhanden. Dokumente werden von uns hinzugefügt — z.B. Angebote, Rechnungen oder Verträge.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {docs.map(doc => (
        <a
          key={doc.id}
          href={doc.url}
          target="_blank"
          rel="noopener"
          style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 8, textDecoration: 'none', color: 'var(--fg)', fontSize: '0.88rem', background: 'var(--bg)', transition: 'border-color .12s' }}
        >
          <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--muted)', width: 72, flexShrink: 0 }}>{doc.type}</span>
          <span style={{ flex: 1 }}>{doc.name}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>↗</span>
        </a>
      ))}
    </div>
  );
}
