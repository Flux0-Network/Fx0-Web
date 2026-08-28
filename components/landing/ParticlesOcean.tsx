'use client';
import React, { useRef, useEffect } from 'react';
import { Renderer, Geometry, Program, Mesh } from 'ogl';

const COLS = 75;
const ROWS = 50;

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function ParticlesOcean({ style, ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const renderer = new Renderer({ antialias: false, alpha: false });
    const gl = renderer.gl;
    gl.clearColor(0.0, 0.02, 0.07, 1);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    const COUNT = COLS * ROWS;
    const posData   = new Float32Array(COUNT * 2);
    const phaseData = new Float32Array(COUNT);

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const i = r * COLS + c;
        posData[i * 2]     = (c / (COLS - 1)) * 2.0 - 1.0;
        posData[i * 2 + 1] = (r / (ROWS - 1)) * 2.0 - 1.0;
        phaseData[i] = Math.random() * 6.2832;
      }
    }

    const geometry = new Geometry(gl, {
      aPos:   { size: 2, data: posData },
      aPhase: { size: 1, data: phaseData },
    });

    const program = new Program(gl, {
      vertex: `
        attribute vec2 aPos;
        attribute float aPhase;
        uniform float uTime;
        varying float vHeight;

        void main() {
          float h = sin(aPos.x * 4.0  + uTime * 1.1  + aPhase)        * 0.07
                  + cos(aPos.y * 3.0  + uTime * 0.85 + aPhase * 1.6)  * 0.05
                  + sin(aPos.x * 1.5  + aPos.y * 2.5 + uTime * 0.55)  * 0.04
                  + cos(aPos.x * 8.0  + uTime * 1.8  + aPhase * 0.7)  * 0.02;

          vHeight = h;
          gl_Position = vec4(aPos.x, aPos.y + h * 0.18, 0.0, 1.0);
          gl_PointSize = max(1.0, 2.8 + h * 14.0);
        }
      `,
      fragment: `
        precision highp float;
        varying float vHeight;

        void main() {
          vec2 c = gl_PointCoord * 2.0 - 1.0;
          float d = dot(c, c);
          if (d > 1.0) discard;

          float t = clamp(vHeight * 4.5 + 0.5, 0.0, 1.0);
          vec3 col = mix(vec3(0.0, 0.08, 0.38), vec3(0.05, 0.68, 1.0), t);
          gl_FragColor = vec4(col, (1.0 - d) * 0.8);
        }
      `,
      uniforms: {
        uTime: { value: 0 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program, mode: gl.POINTS });

    function resize() {
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    }
    window.addEventListener('resize', resize);
    resize();
    container.appendChild(gl.canvas);

    let raf: number;
    function tick(t: number) {
      raf = requestAnimationFrame(tick);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      gl.canvas.parentElement?.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', ...style }}
      {...props}
    />
  );
}
