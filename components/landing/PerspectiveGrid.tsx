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

    const SPACING = 34;
    const BASE_R = 1.15;
    // green accent matching brand
    const DOT_RGB = '52, 232, 154';

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

    function draw(t: number) {
      const dpr = Math.min(devicePixelRatio, 2);
      const w   = canvas.width;
      const h   = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const sp   = SPACING * dpr;
      const cols = Math.ceil(w / sp) + 1;
      const rows = Math.ceil(h / sp) + 1;
      const maxD = 160 * dpr;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * sp;
          const y = r * sp;

          const dx   = x - mouse.x;
          const dy   = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const prox = Math.max(0, 1 - dist / maxD);

          // slow diagonal wave for subtle life
          const wave = Math.sin(t * 0.00055 + c * 0.38 + r * 0.28) * 0.5 + 0.5;

          const alpha  = 0.07 + wave * 0.05 + prox * 0.60;
          const radius = (BASE_R + prox * 2.2) * dpr;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${DOT_RGB},${alpha.toFixed(3)})`;
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
      {/* radial fade — keeps hero text readable */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 68% 58% at 50% 44%, #000 18%, transparent 72%)',
      }} />
      {/* top + bottom edge fade */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, #000 0%, transparent 14%, transparent 78%, #000 100%)',
      }} />
    </div>
  );
}
