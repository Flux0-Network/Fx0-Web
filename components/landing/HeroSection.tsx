'use client';

import { useEffect, useRef } from 'react';
import LiquidChrome from './LiquidChrome';

export default function HeroSection() {
  const twRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
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

  // WP card 3D tilt
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    function onMove(e: MouseEvent) {
      const r = card!.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      card!.style.transform = `perspective(900px) rotateX(${(-dy * 7).toFixed(2)}deg) rotateY(${(dx * 7).toFixed(2)}deg)`;
      card!.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      card!.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    }
    function onLeave() {
      card!.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    }

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section className="hero" style={{ overflowX: 'hidden' }}>
      <div className="hero-dither-bg" aria-hidden="true">
        <LiquidChrome
          baseColor={[0.1, 0.1, 0.1]}
          speed={0.2}
          amplitude={0.5}
          frequencyX={3}
          frequencyY={2}
          interactive={true}
        />
      </div>
      <div className="container hero-layout">
        <div className="hero-text">
          <h1>
            Deine Website.<br />
            <span ref={twRef} className="typewriter">Professionell. Fertig.</span>
          </h1>
          <p className="hero-sub">
            Wir bauen moderne Webseiten für Unternehmen, Freelancer und Projekte — von der ersten Idee bis zum Launch. Schnell, sauber, auf den Punkt.
          </p>
          <div className="hero-ctas">
            <a href="https://discord.gg/D9GwqWpwHT" className="btn-primary" target="_blank" rel="noopener">
              Angebot anfragen →
            </a>
            <a href="#pakete" className="btn-ghost">Pakete ansehen</a>
          </div>
          <a href="#pakete" className="hero-scroll-hint" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
            Mehr erfahren
          </a>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hv-scene">
            <div className="hv-card hv-card--tl float-a">
              <div className="hv-card-dot" style={{ background: '#28c840' }} />
              <span>Live Preview</span>
            </div>

            <div ref={cardRef} className="wp-card">
              <div className="wp-bar">
                <span className="browser-dot" style={{ background: '#ff5f57' }} />
                <span className="browser-dot" style={{ background: '#febc2e' }} />
                <span className="browser-dot" style={{ background: '#28c840' }} />
                <div className="wp-url">mein-projekt.flux0.dev</div>
              </div>
              <div className="wp-body">
                <div className="wp-nav">
                  <div className="wp-nav-logo" />
                  <div className="wp-nav-links">
                    <div className="wp-nl" /><div className="wp-nl" /><div className="wp-nl" />
                  </div>
                  <div className="wp-nav-btn" />
                </div>
                <div className="wp-hero">
                  <div className="wp-glow" />
                  <div className="wp-label" />
                  <div className="wp-h1" />
                  <div className="wp-h1 wp-h1--b" />
                  <div className="wp-sub" />
                  <div className="wp-sub wp-sub--s" />
                  <div className="wp-ctas">
                    <div className="wp-btn wp-btn--p" />
                    <div className="wp-btn" />
                  </div>
                </div>
                <div className="wp-cards">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="wp-mc">
                      <div className="wp-mc-icon" />
                      <div className="wp-mc-line" />
                      <div className="wp-mc-line wp-mc-line--s" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hv-card hv-card--br float-b">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
              </svg>
              <span>Launch in ∅ 5 Tagen</span>
            </div>
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
