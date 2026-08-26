'use client';

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
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

    els.forEach(el => {
      const siblings = el.parentElement
        ? [...el.parentElement.children].filter(c => c.classList.contains(el.classList[0]))
        : [];
      const idx = siblings.indexOf(el);
      if (idx > 0) el.style.transitionDelay = (idx * 0.08) + 's';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
