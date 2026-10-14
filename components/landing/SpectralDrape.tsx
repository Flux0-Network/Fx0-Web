'use client';
import { useEffect, useRef } from 'react';

type RGB = [number, number, number];

function parseHex(hex: string): RGB {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

function lerpRGB(a: RGB, b: RGB, t: number): string {
  const s = Math.max(0, Math.min(1, t));
  return `rgb(${(a[0] + (b[0] - a[0]) * s) | 0},${(a[1] + (b[1] - a[1]) * s) | 0},${(a[2] + (b[2] - a[2]) * s) | 0})`;
}

const D2R = Math.PI / 180;

interface SpectralDrapeProps {
  colors?: [string, string];
  backgroundColor?: string;
  density?: number;
  dotSize?: number;
  strands?: number;
  amplitude?: number;
  frequency?: number;
  speed?: number;
  tilt?: number;
  turn?: number;
  roll?: number;
  zoom?: number;
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function SpectralDrape({
  colors = ['#3311bb', '#a89fff'],
  backgroundColor = '#0a0a0a',
  density = 1,
  dotSize = 1,
  strands = 8,
  amplitude = 1,
  frequency = 1,
  speed = 1,
  tilt = -40,
  turn = -45,
  roll = 110,
  zoom = 1,
  interactive = true,
}: SpectralDrapeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    // Rotation matrix R = Ry(turn) * Rx(tilt) * Rz(roll)
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

      // spacing in CSS pixels
      const spacing = (28 / density) / zoom;
      const dotR = spacing * 0.19 * dotSize;
      const fov = Math.max(W, H) * 1.1;

      const halfCols = Math.ceil((W * 0.9) / spacing) + 3;
      const halfRows = Math.ceil((H * 1.1) / spacing) + 3;

      // parallax
      const px = mouse.x * 0.05 * W;
      const py = mouse.y * 0.04 * H;

      const t = elapsed * speed;

      for (let ri = -halfRows; ri <= halfRows; ri++) {
        for (let ci = -halfCols; ci <= halfCols; ci++) {
          const gx = ci * spacing;
          const gy = ri * spacing;

          // Wave displacement (Z axis)
          let gz = 0;
          for (let s = 0; s < strands; s++) {
            const ph = (s / strands) * Math.PI * 2;
            gz +=
              Math.sin(gx * frequency * 0.007 + t * 0.7 + ph) *
              (0.55 + 0.45 * Math.cos(gy * frequency * 0.005 + t * 0.45 + ph * 0.8));
          }
          gz = (gz / strands) * amplitude * spacing * 2.2;

          // 3D rotation
          const rx = m00 * gx + m01 * gy + m02 * gz;
          const ry = m10 * gx + m11 * gy + m12 * gz;
          const rz = m20 * gx + m21 * gy + m22 * gz;

          // Perspective
          const pz = rz + fov;
          if (pz <= 1) continue;
          const persp = fov / pz;

          const sx = (rx * persp + W * 0.5 + px) * dpr;
          const sy = (ry * persp + H * 0.52 + py) * dpr;

          const margin = dotR * dpr * 4;
          if (sx < -margin || sx > W * dpr + margin || sy < -margin || sy > H * dpr + margin) continue;

          const normWave = (gz / (amplitude * spacing * 2.2) + 1) * 0.5;
          const r = Math.max(0.4, dotR * persp * dpr);

          ctx.beginPath();
          ctx.arc(sx, sy, r, 0, Math.PI * 2);
          ctx.fillStyle = lerpRGB(colA, colB, normWave);
          ctx.fill();
        }
      }

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
