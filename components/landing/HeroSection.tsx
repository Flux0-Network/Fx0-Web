'use client';

import { useEffect, useRef, useState } from 'react';
import FlowWaveCanvas from '@/components/landing/FlowWaveCanvas';

const COPY = {
  de: {
    tw:   'Tools. Produkte. Indikatoren.',
    sub:  'Software, die bleibt. Produkte, Frameworks und Indikatoren — gebaut von Entwicklern, für Entwickler.',
    cta1: 'Produkte ansehen →',
    cta2: 'Discord joinen',
  },
  en: {
    tw:   'Tools. Products. Indicators.',
    sub:  'Software that lasts. Products, frameworks and indicators — built by developers, for developers.',
    cta1: 'View Products →',
    cta2: 'Join Discord',
  },
} as const;

export default function HeroSection() {
  const twRef = useRef<HTMLSpanElement>(null);
  const [lang, setLang] = useState<'de' | 'en'>('de');

  useEffect(() => {
    const get = () =>
      (document.documentElement.getAttribute('data-lang') as 'de' | 'en') ?? 'de';
    setLang(get());
    const obs = new MutationObserver(() => setLang(get()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang'] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = twRef.current;
    if (!el) return;
    const text = COPY[lang].tw;
    el.textContent = '';
    el.classList.remove('done');
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    function type() {
      if (!el) return;
      if (i < text.length) { el.textContent += text[i++]; timer = setTimeout(type, 55); }
      else el.classList.add('done');
    }
    timer = setTimeout(type, 200);
    return () => clearTimeout(timer);
  }, [lang]);

  const c = COPY[lang];

  return (
    <section className="hero hero--wave">
      <FlowWaveCanvas />
      <div className="hero-wave-overlay" />
      <div className="container hero-layout">
        <div className="hero-text">
          <h1>
            Flux Network.<br />
            <span ref={twRef} className="typewriter" />
          </h1>
          <p className="hero-sub">{c.sub}</p>
          <div className="hero-ctas">
            <a href="#produkte" className="btn-primary">{c.cta1}</a>
            <a href="https://discord.gg/D9GwqWpwHT" className="btn-ghost" target="_blank" rel="noopener">{c.cta2}</a>
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
