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
uniform float mouseRadius;
uniform bool enableMouse;
uniform int colorNum;
uniform float waveAmplitude;
uniform float waveFrequency;
uniform float waveSpeed;
uniform vec3 waveColor;
uniform vec3 bgColor;

float bayer2(vec2 a){a=floor(a);return fract(dot(a,vec2(0.5,a.y*.75)));}
float bayer4(vec2 a){return mix(bayer2(a*.5)*.25,bayer2(a),.75)*.66667;}
float bayer8(vec2 a){return mix(bayer4(a*.5)*.25,bayer4(a),.75)*.66667;}
float bayer16(vec2 a){return mix(bayer8(a*.5)*.25,bayer8(a),.75)*.66667;}
float bayer32(vec2 a){return mix(bayer16(a*.5)*.25,bayer16(a),.75)*.66667;}

void main(){
  vec2 uv=gl_FragCoord.xy/resolution;
  vec2 px=gl_FragCoord.xy;

  float w=0.0;
  for(int i=1;i<=4;i++){
    float f=float(i);
    w+=sin(uv.x*waveFrequency*f*6.283+time*waveSpeed+f*1.047)*waveAmplitude/f;
    w+=sin(uv.y*waveFrequency*f*4.712-time*waveSpeed*.8+f*.524)*waveAmplitude*.4/f;
  }
  w=w*.5+.5;

  if(enableMouse){
    vec2 m=vec2(mouse.x/resolution.x,1.-mouse.y/resolution.y);
    float d=distance(uv,m);
    w=mix(w,1.,(.6)*(1.-smoothstep(0.,mouseRadius,d)));
  }

  float d=bayer32(px);
  float steps=float(colorNum)-1.;
  float q=floor(w*steps+d)/steps;
  gl_FragColor=vec4(mix(bgColor,waveColor,clamp(q,0.,1.)),1.);
}
`;

function mkShader(gl: WebGLRenderingContext, type: number, src: string) {
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
  colorNum = 2,
  waveAmplitude = 0.45,
  waveFrequency = 2,
  waveSpeed = 0.35,
}: DitherProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<[number, number]>([9999, 9999]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    // Safari needs experimental-webgl fallback
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
      const w = canvas!.offsetWidth  || canvas!.parentElement?.offsetWidth  || window.innerWidth;
      const h = canvas!.offsetHeight || canvas!.parentElement?.offsetHeight || window.innerHeight;
      canvas!.width  = w * dpr;
      canvas!.height = h * dpr;
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
      gl!.uniform1f(u.waveAmp, waveAmplitude);
      gl!.uniform1f(u.waveFreq, waveFrequency);
      gl!.uniform1f(u.waveSpeed, waveSpeed);
      gl!.uniform3fv(u.waveColor, waveColor);
      gl!.uniform3fv(u.bgColor, backgroundColor);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(draw);
    }

    // Wait for layout before reading dimensions
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
  }, [disableAnimation, enableMouseInteraction, mouseRadius, colorNum, waveAmplitude, waveFrequency, waveSpeed, waveColor, backgroundColor]);

  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  );
}
