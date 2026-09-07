'use client';

import { useEffect } from 'react';

export default function AppProvider() {
  useEffect(() => {
    const lang = localStorage.getItem('lang') ?? 'de';
    document.documentElement.setAttribute('data-lang', lang);
  }, []);
  return null;
}
