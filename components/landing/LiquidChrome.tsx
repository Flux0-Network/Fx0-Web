'use client';

import { useEffect, useRef } from 'react';

interface LiquidChromeProps {
  speed?: number;
  amplitude?: number;
  frequencyX?: number;
  frequencyY?: number;
  interactive?: boolean;
}

const VERT = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
uniform bool interactive;
uniform float speed;
uniform float amplitude;
uniform float frequencyX;
uniform float frequencyY;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float snoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                 dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
             mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                 dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 4; i++) {
    v += a * snoise(p);
    p = rot * p * 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  uv -= 0.5;
  uv.x *= resolution.x / resolution.y;

  float t = time * speed;
  float eps = 0.008;
  vec2 freq = vec2(frequencyX, frequencyY);
  vec2 drift = vec2(t * 0.28, t * 0.19);

  // Height field + finite-difference normals
  float h  = fbm(uv * freq + drift);
  float hx = fbm((uv + vec2(eps, 0.0)) * freq + drift);
  float hy = fbm((uv + vec2(0.0, eps)) * freq + drift);
  vec2 grad = vec2(hx - h, hy - h) / eps * amplitude;

  vec3 normal = normalize(vec3(-grad.x * 0.6, -grad.y * 0.6, 1.0));

  // Mouse ripple
  if (interactive) {
    vec2 m = vec2(mouse.x / resolution.x - 0.5, -(mouse.y / resolution.y - 0.5));
    m.x *= resolution.x / resolution.y;
    float dist = length(uv - m);
    float ripple = exp(-dist * 5.0) * sin(dist * 18.0 - t * 4.0) * 0.35;
    normal = normalize(normal + vec3(ripple * 0.5, ripple * 0.5, 0.0));
  }

  // Reflection vector (orthographic view along +Z)
  vec3 view = vec3(0.0, 0.0, 1.0);
  vec3 refl = reflect(-view, normal);

  // Metallic brightness from Fresnel-like term
  float NdotV  = clamp(dot(normal, view), 0.0, 1.0);
  float rim    = 1.0 - NdotV;
  float chrome = pow(NdotV, 1.5) * 0.7 + pow(rim, 2.0) * 0.9;

  // Hue from reflection direction — creates the rainbow dispersion
  float hueAngle = atan(refl.y, refl.x);
  float hue = hueAngle / 6.28318 + 0.5 + h * 0.25 + t * 0.04;

  vec3 rainbow;
  rainbow.r = 0.5 + 0.5 * cos(6.28318 * (hue + 0.00));
  rainbow.g = 0.5 + 0.5 * cos(6.28318 * (hue + 0.33));
  rainbow.b = 0.5 + 0.5 * cos(6.28318 * (hue + 0.67));

  // Silver base mixed with iridescent tint
  vec3 silver = vec3(chrome);
  vec3 col = mix(silver, rainbow, rim * 0.55 + 0.15);

  // Specular hotspot
  float spec = pow(clamp(refl.z, 0.0, 1.0), 12.0);
  col += vec3(spec * 0.6);

  // Subtle dark base so blacks read as deep chrome, not grey
  col = mix(vec3(0.0), col, 0.85 + chrome * 0.15);

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

function mkShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export default function LiquidChrome({
  speed = 0.3,
  amplitude = 0.5,
  frequencyX = 2.5,
  frequencyY = 2.5,
  interactive = true,
}: LiquidChromeProps) {
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
      interactive: gl.getUniformLocation(prog, 'interactive'),
      speed:       gl.getUniformLocation(prog, 'speed'),
      amplitude:   gl.getUniformLocation(prog, 'amplitude'),
      frequencyX:  gl.getUniformLocation(prog, 'frequencyX'),
      frequencyY:  gl.getUniformLocation(prog, 'frequencyY'),
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
      const t = (ts - start) / 1000;
      gl!.uniform1f(u.time, t);
      gl!.uniform2f(u.resolution, canvas!.width, canvas!.height);
      gl!.uniform2f(u.mouse, mouse.current[0], mouse.current[1]);
      gl!.uniform1i(u.interactive, interactive ? 1 : 0);
      gl!.uniform1f(u.speed, speed);
      gl!.uniform1f(u.amplitude, amplitude);
      gl!.uniform1f(u.frequencyX, frequencyX);
      gl!.uniform1f(u.frequencyY, frequencyY);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(ts => { start = ts; resize(); draw(ts); });

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement ?? canvas);
    window.addEventListener('resize', resize);

    function onMouse(e: MouseEvent) {
      const r = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      mouse.current = [(e.clientX - r.left) * dpr, (e.clientY - r.top) * dpr];
    }
    if (interactive) canvas.addEventListener('mousemove', onMouse);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', resize);
      if (interactive) canvas.removeEventListener('mousemove', onMouse);
    };
  }, [speed, amplitude, frequencyX, frequencyY, interactive]);

  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  );
}
