'use client';

import { useEffect, useRef } from 'react';

export default function DocsNav() {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sidebar = document.querySelector<HTMLElement>('.docs-sidebar');
    const overlay = document.querySelector<HTMLDivElement>('.docs-overlay');
    const toggleBtn = document.querySelector<HTMLButtonElement>('.docs-mobile-toggle');
    const closeBtn = document.querySelector<HTMLButtonElement>('.docs-sidebar-close');

    sidebarRef.current = sidebar;
    overlayRef.current = overlay;

    function open() {
      sidebar?.classList.add('docs-sidebar--open');
      overlay?.classList.add('docs-overlay--open');
    }
    function close() {
      sidebar?.classList.remove('docs-sidebar--open');
      overlay?.classList.remove('docs-overlay--open');
    }

    toggleBtn?.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    overlay?.addEventListener('click', close);

    // Active sidebar link on scroll
    const sections = document.querySelectorAll<HTMLElement>('[id]');
    const navLinks = document.querySelectorAll<HTMLElement>('.docs-nav-link');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('docs-nav-link--active'));
          const active = document.querySelector<HTMLElement>(`.docs-nav-link[href="#${e.target.id}"]`);
          if (active) active.classList.add('docs-nav-link--active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(s => observer.observe(s));

    // Close sidebar on nav link click (mobile)
    navLinks.forEach(link => link.addEventListener('click', close));

    return () => {
      toggleBtn?.removeEventListener('click', open);
      closeBtn?.removeEventListener('click', close);
      overlay?.removeEventListener('click', close);
      observer.disconnect();
      navLinks.forEach(link => link.removeEventListener('click', close));
    };
  }, []);

  return null;
}
