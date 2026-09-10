'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    // Bottom-up reveals
    const upSelectors = [
      '.section-label-row', '.section-title', '.section-sub',
      '.cta-inner', '.faq-item', '.logo-cloud-item',
      '.roadmap-item', '.changelog-item', '.stats-strip-item', '.vylder-card',
      '.product-card', '.feature-card', '.paket-card',
      '.prozess-step', '.community-card', '.design-preview-card',
      '.mkt-card', '.pakete-note', '.tech-strip-label', '.tech-strip-list',
    ];

    // Directional reveals
    const leftSelectors  = ['.product-split-text', '.vex0-text', '.dashboard-text'];
    const rightSelectors = ['.product-split-visual', '.vex0-code', '.dashboard-preview'];

    function applyReveal(sel: string, cls: string) {
      document.querySelectorAll<HTMLElement>(sel).forEach(el => {
        if (!el.classList.contains('reveal') &&
            !el.classList.contains('reveal-left') &&
            !el.classList.contains('reveal-right')) {
          el.classList.add(cls);
        }
      });
    }

    upSelectors.forEach(s    => applyReveal(s, 'reveal'));
    leftSelectors.forEach(s  => applyReveal(s, 'reveal-left'));
    rightSelectors.forEach(s => applyReveal(s, 'reveal-right'));

    // Add stagger to sibling groups
    [...upSelectors, ...leftSelectors, ...rightSelectors].forEach(sel => {
      document.querySelectorAll<HTMLElement>(sel).forEach(el => {
        const siblings = el.parentElement
          ? [...el.parentElement.children].filter(
              c => c.classList.contains(el.classList[0])
            )
          : [];
        const idx = siblings.indexOf(el);
        if (idx > 0) el.style.transitionDelay = `${idx * 0.09}s`;
      });
    });

    const allRevealEls = document.querySelectorAll<HTMLElement>(
      '.reveal, .reveal-left, .reveal-right'
    );

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    allRevealEls.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
