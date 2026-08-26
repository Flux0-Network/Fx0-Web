'use client';

interface Props {
  id: string;
  avatar?: string | null;
  username: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function DiscordAvatar({ id, avatar, username, size = 64, className = '', style }: Props) {
  if (avatar) {
    return (
      <img
        src={`https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=${size}`}
        alt={username}
        className={className}
        style={style}
      />
    );
  }
  return (
    <div
      className={className}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', color: 'var(--fg)', fontWeight: 600, ...style }}
    >
      {(username || '?')[0].toUpperCase()}
    </div>
  );
}
