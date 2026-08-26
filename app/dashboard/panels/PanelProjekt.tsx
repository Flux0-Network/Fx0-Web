'use client';

import type { ProjectData } from '@/lib/types';

const STATUS_LABELS = ['Anfrage eingegangen', 'Design', 'In Entwicklung', 'Launch'];
const STEP_LABELS = ['Anfrage', 'Design', 'Entwicklung', 'Launch'];

interface Props {
  project: ProjectData | null;
}

export default function PanelProjekt({ project }: Props) {
  if (!project) {
    return (
      <div className="dash-projekt-card" style={{ borderRadius: 14, border: '1px solid var(--border-md)', background: 'var(--surface)', padding: '32px 28px', textAlign: 'center' }}>
        <div style={{ marginBottom: 14, color: 'var(--dim)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
        </div>
        <div style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: 8 }}>Kein aktives Projekt</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--dim)', lineHeight: 1.5, marginBottom: 18 }}>Du hast noch keine Website-Anfrage gestellt. Starte eine neue Anfrage — wir melden uns innerhalb von 24h.</div>
      </div>
    );
  }

  const statusIdx = project.status ?? 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Status badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 600, padding: '4px 12px', borderRadius: 20, background: 'var(--surface)', color: 'var(--muted)', border: '1px solid var(--border-md)' }}>
          {project.paket || 'Individuell'}
        </div>
        <div style={{ fontSize: '0.78rem', fontWeight: 600, padding: '4px 12px', borderRadius: 20, background: '#3b82f620', color: '#3b82f6', border: '1px solid #3b82f640' }}>
          {STATUS_LABELS[statusIdx] || 'In Bearbeitung'}
        </div>
      </div>

      {/* Progress steps */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {STEP_LABELS.map((label, i) => {
          const done = i < statusIdx;
          const active = i === statusIdx;
          return (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 20, fontSize: '0.8rem', fontWeight: active ? 600 : 400, background: done ? '#22c55e15' : active ? 'var(--surface)' : 'transparent', border: `1px solid ${done ? '#22c55e40' : active ? 'var(--border-md)' : 'var(--border)'}`, color: done ? '#22c55e' : active ? 'var(--fg)' : 'var(--dim)' }}>
              {done && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>}
              {label}
            </div>
          );
        })}
      </div>

      {/* Note */}
      {project.note && (
        <div style={{ padding: '12px 16px', background: 'var(--surface)', borderRadius: 10, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5, borderLeft: '3px solid var(--border-md)' }}>
          {project.note}
        </div>
      )}
    </div>
  );
}
