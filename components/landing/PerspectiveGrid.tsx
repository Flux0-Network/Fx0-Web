export default function PerspectiveGrid() {
  const VPX = 50;
  const VPY = 45;

  // Radial lines from VP to all 4 edges (many lines to fill the screen)
  const radialLines: { x2: number; y2: number }[] = [];

  // To bottom edge (y=100)
  for (let i = 0; i <= 30; i++) {
    radialLines.push({ x2: (i / 30) * 100, y2: 100 });
  }
  // To top edge (y=0)
  for (let i = 0; i <= 30; i++) {
    radialLines.push({ x2: (i / 30) * 100, y2: 0 });
  }
  // To left edge (x=0)
  for (let i = 1; i < 20; i++) {
    radialLines.push({ x2: 0, y2: (i / 20) * 100 });
  }
  // To right edge (x=100)
  for (let i = 1; i < 20; i++) {
    radialLines.push({ x2: 100, y2: (i / 20) * 100 });
  }

  // Horizontal lines — full width, both above and below VP
  const hLines: number[] = [];
  // Below VP
  for (let i = 1; i <= 14; i++) {
    const t = i / 14;
    hLines.push(VPY + (t * t) * (100 - VPY));
  }
  // Above VP
  for (let i = 1; i <= 10; i++) {
    const t = i / 10;
    hLines.push(VPY - (t * t) * VPY);
  }

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
          {/* Radial fade from VP outward — lines fade at edges */}
          <radialGradient id="edge-fade" cx={`${VPX}%`} cy={`${VPY}%`} r="70%">
            <stop offset="0%"   stopColor="black" stopOpacity="0" />
            <stop offset="70%"  stopColor="black" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="0.85" />
          </radialGradient>
          {/* Dark center around VP so lines don't show too close */}
          <radialGradient id="vp-mask" cx={`${VPX}%`} cy={`${VPY}%`} r="20%">
            <stop offset="0%"  stopColor="black" stopOpacity="1" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Radial lines */}
        {radialLines.map((l, i) => (
          <line
            key={`r${i}`}
            x1={VPX} y1={VPY}
            x2={l.x2} y2={l.y2}
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="0.25"
          />
        ))}

        {/* Horizontal lines full width */}
        {hLines.map((y, i) => (
          <line
            key={`h${i}`}
            x1={0} y1={y} x2={100} y2={y}
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="0.25"
          />
        ))}

        {/* Masks */}
        <rect x="0" y="0" width="100" height="100" fill="url(#edge-fade)" />
        <rect x="0" y="0" width="100" height="100" fill="url(#vp-mask)" />
      </svg>

      {/* Subtle glow at vanishing point */}
      <div style={{
        position: 'absolute',
        left: '30%', right: '30%',
        top: `${VPY - 6}%`,
        height: '80px',
        background: 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
