'use client';
import { useEffect, useRef } from 'react';

export default function PerspectiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let animId = 0;
    const mouse = { x: -9999, y: -9999 };

    const SPACING = 36;

    function resize() {
      const dpr = Math.min(devicePixelRatio, 2);
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    }
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    function onMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const dpr  = Math.min(devicePixelRatio, 2);
      mouse.x = (e.clientX - rect.left) * dpr;
      mouse.y = (e.clientY - rect.top)  * dpr;
    }
    window.addEventListener('mousemove', onMouseMove);

    function draw(ts: number) {
      const dpr = Math.min(devicePixelRatio, 2);
      const w   = canvas.width;
      const h   = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const sp   = SPACING * dpr;
      const cols = Math.ceil(w / sp) + 1;
      const rows = Math.ceil(h / sp) + 1;
      const T    = ts * 0.001; // seconds

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * sp;
          const y = r * sp;

          // Three overlapping traveling waves → interference pattern
          const w1 = Math.sin(c * 0.42 - T * 2.1);            // horizontal →
          const w2 = Math.sin(c * 0.28 + r * 0.34 - T * 1.5); // diagonal ↘
          const w3 = Math.sin(r * 0.38 - T * 1.1);            // vertical ↓

          // Combine and map to [0, 1]
          const wave = (w1 * 0.45 + w2 * 0.35 + w3 * 0.20) * 0.5 + 0.5;

          // Mouse ripple — concentric rings spreading from cursor
          const dx   = x - mouse.x;
          const dy   = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxD = 200 * dpr;
          const prox = Math.max(0, 1 - dist / maxD);
          const ripple = (Math.sin(dist * 0.025 - T * 5.0) * 0.5 + 0.5) * prox;

          const combined = Math.min(1, wave + ripple * 0.55);

          // Dim troughs, bright peaks — high contrast so waves are visible
          const alpha  = 0.025 + combined * combined * 0.72;
          const radius = (0.8 + combined * 2.4) * dpr;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(52,232,154,${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#000' }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
      />
      {/* keep center text-area readable */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 65% 55% at 50% 44%, rgba(0,0,0,0.88) 15%, transparent 68%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, #000 0%, transparent 12%, transparent 80%, #000 100%)',
      }} />
    </div>
  );
}
