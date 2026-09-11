'use client';

import { useEffect, useRef } from 'react';

/* ── Simplex noise GLSL ─────────────────────────────────────────────────── */
const SNOISE = `
vec4 permute(vec4 x){return mod(((x*34.)+1.)*x,289.);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;
  vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+2.*C.xxx;vec3 x3=x0-1.+3.*C.xxx;
  i=mod(i,289.);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=1./7.;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const VERT = `
uniform float uTime, uStream, uAppear;
uniform vec3 uCursor; uniform float uActivity;
varying float vBright, vAlpha;
${SNOISE}
void main(){
  vec3 wp = vec3(position.x * 13.0, 0.0, position.z * 25.0);
  wp.x += position.y * 6.0;
  float zc = wp.z + uStream;
  float wn  = snoise(vec3(wp.x * 0.08, zc * 0.08, uTime * 0.15)) * 2.0;
        wn += snoise(vec3(wp.x * 0.16, zc * 0.16, uTime * 0.30)) * 0.8;
  wp.y = wn * 3.0;
  vec3 pos = wp * 0.275;
  vec4 worldPos = modelMatrix * vec4(pos, 1.0);
  vec3 toP = worldPos.xyz - uCursor;
  float cd  = length(toP);
  float rf  = smoothstep(7.0, 0.0, cd);
  worldPos.xyz += normalize(toP + vec3(1e-4)) * rf * 0.9 * uActivity;
  vec4 mv = viewMatrix * worldPos;
  float crest = smoothstep(-1.0, 2.5, wp.y);
  vBright = 0.35 + crest * 0.65;
  vAlpha  = (0.22 + crest * 0.50) * uAppear;
  gl_PointSize = 9.0 * (10.0 / -mv.z);
  gl_PointSize = clamp(gl_PointSize, 1.2, 28.0);
  gl_Position  = projectionMatrix * mv;
}`;

const FRAG = `
varying float vBright, vAlpha;
void main(){
  vec2 xy = gl_PointCoord - 0.5;
  float r = length(xy);
  if(r > 0.5) discard;
  float soft = smoothstep(0.5, 0.04, r);
  vec3 col = vec3(0.204, 0.910, 0.604) * vBright;
  gl_FragColor = vec4(col, soft * vAlpha);
}`;

const FINAL_FRAG = `
uniform sampler2D tDiffuse; uniform float iTime;
uniform vec3 uBg; uniform float uFlameAmt;
varying vec2 vUv;
vec3 warp3d(vec3 p,float t){float c=.8,a=1.9,b=.7;p*=2.;
  p.x+=c*sin(t+a*p.y)+t*b;p.y+=c*cos(t+a*p.x);
  p.y+=c*sin(t+a*p.z)+t*b;p.z+=c*cos(t+a*p.y);
  p.z+=c*sin(t+a*p.x)+t*b;p.x+=c*cos(t+a*p.z);
  return .5+.5*cos(p+vec3(1,2,4));}
void main(){
  vec2 uv = 2.*vUv - 1.;
  vec3 w = pow(warp3d(vec3(uv.x, sin(uv.y), uv.y), iTime * 1.5), vec3(1.5));
  vec3 flame = 1.5 * vec3(.04,.94,.48) * w.x; flame *= w.y;
  flame += vec3(.68,.94,.75) * w.z;
  flame *= smoothstep(.25, 1., abs(uv.y));
  float md = smoothstep(-.7, 1., -uv.y * uv.x); flame *= md * md;
  vec3 bg  = uBg * (.95 - 0.35 * length(uv));
  vec3 scene = texture2D(tDiffuse, vUv).rgb;
  gl_FragColor = vec4(bg + flame * uFlameAmt + scene, 1.);
}`;

export default function FlowWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId = 0;
    let destroyed = false;
    let cleanupFn: (() => void) | null = null;

    (async () => {
      const THREE = await import('three');
      const { EffectComposer } = await import('three/examples/jsm/postprocessing/EffectComposer.js');
      const { RenderPass }      = await import('three/examples/jsm/postprocessing/RenderPass.js');
      const { UnrealBloomPass } = await import('three/examples/jsm/postprocessing/UnrealBloomPass.js');
      const { ShaderPass }      = await import('three/examples/jsm/postprocessing/ShaderPass.js');

      if (destroyed) return;

      // ── renderer ──
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#02160c');

      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 300);
      camera.position.set(0, 7, 16);

      // ── particle wave ──
      const geo = new THREE.SphereGeometry(4.2, 180, 500);
      const uniforms = {
        uTime:     { value: 0 },
        uStream:   { value: 0 },
        uAppear:   { value: 0 },
        uCursor:   { value: new THREE.Vector3() },
        uActivity: { value: 0 },
      };
      const mat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms,
        vertexShader: VERT,
        fragmentShader: FRAG,
      });
      const points = new THREE.Points(geo, mat);
      points.frustumCulled = false;
      scene.add(points);

      // ── ambient motes ──
      const N = 280;
      const motePos = new Float32Array(N * 3);
      const moteSz  = new Float32Array(N);
      for (let i = 0; i < N; i++) {
        motePos[i*3]   = Math.random() * 2 - 1;
        motePos[i*3+1] = Math.random() * 2 - 1;
        motePos[i*3+2] = Math.random() * 2 - 1;
        moteSz[i] = 18 * (0.5 + Math.random());
      }
      const moteGeo = new THREE.BufferGeometry();
      moteGeo.setAttribute('position', new THREE.BufferAttribute(motePos, 3));
      moteGeo.setAttribute('size',     new THREE.BufferAttribute(moteSz,  1));
      const moteMat = new THREE.ShaderMaterial({
        transparent: true, blending: THREE.AdditiveBlending,
        depthWrite: false, depthTest: false,
        uniforms: {
          uTime:  { value: 0 },
          uColor: { value: new THREE.Vector3(0.67, 0.94, 0.75) },
          uRes:   { value: new THREE.Vector2(300, 300) },
        },
        vertexShader: `
attribute float size; uniform float uTime; uniform vec2 uRes; varying float vA;
vec3 warp(vec3 p,float t){float c=.9,a=1.9,b=.02,s=.05;p*=2.;
  p.x+=c*sin(s*t+a*p.y)+t*b;p.y+=c*cos(s*t+a*p.x);p.y+=c*sin(s*t+a*p.z)+t*b;
  p.z+=c*cos(s*t+a*p.y);p.z+=c*sin(s*t+a*p.x)+t*b;p.x+=c*cos(s*t+a*p.z);
  return cos(p+vec3(1,2,4));}
void main(){
  vec3 v=position*4.+warp(position,uTime)*1.2;
  vec4 mv=modelViewMatrix*vec4(v,1.);
  float r=length(v); vA=smoothstep(6.5,5.,r)*smoothstep(0.,.5,-mv.z);
  gl_PointSize=size*uRes.y/900./-mv.z; gl_PointSize=max(gl_PointSize,1.);
  gl_Position=projectionMatrix*mv;}`,
        fragmentShader: `
uniform vec3 uColor; varying float vA;
void main(){vec2 p=gl_PointCoord-.5;float l=length(p);if(l>.5)discard;
  float t=smoothstep(.5,0.,l);gl_FragColor=vec4(uColor*t,t*vA*.55);}`,
      });
      const motePoints = new THREE.Points(moteGeo, moteMat);
      motePoints.frustumCulled = false;
      scene.add(motePoints);
      motePoints.onBeforeRender = () => {
        motePoints.position.copy(camera.position);
        moteMat.uniforms.uTime.value = performance.now() / 125;
      };

      // ── composers ──
      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(new UnrealBloomPass(new THREE.Vector2(300, 300), 1.4, 0.55, 0.0));
      const finalPass = new ShaderPass({
        uniforms: {
          tDiffuse:  { value: null },
          iTime:     { value: 0 },
          uBg:       { value: new THREE.Color('#02160c') },
          uFlameAmt: { value: 0.18 },
        },
        vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position,1.); }`,
        fragmentShader: FINAL_FRAG,
      });
      composer.addPass(finalPass);

      // ── scroll progress relative to section ──
      function getScrollProg() {
        const section = canvas!.closest('section');
        if (!section) return 0;
        const rect  = section.getBoundingClientRect();
        const total = window.innerHeight + rect.height;
        return Math.max(0, Math.min(1, (window.innerHeight - rect.top) / total));
      }

      // ── mouse / cursor repel ──
      const mouseTgt    = { x: 0, y: 0 };
      const mouseSmooth = { x: 0, y: 0 };
      let mouseActive = false, lastMove = 0, actSmooth = 0;
      const pointerWorld = new THREE.Vector3();
      const _ndc = new THREE.Vector3(), _dir = new THREE.Vector3(), _tgt = new THREE.Vector3();

      const onMouseMove = (e: MouseEvent) => {
        mouseTgt.x = (e.clientX / innerWidth)  *  2 - 1;
        mouseTgt.y = -((e.clientY / innerHeight) * 2 - 1);
        mouseActive = true; lastMove = performance.now();
      };
      const onMouseOut = () => { mouseActive = false; };
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      window.addEventListener('mouseout',  onMouseOut,  { passive: true });

      function updateCursor() {
        _tgt.set(0, 0, 0);
        if (mouseActive) {
          _ndc.set(mouseSmooth.x, mouseSmooth.y, 0.5).unproject(camera);
          _dir.subVectors(_ndc, camera.position).normalize();
          const dn = _dir.z;
          if (Math.abs(dn) > 1e-4) {
            const tt = -camera.position.z / dn;
            if (tt > 0 && isFinite(tt)) _tgt.copy(camera.position).addScaledVector(_dir, tt);
          }
        }
        pointerWorld.lerp(_tgt, 0.1);
        const idle = (performance.now() - lastMove) / 1000;
        actSmooth += ((mouseActive && idle < 3 ? 1 : 0) - actSmooth) * 0.06;
      }

      // ── resize (ResizeObserver on parent) ──
      function resize() {
        const parent = canvas!.parentElement;
        if (!parent) return;
        const w   = parent.offsetWidth;
        const h   = parent.offsetHeight;
        const dpr = Math.min(devicePixelRatio, 2);
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        composer.setPixelRatio(dpr);
        composer.setSize(w, h);
        moteMat.uniforms.uRes.value.set(w * dpr, h * dpr);
      }
      const ro = new ResizeObserver(resize);
      ro.observe(canvas.parentElement!);
      resize();

      // ── render loop ──
      const tStart = performance.now() / 1000;
      let scrollSmooth = 0, scrollCur = 0, stream = 0, t0 = 0;

      function animate(ms: number) {
        if (destroyed) return;
        animId = requestAnimationFrame(animate);

        const t  = ms / 1000;
        const dt = Math.min(0.05, t - t0); t0 = t;

        const scrollT = getScrollProg();
        scrollSmooth += (scrollT - scrollSmooth) * 0.10;
        scrollCur    += (scrollSmooth - scrollCur) * 0.06;

        mouseSmooth.x += (mouseTgt.x - mouseSmooth.x) * 0.06;
        mouseSmooth.y += (mouseTgt.y - mouseSmooth.y) * 0.06;

        stream += dt * 8.0;

        // camera dive: overhead → wave-skimming
        const e    = scrollCur;
        const ease = e * e * (3 - 2 * e);
        const camY = 7   + (0.8  -  7) * ease;
        const camZ = 16  + (-2   - 16) * ease;
        const lkZ  = 2   + (-16  -  2) * ease;
        const mx = mouseSmooth.x * 1.2;
        const my = mouseSmooth.y * 0.36;
        camera.position.set(mx, camY + my, camZ);
        camera.lookAt(mx * 0.5, ease * 0.6, lkZ);

        updateCursor();

        uniforms.uTime.value     = t;
        uniforms.uStream.value   = stream;
        uniforms.uAppear.value   = Math.min(1, Math.max(0, (t - tStart - 0.15) / 1.0));
        uniforms.uCursor.value.copy(pointerWorld);
        uniforms.uActivity.value = actSmooth;
        finalPass.uniforms.iTime.value = t;

        composer.render();
      }
      animId = requestAnimationFrame(animate);

      cleanupFn = () => {
        ro.disconnect();
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseout',  onMouseOut);
        geo.dispose();
        mat.dispose();
        moteGeo.dispose();
        moteMat.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      destroyed = true;
      cancelAnimationFrame(animId);
      cleanupFn?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  );
}
