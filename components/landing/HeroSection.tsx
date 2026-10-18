'use client';

import { useEffect, useRef } from 'react';

const TW_TEXT = 'Tools. Produkte. Indikatoren.';

export default function HeroSection() {
  const twRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = twRef.current;
    if (!el) return;
    el.textContent = '';
    el.classList.remove('done');
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    function type() {
      if (!el) return;
      if (i < TW_TEXT.length) { el.textContent += TW_TEXT[i++]; timer = setTimeout(type, 55); }
      else el.classList.add('done');
    }
    timer = setTimeout(type, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const stage = document.querySelector('.hero-scroll-stage') as HTMLElement | null;
    const inner = document.querySelector('.hero-zoom-inner') as HTMLElement | null;
    if (!stage || !inner) return;

    function onScroll() {
      if (!stage || !inner) return;
      const scrolled = Math.max(0, window.scrollY - stage.offsetTop);
      const vh = window.innerHeight;
      const progress = Math.min(1, scrolled / (vh * 0.5));
      const scale = 1 + progress * 0.18;
      inner.style.transform = `scale(${scale})`;
      inner.style.opacity = String(Math.max(0, 1 - progress * 1.6));
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero" style={{ overflowX: 'hidden' }}>
      <div className="container hero-layout">
        <div className="hero-text">
          <h1>
            <a href="/" className="hero-name-link">Flux Network.</a><br />
            <span ref={twRef} className="typewriter" />
          </h1>
          <p className="hero-sub">Software, die bleibt. Produkte, Frameworks und Indikatoren, gebaut von Entwicklern, für Entwickler.</p>
          <div className="hero-ctas">
            <a href="#produkte" className="btn-primary">Produkte ansehen →</a>
            <a href="https://discord.gg/D9GwqWpwHT" className="btn-ghost" target="_blank" rel="noopener">Discord joinen</a>
          </div>
        </div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
