import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Flux Network',
  description: 'Professionelle Web-Lösungen für dein Unternehmen',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
