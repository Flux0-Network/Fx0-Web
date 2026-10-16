import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import SiteFooter from '@/components/landing/SiteFooter';
import CookieNotice from '@/components/landing/CookieNotice';
import ChangelogClient from './ChangelogClient';

export const metadata: Metadata = {
  title: 'Updates, Flux Network',
  description: 'Alle Updates, Releases und Changelog-Einträge aus dem Flux Network Ökosystem.',
  openGraph: {
    title: 'Updates, Flux Network',
    description: 'Alle Updates, Releases und Changelog-Einträge aus dem Flux Network Ökosystem.',
    images: ['https://flux0.dev/og-image.png'],
  },
};

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="hero-small">
          <div className="container">
            <div className="section-label-row">
              <span className="dot dot--grün" />
              CHANGELOG
            </div>
            <h1 className="hero-small-title">Was wir shipped haben.</h1>
            <p className="hero-small-sub">
              Alle Releases, Features und Fixes aus dem Flux Network Ökosystem.
            </p>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <ChangelogClient />
          </div>
        </section>
      </main>
      <SiteFooter />
      <CookieNotice />
    </>
  );
}
