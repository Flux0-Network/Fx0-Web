'use client';

import { useEffect, useRef } from 'react';
import { createRenderer } from './ocean/renderer';

export default function OceanBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!navigator.gpu) return;
    let renderer: ReturnType<typeof createRenderer> | null = null;
    try {
      renderer = createRenderer({ canvas });
      void renderer.ready;
    } catch {
      renderer = null;
    }
    return () => renderer?.dispose();
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#000' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', touchAction: 'none' }} />
    </div>
  );
}
