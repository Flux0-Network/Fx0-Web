'use client';

import { useEffect, useState } from 'react';

interface DiscordStats {
  members: string;
  online: string;
}

export default function DiscordStats() {
  const [stats, setStats] = useState<DiscordStats>({ members: '—', online: '—' });

  useEffect(() => {
    fetch('https://discord.com/api/v9/invites/D9GwqWpwHT?with_counts=true')
      .then(r => r.ok ? r.json() : null)
      .then((data) => {
        if (!data) return;
        setStats({
          members: data.approximate_member_count?.toLocaleString('de-DE') ?? '—',
          online: data.approximate_presence_count?.toLocaleString('de-DE') ?? '—',
        });
      })
      .catch(() => {});
  }, []);

  return (
    <div className="discord-card-stats">
      <div className="discord-stat">
        <span className="discord-stat-val">{stats.members}</span>
        <span className="discord-stat-label">Mitglieder</span>
      </div>
      <div className="discord-stat discord-stat-online">
        <span className="discord-stat-val">{stats.online}</span>
        <span className="discord-stat-label">Online</span>
      </div>
    </div>
  );
}
