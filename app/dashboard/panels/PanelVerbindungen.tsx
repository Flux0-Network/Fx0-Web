'use client';

import type { UserData } from '@/lib/types';
import DiscordAvatar from '@/components/DiscordAvatar';

interface Props {
  user: UserData;
  userName: string;
}

export default function PanelVerbindungen({ user, userName }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ConnectionCard
        icon="/flowwave-icon.png"
        name="FlowWave"
        subtitle="Discord Bot Builder · pycord v2"
        status="Open Beta"
        statusColor="#f59e0b"
        user={user}
        userName={userName}
        note={<>Jetzt in der Open Beta verfügbar — öffne <a href="https://flowwave.app" target="_blank" rel="noopener" style={{ color: 'var(--accent)' }}>flowwave.app</a> und leg los.</>}
      />
      <ConnectionCard
        icon="/lumaspace-icon.png"
        name="LumaSpace"
        subtitle="KI-Produktivität · Collaboration · Workflows"
        status="Live"
        statusColor="#22c55e"
        user={user}
        userName={userName}
        note={<>Öffne LumaSpace unter <a href="https://lumaspace.de/" target="_blank" rel="noopener" style={{ color: 'var(--accent)' }}>lumaspace.de</a> — dein Flux0-Account ist bereits verknüpft.</>}
      />
    </div>
  );
}

interface CardProps {
  icon: string;
  name: string;
  subtitle: string;
  status: string;
  statusColor: string;
  user: UserData;
  userName: string;
  note: React.ReactNode;
}

function ConnectionCard({ icon, name, subtitle, status, statusColor, user, userName, note }: CardProps) {
  return (
    <div style={{ border: '1px solid var(--border-md)', borderRadius: 14, padding: '20px', background: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
          <img src={icon} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--dim)', marginTop: 2 }}>{subtitle}</div>
        </div>
        <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '3px 9px', borderRadius: 20, border: `1px solid ${statusColor}40`, color: statusColor, flexShrink: 0 }}>{status}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
          <DiscordAvatar id={user.id} avatar={user.avatar} username={userName} size={64} style={{ width: '100%', height: '100%', fontSize: '0.85rem', fontWeight: 600 }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '0.88rem', fontWeight: 500 }}>{userName}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--dim)' }}>ID: {user.id}</div>
        </div>
        <span style={{ fontSize: '0.72rem', fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: '#22c55e15', color: '#22c55e', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
          Verbunden
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 14px', background: 'rgba(255,255,255,.04)', borderRadius: 8, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.5 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" /></svg>
        <span>{note}</span>
      </div>
    </div>
  );
}
