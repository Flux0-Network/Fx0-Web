export default function PerspectiveGrid() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#000' }}>
      {/* Diagonal hatch fill */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `repeating-linear-gradient(
          -45deg,
          rgba(255,255,255,0.05) 0px,
          rgba(255,255,255,0.05) 1px,
          transparent 1px,
          transparent 12px
        )`,
      }} />
      {/* Fade out center so text stays readable */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 70% 60% at 50% 45%, #000 30%, transparent 80%)',
      }} />
      {/* Top fade */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, #000 0%, transparent 20%, transparent 75%, #000 100%)',
      }} />
    </div>
  );
}
