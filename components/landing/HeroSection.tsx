'use client';

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const twRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = twRef.current;
    if (!el) return;
    const text = el.textContent?.trim() ?? '';
    el.textContent = '';
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    function type() {
      if (!el) return;
      if (i < text.length) {
        el.textContent += text[i++];
        timer = setTimeout(type, 55);
      } else {
        el.classList.add('done');
      }
    }
    timer = setTimeout(type, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero" style={{ overflowX: 'hidden' }}>
      <div className="container hero-layout">
        <div className="hero-text">
          <h1>
            Flux Network.<br />
            <span ref={twRef} className="typewriter">Tools. Produkte. Indikatoren.</span>
          </h1>
          <p className="hero-sub">
            Software, die bleibt. Produkte, Frameworks und Indikatoren — gebaut von Entwicklern, für Entwickler.
          </p>
          <div className="hero-ctas">
            <a href="#produkte" className="btn-primary">
              Produkte ansehen →
            </a>
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
