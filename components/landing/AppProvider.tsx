'use client';

import { useEffect } from 'react';

export default function AppProvider() {
  useEffect(() => {
    const theme = localStorage.getItem('theme') ?? 'dark';
    const lang  = localStorage.getItem('lang')  ?? 'de';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-lang',  lang);
  }, []);
  return null;
}
