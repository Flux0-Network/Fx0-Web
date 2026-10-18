import type { Metadata } from 'next';
import Navbar from '@/components/landing/Navbar';
import SiteFooter from '@/components/landing/SiteFooter';
import CookieNotice from '@/components/landing/CookieNotice';

export const metadata: Metadata = {
  title: 'Datenschutzerklarung, Flux0',
  description: 'Datenschutzerklarung von Flux0 / Flux Network gemas Art. 13 DSGVO.',
  openGraph: {
    type: 'website',
    url: 'https://flux0.dev/datenschutz',
    title: 'Datenschutzerklarung, Flux0',
    siteName: 'Flux0',
  },
  alternates: { canonical: 'https://flux0.dev/datenschutz' },
};

export default function DatenschutzPage() {
  return (
    <>
      <Navbar />

      <section className="hero hero--small">
        <div className="container">
          <div className="hero-label">
            <span className="dot" />
            RECHTLICHES
          </div>
          <h1>Datenschutzerklarung</h1>
          <p className="hero-sub">Informationen zur Verarbeitung personenbezogener Daten gemas DSGVO</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="impressum-layout">

            <div className="impressum-block">
              <h2>1. Verantwortlicher</h2>
              <p>
                <strong>Flux Network</strong><br />
                Inhaber: Bastian Kroha<br />
                Sandbrink 7<br />
                31558 Hagenburg<br />
                Deutschland<br />
                E-Mail: <a href="mailto:support@lumaspace.de" className="impressum-link">support@lumaspace.de</a>
              </p>
            </div>

            <div className="impressum-block">
              <h2>2. Erhebung und Speicherung personenbezogener Daten</h2>
              <p>
                Beim Aufrufen unserer Website werden durch den Browser automatisch Informationen an den
                Server unserer Website gesendet. Diese Informationen werden temporar in einem sogenannten
                Logfile gespeichert. Folgende Informationen werden dabei ohne Ihr Zutun erfasst und bis
                zur automatisierten Loschung gespeichert:
              </p>
              <p style={{ marginTop: '12px' }}>
                IP-Adresse des anfragenden Rechners, Datum und Uhrzeit des Zugriffs, Name und URL der
                abgerufenen Datei, Website, von der aus der Zugriff erfolgt (Referrer-URL), verwendeter
                Browser und ggf. das Betriebssystem Ihres Rechners sowie der Name Ihres Access-Providers.
              </p>
              <p style={{ marginTop: '12px' }}>
                Die genannten Daten werden zu folgenden Zwecken verarbeitet: Gewahrleistung eines
                reibungslosen Verbindungsaufbaus der Website, Gewahrleistung einer komfortablen Nutzung
                unserer Website sowie zur Auswertung der Systemsicherheit und -stabilitat.
              </p>
              <p style={{ marginTop: '12px' }}>
                Rechtsgrundlage fur die Datenverarbeitung ist Art. 6 Abs. 1 S. 1 lit. f DSGVO.
                Unser berechtigtes Interesse folgt aus den oben aufgelisteten Zwecken zur Datenerhebung.
              </p>
            </div>

            <div className="impressum-block">
              <h2>3. Weitergabe von Daten</h2>
              <p>
                Eine Ubermittlung Ihrer personlichen Daten an Dritte zu anderen als den im Folgenden
                aufgefuhrten Zwecken findet nicht statt. Wir geben Ihre personlichen Daten nur an Dritte
                weiter, wenn:
              </p>
              <p style={{ marginTop: '12px' }}>
                Sie Ihre nach Art. 6 Abs. 1 S. 1 lit. a DSGVO ausdruck­liche Einwilligung dazu erteilt
                haben, die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. f DSGVO zur Geltendmachung, Ausubung
                oder Verteidigung von Rechtsanspruchen erforderlich ist und kein Grund zur Annahme
                besteht, dass Sie ein uberwiegendes schutzwurdiges Interesse an der Nichtweitergabe
                Ihrer Daten haben, oder eine gesetzliche Verpflichtung zur Weitergabe nach Art. 6 Abs.
                1 S. 1 lit. c DSGVO besteht.
              </p>
            </div>

            <div className="impressum-block">
              <h2>4. Cookies</h2>
              <p>
                Wir setzen auf unserer Seite Cookies ein. Hierbei handelt es sich um kleine Dateien, die
                Ihr Browser automatisch erstellt und die auf Ihrem Endgerat gespeichert werden, wenn Sie
                unsere Seite besuchen. Cookies richten auf Ihrem Endgerat keinen Schaden an, enthalten
                keine Viren, Trojaner oder sonstige Schadsoftware.
              </p>
              <p style={{ marginTop: '12px' }}>
                Wir verwenden ausschlie&szlig;lich technisch notwendige Cookies, die fur den Betrieb
                der Website erforderlich sind (z.B. Spracheinstellungen). Eine Einwilligung ist hierfur
                nicht erforderlich (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
            </div>

            <div className="impressum-block">
              <h2>5. Analyse-Tools und Tools von Drittanbietern</h2>
              <p>
                Diese Website verwendet derzeit keine Analyse-Tools von Drittanbietern wie Google
                Analytics. Es werden keine personenbezogenen Daten an Werbenetzwerke oder
                Tracking-Dienste weitergeleitet.
              </p>
            </div>

            <div className="impressum-block">
              <h2>6. Kontaktformular / Early-Access-Anmeldung</h2>
              <p>
                Wenn Sie sich fur unseren Early Access anmelden, werden die von Ihnen eingegebenen Daten
                (E-Mail-Adresse) zum Zweck der Bearbeitung Ihrer Anfrage und fur den Fall von
                Anschlussfragen bei uns gespeichert. Die Daten werden ohne Ihre Einwilligung nicht an
                Dritte weitergegeben.
              </p>
              <p style={{ marginTop: '12px' }}>
                Rechtsgrundlage fur die Verarbeitung der Daten ist bei Vorliegen einer Einwilligung
                Art. 6 Abs. 1 lit. a DSGVO.
              </p>
            </div>

            <div className="impressum-block">
              <h2>7. Ihre Rechte</h2>
              <p>
                Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden
                personenbezogenen Daten:
              </p>
              <p style={{ marginTop: '12px' }}>
                <strong>Recht auf Auskunft</strong> (Art. 15 DSGVO),{' '}
                <strong>Recht auf Berichtigung</strong> (Art. 16 DSGVO),{' '}
                <strong>Recht auf Loschung</strong> (Art. 17 DSGVO),{' '}
                <strong>Recht auf Einschrankung der Verarbeitung</strong> (Art. 18 DSGVO),{' '}
                <strong>Recht auf Widerspruch</strong> (Art. 21 DSGVO) sowie{' '}
                <strong>Recht auf Datenu­bertragbarkeit</strong> (Art. 20 DSGVO).
              </p>
              <p style={{ marginTop: '12px' }}>
                Zur Ausubung Ihrer Rechte wenden Sie sich bitte an:{' '}
                <a href="mailto:support@lumaspace.de" className="impressum-link">support@lumaspace.de</a>
              </p>
              <p style={{ marginTop: '12px' }}>
                Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehorde uber die
                Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren.
              </p>
            </div>

            <div className="impressum-block">
              <h2>8. Hosting</h2>
              <p>
                Diese Website wird bei <strong>Vercel Inc.</strong> (340 Pine Street, Suite 603,
                San Francisco, California 94104, USA) gehostet. Details zur Datenverarbeitung durch
                Vercel entnehmen Sie der{' '}
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener" className="impressum-link">
                  Datenschutzerklarung von Vercel
                </a>.
              </p>
            </div>

            <div className="impressum-block">
              <h2>9. Aktualitat und Anderung dieser Datenschutzerklarung</h2>
              <p>
                Diese Datenschutzerklarung ist aktuell gultig und hat den Stand Oktober 2026. Durch die
                Weiterentwicklung unserer Website und Angebote oder aufgrund geanderte gesetzlicher bzw.
                behordlicher Vorgaben kann es notwendig werden, diese Datenschutzerklarung zu andern.
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
