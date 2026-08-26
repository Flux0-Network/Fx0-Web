import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import SiteFooter from '@/components/landing/SiteFooter';
import CookieNotice from '@/components/landing/CookieNotice';

export const metadata: Metadata = {
  title: 'Impressum — Flux0',
  description: 'Impressum von Flux0 / Flux Network gemäß § 5 TMG.',
  openGraph: {
    type: 'website',
    url: 'https://flux0.dev/impressum',
    title: 'Impressum — Flux0',
    siteName: 'Flux0',
  },
  alternates: { canonical: 'https://flux0.dev/impressum' },
};

export default function ImpressumPage() {
  return (
    <>
      <Navbar />

      <section className="hero hero--small">
        <div className="container">
          <div className="hero-label">
            <span className="dot" />
            RECHTLICHES
          </div>
          <h1>Impressum</h1>
          <p className="hero-sub">Angaben gemäß § 5 TMG</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="impressum-layout">

            <div className="impressum-block">
              <h2>Anbieter</h2>
              <p>
                <strong>Flux Network</strong><br />
                Inhaber: Bastian Kroha<br />
                Sandbrink 7<br />
                31558 Hagenburg<br />
                Deutschland
              </p>
            </div>

            <div className="impressum-block">
              <h2>Kontakt</h2>
              <p>
                E-Mail: <a href="mailto:support@lumaspace.de" className="impressum-link">support@lumaspace.de</a><br />
                Discord: <a href="https://discord.gg/yqQutP6EKV" target="_blank" rel="noopener" className="impressum-link">discord.gg/yqQutP6EKV</a>
              </p>
            </div>

            <div className="impressum-block">
              <h2>Verantwortlich für den Inhalt</h2>
              <p>
                Bastian Kroha<br />
                Sandbrink 7<br />
                31558 Hagenburg
              </p>
            </div>

            <div className="impressum-block">
              <h2>Haftungsausschluss</h2>
              <p>
                Die auf dieser Website bereitgestellten Inhalte dienen ausschließlich allgemeinen
                Informationszwecken. Sämtliche Informationen zu Kryptowährungen, Trading-Daten oder
                Community-Inhalten stellen <strong>keine Anlageberatung, Empfehlung oder Aufforderung</strong>{' '}
                zum Kauf oder Verkauf von Finanzinstrumenten dar. Investitionen in Kryptowährungen sind
                mit erheblichen Risiken verbunden.
              </p>
            </div>

            <div className="impressum-block">
              <h2>Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:<br />
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener" className="impressum-link">
                  ec.europa.eu/consumers/odr
                </a>
              </p>
              <p style={{ marginTop: '12px' }}>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            <div className="impressum-block">
              <h2>Urheberrecht</h2>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
                Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </div>

          </div>
        </div>
      </section>

      <SiteFooter />
      <CookieNotice />
    </>
  );
}
