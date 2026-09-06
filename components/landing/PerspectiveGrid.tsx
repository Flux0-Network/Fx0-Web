export default function PerspectiveGrid() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#000' }}>
      {/* Perspective grid floor */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '-100%',
        right: '-100%',
        height: '75%',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.13) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.13) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        transform: 'perspective(600px) rotateX(72deg)',
        transformOrigin: '50% 100%',
      }} />

      {/* Horizon glow */}
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: '38%',
        height: '120px',
        background: 'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(255,255,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Top fade — keeps text readable */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, #000 0%, #000 25%, transparent 55%)',
        pointerEvents: 'none',
      }} />

      {/* Bottom fade */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '30%',
        background: 'linear-gradient(to top, #000 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
