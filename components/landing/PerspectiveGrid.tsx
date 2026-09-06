export default function PerspectiveGrid() {
  const VPX = 50;
  const VPY = 42;

  // Radial lines: from vanishing point to bottom edge, spread beyond screen width
  const vLines = Array.from({ length: 25 }, (_, i) => {
    const t = i / 24;
    const bottomX = -20 + t * 140; // -20% to 140% → fills beyond edges
    return { x1: VPX, y1: VPY, x2: bottomX, y2: 100 };
  });

  // Horizontal lines: always full width (0→100), spaced with perspective
  const hLines = Array.from({ length: 12 }, (_, i) => {
    const t = (i + 1) / 12;
    const progress = t * t; // exponential — denser near VP
    const y = VPY + progress * (100 - VPY);
    return { y };
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
          <linearGradient id="top-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="black" stopOpacity="1" />
            <stop offset="38%" stopColor="black" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bot-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="70%" stopColor="black" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Radial lines */}
        {vLines.map((l, i) => (
          <line
            key={`v${i}`}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.3"
          />
        ))}

        {/* Horizontal lines — full width */}
        {hLines.map((l, i) => (
          <line
            key={`h${i}`}
            x1={0} y1={l.y} x2={100} y2={l.y}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.3"
          />
        ))}

        {/* Gradient masks */}
        <rect x="0" y="0" width="100" height="100" fill="url(#top-fade)" />
        <rect x="0" y="0" width="100" height="100" fill="url(#bot-fade)" />
      </svg>

      {/* Horizon glow */}
      <div style={{
        position: 'absolute',
        left: 0, right: 0,
        top: '38%',
        height: '60px',
        background: 'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
