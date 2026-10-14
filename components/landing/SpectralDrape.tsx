'use client';
import { useEffect, useRef } from 'react';

type RGB = [number, number, number];

function parseHex(hex: string): RGB {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

const D2R = Math.PI / 180;

interface SpectralDrapeProps {
  colors?: [string, string];
  backgroundColor?: string;
  density?: number;
  dotSize?: number;
  amplitude?: number;
  frequency?: number;
  speed?: number;
  tilt?: number;
  turn?: number;
  roll?: number;
  zoom?: number;
  interactive?: boolean;
}

export default function SpectralDrape({
  colors = ['#0b0828', '#ede8ff'],
  backgroundColor = '#020008',
  density = 1.5,
  dotSize = 1,
  amplitude = 4.2,
  frequency = 1,
  speed = 0.4,
  tilt = 20,
  turn = 40,
  roll = 0,
  zoom = 1,
  interactive = true,
}: SpectralDrapeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    // Build rotation matrix R = Ry(turn) * Rx(tilt) * Rz(roll)
    const tx = tilt * D2R, ty = turn * D2R, tz = roll * D2R;
    const cx = Math.cos(tx), sx2 = Math.sin(tx);
    const cy = Math.cos(ty), sy2 = Math.sin(ty);
    const cz = Math.cos(tz), sz2 = Math.sin(tz);
    const m00 = cy * cz + sy2 * sx2 * sz2;
    const m01 = -cy * sz2 + sy2 * sx2 * cz;
    const m02 = sy2 * cx;
    const m10 = cx * sz2;
    const m11 = cx * cz;
    const m12 = -sx2;
    const m20 = -sy2 * cz + cy * sx2 * sz2;
    const m21 = sy2 * sz2 + cy * sx2 * cz;
    const m22 = cy * cx;

    const colA = parseHex(colors[0]);
    const colB = parseHex(colors[1]);

    let dpr = 1;
    function resize() {
      dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    }
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const mouse = { x: 0, y: 0 };
    function onMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width - 0.5;
      mouse.y = (e.clientY - rect.top) / rect.height - 0.5;
    }
    if (interactive) window.addEventListener('mousemove', onMouseMove);

    let rafId = 0;
    let elapsed = 0;
    let last = 0;

    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += dt;

      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, W * dpr, H * dpr);

      // Base grid spacing in CSS px
      const spacing = (19 / density) / zoom;
      // FOV controls perspective strength
      const fov = Math.max(W, H) * 1.2;

      const halfCols = Math.ceil((W * 1.2) / spacing) + 4;
      const halfRows = Math.ceil((H * 1.2) / spacing) + 4;

      const px = mouse.x * 0.05 * W;
      const py = mouse.y * 0.04 * H;
      const t = elapsed * speed;

      for (let ri = -halfRows; ri <= halfRows; ri++) {
        for (let ci = -halfCols; ci <= halfCols; ci++) {
          const gx = ci * spacing;
          const gy = ri * spacing;

          // Wave runs diagonally — ~3-4 full folds visible per screen width
          // Coefficient 0.011 ≈ one fold every ~570 CSS px
          const phase = (gx * 0.72 + gy * 0.28) * frequency * 0.011 + t;
          const gz = Math.sin(phase) * amplitude * spacing * 2.8;

          // 3-D rotation
          const rx = m00 * gx + m01 * gy + m02 * gz;
          const ry = m10 * gx + m11 * gy + m12 * gz;
          const rz = m20 * gx + m21 * gy + m22 * gz;

          // Perspective projection
          const pz = rz + fov;
          if (pz <= 1) continue;
          const persp = fov / pz;

          const sx = (rx * persp + W * 0.5 + px) * dpr;
          const sy = (ry * persp + H * 0.52 + py) * dpr;

          const margin = 24 * dpr;
          if (sx < -margin || sx > W * dpr + margin || sy < -margin || sy > H * dpr + margin) continue;

          // 0 = valley (dark), 1 = peak (bright)
          const norm = (gz / (amplitude * spacing * 2.8) + 1) * 0.5;

          // Quadratic alpha: valleys near-invisible, peaks fully opaque
          const alpha = norm * norm;

          // Dot radius grows with perspective depth AND brightness
          const r = Math.max(0.2, spacing * 0.13 * dotSize * persp * dpr * (0.4 + norm * 0.6));

          const s = Math.max(0, Math.min(1, norm));
          const rr = (colA[0] + (colB[0] - colA[0]) * s) | 0;
          const gg = (colA[1] + (colB[1] - colA[1]) * s) | 0;
          const bb = (colA[2] + (colB[2] - colA[2]) * s) | 0;

          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(sx, sy, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${rr},${gg},${bb})`;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      if (interactive) window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, display: 'block', width: '100%', height: '100%', touchAction: 'none' }}
    />
  );
}
