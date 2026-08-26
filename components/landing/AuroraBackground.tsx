'use client';

import { useEffect } from 'react';

export default function AuroraBackground() {
  useEffect(() => {
    const orbs: { el: HTMLElement | null; sx: number; sy: number; amp: number; freq: number; phase: number }[] = [
      { el: document.querySelector<HTMLElement>('.aurora--1'), sx: 0.10, sy: 0.06, amp: 70, freq: 0.00045, phase: 0 },
      { el: document.querySelector<HTMLElement>('.aurora--2'), sx: -0.08, sy: -0.05, amp: 55, freq: 0.00035, phase: 2.1 },
      { el: document.querySelector<HTMLElement>('.aurora--3'), sx: 0.06, sy: 0.08, amp: 45, freq: 0.00028, phase: 4.3 },
    ];

    let rafId: number;
    function animate(t: number) {
      const sy = window.scrollY;
      orbs.forEach(o => {
        if (!o.el) return;
        const dx = Math.sin(t * o.freq + o.phase) * o.amp;
        const dy = Math.cos(t * o.freq * 0.65 + o.phase) * o.amp * 0.55;
        o.el.style.transform = `translate(${dx + sy * o.sx}px, ${dy + sy * o.sy}px)`;
      });
      rafId = requestAnimationFrame(animate);
    }
    rafId = requestAnimationFrame(animate);

    // Scroll reveal
    const selectors = [
      '.section-label-row', '.section-intro', '.feature-card', '.paket-card',
      '.prozess-step', '.community-card', '.logo-cloud-item', '.faq-item',
      '.design-preview-card', '.mkt-card', '.pakete-note', '.tech-strip-label',
      '.tech-strip-list', '.cta-inner', '.product-card', '.design-card',
    ];
    const els = document.querySelectorAll<HTMLElement>(selectors.join(','));
    els.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
        else entry.target.classList.remove('in-view');
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach((el, _i) => {
      const siblings = el.parentElement
        ? [...el.parentElement.children].filter(c => c.classList.contains(el.classList[0]))
        : [];
      const idx = siblings.indexOf(el);
      if (idx > 0) el.style.transitionDelay = (idx * 0.08) + 's';
      observer.observe(el);
    });

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="glow-orb glow-orb--tl" aria-hidden="true" />
      <div className="glow-orb glow-orb--tr" aria-hidden="true" />
      <div className="aurora-wrap" aria-hidden="true">
        <div className="aurora aurora--1" />
        <div className="aurora aurora--2" />
        <div className="aurora aurora--3" />
      </div>
    </>
  );
}
