export default function PerspectiveGrid() {
  const VPX = 50;   // vanishing point X (%)
  const VPY = 48;   // vanishing point Y (%)

  // Vertical lines spreading from vanishing point to bottom edge
  const vLines = Array.from({ length: 19 }, (_, i) => {
    const t = i / 18;
    const bottomX = t * 100;
    return { x1: VPX, y1: VPY, x2: bottomX, y2: 100 };
  });

  // Horizontal lines between vanishing point and bottom (perspective spacing)
  const hLines = Array.from({ length: 10 }, (_, i) => {
    const t = (i + 1) / 10;
    // Exponential spacing — lines get denser near the VP
    const progress = t * t;
    const y = VPY + progress * (100 - VPY);
    // X spans shrink as they approach VP
    const xSpread = progress;
    const x1 = VPX - xSpread * VPX;
    const x2 = VPX + xSpread * (100 - VPX);
    return { x1, y1: y, x2, y2: y };
  });

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#000' }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          {/* Fade out toward edges and near VP */}
          <radialGradient id="grid-fade" cx="50%" cy="48%" r="55%">
            <stop offset="0%"   stopColor="black" stopOpacity="1" />
            <stop offset="45%"  stopColor="black" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="0.6" />
          </radialGradient>
          <linearGradient id="top-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="black" stopOpacity="1" />
            <stop offset="35%" stopColor="black" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Vertical lines */}
        {vLines.map((l, i) => (
          <line
            key={`v${i}`}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.3"
          />
        ))}

        {/* Horizontal lines */}
        {hLines.map((l, i) => (
          <line
            key={`h${i}`}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.3"
          />
        ))}

        {/* VP glow */}
        <ellipse cx={VPX} cy={VPY} rx="12" ry="5"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
          filter="url(#glow)"
        />

        {/* Masks */}
        <rect x="0" y="0" width="100" height="100" fill="url(#grid-fade)" />
        <rect x="0" y="0" width="100" height="100" fill="url(#top-fade)" />
      </svg>

      {/* Horizon glow */}
      <div style={{
        position: 'absolute',
        left: '20%',
        right: '20%',
        top: '44%',
        height: '80px',
        background: 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
