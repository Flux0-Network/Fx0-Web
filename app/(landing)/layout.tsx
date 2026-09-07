import type { ReactNode } from 'react';
import AppProvider from '@/components/landing/AppProvider';

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/style.css" />
      <AppProvider />
      {children}
    </>
  );
}
