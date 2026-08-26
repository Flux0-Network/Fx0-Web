'use client';

import { useEffect, useRef } from 'react';

interface DitherProps {
  waveColor?: [number, number, number];
  backgroundColor?: [number, number, number];
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
  colorNum?: number;
  waveAmplitude?: number;
  waveFrequency?: number;
  waveSpeed?: number;
  className?: string;
}

const vert = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const frag = `
precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float mouseRadius;
uniform bool enableMouseInteraction;
uniform int colorNum;
uniform float waveAmplitude;
uniform float waveFrequency;
uniform float waveSpeed;
uniform vec3 waveColor;
uniform vec3 backgroundColor;

float bayer2(vec2 a) {
  a = floor(a);
  return fract(dot(a, vec2(0.5, a.y * 0.75)));
}
float bayer4(vec2 a)  { return mix(bayer2(a * 0.5)  * 0.25, bayer2(a),  0.75) * 0.66667; }
float bayer8(vec2 a)  { return mix(bayer4(a * 0.5)  * 0.25, bayer4(a),  0.75) * 0.66667; }
float bayer16(vec2 a) { return mix(bayer8(a * 0.5)  * 0.25, bayer8(a),  0.75) * 0.66667; }
float bayer32(vec2 a) { return mix(bayer16(a * 0.5) * 0.25, bayer16(a), 0.75) * 0.66667; }

void main() {
  vec2 uv  = gl_FragCoord.xy / resolution;
  vec2 px  = gl_FragCoord.xy;

  float wave = 0.0;
  for (int i = 1; i <= 4; i++) {
    float fi = float(i);
    wave += sin(uv.x * waveFrequency * fi * 6.28318 + time * waveSpeed + fi * 1.047)
          * waveAmplitude / fi;
    wave += sin(uv.y * waveFrequency * fi * 6.28318 * 0.7 - time * waveSpeed * 0.8 + fi * 0.523)
          * waveAmplitude * 0.4 / fi;
  }
  wave = wave * 0.5 + 0.5;

  if (enableMouseInteraction) {
    vec2 mUV = vec2(mouse.x / resolution.x, 1.0 - mouse.y / resolution.y);
    float dist = distance(uv, mUV);
    float influence = 1.0 - smoothstep(0.0, mouseRadius, dist);
    wave = mix(wave, 1.0, influence * 0.6);
  }

  float dither = bayer32(px);
  float steps  = float(colorNum) - 1.0;
  float q      = floor(wave * steps + dither) / steps;

  vec3 color = mix(backgroundColor, waveColor, clamp(q, 0.0, 1.0));
  gl_FragColor = vec4(color, 1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export default function Dither({
  waveColor = [1, 1, 1],
  backgroundColor = [0, 0, 0],
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 0.3,
  colorNum = 4,
  waveAmplitude = 0.3,
  waveFrequency = 3,
  waveSpeed = 0.5,
  className,
}: DitherProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, vert));
    gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const u = {
      time:                    gl.getUniformLocation(program, 'time'),
      resolution:              gl.getUniformLocation(program, 'resolution'),
      mouse:                   gl.getUniformLocation(program, 'mouse'),
      mouseRadius:             gl.getUniformLocation(program, 'mouseRadius'),
      enableMouseInteraction:  gl.getUniformLocation(program, 'enableMouseInteraction'),
      colorNum:                gl.getUniformLocation(program, 'colorNum'),
      waveAmplitude:           gl.getUniformLocation(program, 'waveAmplitude'),
      waveFrequency:           gl.getUniformLocation(program, 'waveFrequency'),
      waveSpeed:               gl.getUniformLocation(program, 'waveSpeed'),
      waveColor:               gl.getUniformLocation(program, 'waveColor'),
      backgroundColor:         gl.getUniformLocation(program, 'backgroundColor'),
    };

    let raf: number;
    let start = performance.now();

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const parent = canvas!.parentElement ?? canvas!;
      canvas!.width  = parent.offsetWidth  * dpr;
      canvas!.height = parent.offsetHeight * dpr;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }

    function render() {
      const t = disableAnimation ? 0 : (performance.now() - start) / 1000;
      gl!.uniform1f(u.time, t);
      gl!.uniform2f(u.resolution, canvas!.width, canvas!.height);
      gl!.uniform2f(u.mouse, mouse.current[0], mouse.current[1]);
      gl!.uniform1f(u.mouseRadius, mouseRadius);
      gl!.uniform1i(u.enableMouseInteraction, enableMouseInteraction ? 1 : 0);
      gl!.uniform1i(u.colorNum, colorNum);
      gl!.uniform1f(u.waveAmplitude, waveAmplitude);
      gl!.uniform1f(u.waveFrequency, waveFrequency);
      gl!.uniform1f(u.waveSpeed, waveSpeed);
      gl!.uniform3fv(u.waveColor, waveColor);
      gl!.uniform3fv(u.backgroundColor, backgroundColor);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    }

    resize();
    render();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function onMouse(e: MouseEvent) {
      const r = canvas!.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      mouse.current = [(e.clientX - r.left) * dpr, (e.clientY - r.top) * dpr];
    }
    if (enableMouseInteraction) canvas.addEventListener('mousemove', onMouse);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (enableMouseInteraction) canvas.removeEventListener('mousemove', onMouse);
    };
  }, [disableAnimation, enableMouseInteraction, mouseRadius, colorNum, waveAmplitude, waveFrequency, waveSpeed, waveColor, backgroundColor]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  );
}
