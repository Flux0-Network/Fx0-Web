'use client';

import { useEffect, useRef } from 'react';

interface DitherProps {
  waveColor?: [number, number, number];
  backgroundColor?: [number, number, number];
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  colorNum?: number;
  pixelSize?: number;
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
}

const VERT = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

// Classic Perlin noise + fBm dither shader
const FRAG = `
precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float mouseRadius;
uniform bool enableMouse;
uniform int colorNum;
uniform float pixelSize;
uniform float waveAmplitude;
uniform float waveFrequency;
uniform float waveSpeed;
uniform vec3 waveColor;
uniform vec3 bgColor;

// Bayer 8x8 ordered dithering
float bayer8(vec2 p) {
  p = floor(p);
  vec2 t = mod(p, 8.0);
  int x = int(t.x); int y = int(t.y);
  float m[64];
  m[0]=0.0;m[1]=32.0;m[2]=8.0;m[3]=40.0;m[4]=2.0;m[5]=34.0;m[6]=10.0;m[7]=42.0;
  m[8]=48.0;m[9]=16.0;m[10]=56.0;m[11]=24.0;m[12]=50.0;m[13]=18.0;m[14]=58.0;m[15]=26.0;
  m[16]=12.0;m[17]=44.0;m[18]=4.0;m[19]=36.0;m[20]=14.0;m[21]=46.0;m[22]=6.0;m[23]=38.0;
  m[24]=60.0;m[25]=28.0;m[26]=52.0;m[27]=20.0;m[28]=62.0;m[29]=30.0;m[30]=54.0;m[31]=22.0;
  m[32]=3.0;m[33]=35.0;m[34]=11.0;m[35]=43.0;m[36]=1.0;m[37]=33.0;m[38]=9.0;m[39]=41.0;
  m[40]=51.0;m[41]=19.0;m[42]=59.0;m[43]=27.0;m[44]=49.0;m[45]=17.0;m[46]=57.0;m[47]=25.0;
  m[48]=15.0;m[49]=47.0;m[50]=7.0;m[51]=39.0;m[52]=13.0;m[53]=45.0;m[54]=5.0;m[55]=37.0;
  m[56]=63.0;m[57]=31.0;m[58]=55.0;m[59]=23.0;m[60]=61.0;m[61]=29.0;m[62]=53.0;m[63]=21.0;
  return m[y * 8 + x] / 64.0;
}

// Smooth noise
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}
float snoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(dot(hash2(i + vec2(0,0)), f - vec2(0,0)),
                 dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
             mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),
                 dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x), u.y);
}

// Fractal Brownian Motion
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2  shift = vec2(100.0);
  mat2  rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 5; i++) {
    v += a * snoise(p);
    p  = rot * p * waveFrequency + shift;
    a *= waveAmplitude;
  }
  return v;
}

void main() {
  // Pixelate
  float ps = max(pixelSize, 1.0);
  vec2 px = floor(gl_FragCoord.xy / ps) * ps;
  vec2 uv = px / resolution;
  uv -= 0.5;
  uv.x *= resolution.x / resolution.y;

  float t = time * waveSpeed;
  float q = fbm(uv + t);
  float f = fbm(uv + q + vec2(t * 0.7, t * 0.4));
  f = f * 0.5 + 0.5;

  if (enableMouse) {
    vec2 m = vec2(mouse.x / resolution.x - 0.5, -(mouse.y / resolution.y - 0.5));
    m.x *= resolution.x / resolution.y;
    float d = distance(uv, m);
    float effect = 1.0 - smoothstep(0.0, mouseRadius, d);
    f -= 0.4 * effect;
  }

  // Bayer dither
  float bayerUVx = gl_FragCoord.x / ps;
  float bayerUVy = gl_FragCoord.y / ps;
  float threshold = bayer8(vec2(bayerUVx, bayerUVy));
  float steps = float(colorNum) - 1.0;
  float dithered = floor(f * steps + threshold) / steps;
  dithered = clamp(dithered, 0.0, 1.0);

  vec3 col = mix(bgColor, waveColor, dithered);
  gl_FragColor = vec4(col, 1.0);
}
`;

function mkShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export default function Dither({
  waveColor = [0.5, 0.5, 0.5],
  backgroundColor = [0, 0, 0],
  waveSpeed = 0.15,
  waveFrequency = 2.0,
  waveAmplitude = 0.5,
  colorNum = 4,
  pixelSize = 2,
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 0.3,
}: DitherProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<[number, number]>([9999, 9999]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = (
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    ) as WebGLRenderingContext | null;
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, mkShader(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, mkShader(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = {
      time:        gl.getUniformLocation(prog, 'time'),
      resolution:  gl.getUniformLocation(prog, 'resolution'),
      mouse:       gl.getUniformLocation(prog, 'mouse'),
      mouseRadius: gl.getUniformLocation(prog, 'mouseRadius'),
      enableMouse: gl.getUniformLocation(prog, 'enableMouse'),
      colorNum:    gl.getUniformLocation(prog, 'colorNum'),
      pixelSize:   gl.getUniformLocation(prog, 'pixelSize'),
      waveAmp:     gl.getUniformLocation(prog, 'waveAmplitude'),
      waveFreq:    gl.getUniformLocation(prog, 'waveFrequency'),
      waveSpeed:   gl.getUniformLocation(prog, 'waveSpeed'),
      waveColor:   gl.getUniformLocation(prog, 'waveColor'),
      bgColor:     gl.getUniformLocation(prog, 'bgColor'),
    };

    let raf = 0;
    let start = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas!.parentElement?.offsetWidth  || canvas!.offsetWidth  || window.innerWidth;
      const h = canvas!.parentElement?.offsetHeight || canvas!.offsetHeight || window.innerHeight;
      canvas!.width  = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }

    function draw(ts: number) {
      const t = disableAnimation ? 0 : (ts - start) / 1000;
      gl!.uniform1f(u.time, t);
      gl!.uniform2f(u.resolution, canvas!.width, canvas!.height);
      gl!.uniform2f(u.mouse, mouse.current[0], mouse.current[1]);
      gl!.uniform1f(u.mouseRadius, mouseRadius);
      gl!.uniform1i(u.enableMouse, enableMouseInteraction ? 1 : 0);
      gl!.uniform1i(u.colorNum, colorNum);
      gl!.uniform1f(u.pixelSize, pixelSize * Math.min(window.devicePixelRatio || 1, 2));
      gl!.uniform1f(u.waveAmp, waveAmplitude);
      gl!.uniform1f(u.waveFreq, waveFrequency);
      gl!.uniform1f(u.waveSpeed, waveSpeed);
      gl!.uniform3fv(u.waveColor, waveColor);
      gl!.uniform3fv(u.bgColor, backgroundColor);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(ts => {
      start = ts;
      resize();
      draw(ts);
    });

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement ?? canvas);
    window.addEventListener('resize', resize);

    function onMouse(e: MouseEvent) {
      const r = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      mouse.current = [(e.clientX - r.left) * dpr, (e.clientY - r.top) * dpr];
    }
    if (enableMouseInteraction) canvas.addEventListener('mousemove', onMouse);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', resize);
      if (enableMouseInteraction) canvas.removeEventListener('mousemove', onMouse);
    };
  }, [disableAnimation, enableMouseInteraction, mouseRadius, colorNum, pixelSize, waveAmplitude, waveFrequency, waveSpeed, waveColor, backgroundColor]);

  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  );
}
