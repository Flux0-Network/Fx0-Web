import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import SiteFooter from '@/components/landing/SiteFooter';
import CookieNotice from '@/components/landing/CookieNotice';
import { UPDATES, ogUrl } from '../updates-data';

const BASE = 'https://flux0.dev';

export function generateStaticParams() {
  return UPDATES.map(u => ({ slug: u.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const u = UPDATES.find(x => x.slug === slug);
  if (!u) return {};

  const image = ogUrl(u, BASE);
  const title = `${u.product} ${u.version} — ${u.title}`;
  const description = u.descDe;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE}/changelog/${u.slug}`,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function UpdatePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const u = UPDATES.find(x => x.slug === slug);
  if (!u) notFound();

  return (
    <>
      <Navbar />
      <main>
        <section className="hero-small">
          <div className="container">
            <Link href="/changelog" className="cl-back-link">← Alle Updates</Link>
            <div className="cl-single-meta">
              <span className="changelog-date">{u.date}</span>
              <span className={`changelog-tag ${u.tagCls}`}>{u.product}</span>
              <span className="changelog-version">{u.version}</span>
            </div>
            <h1 className="cl-single-title">{u.title}</h1>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container" style={{ maxWidth: 760 }}>
            {/* Banner */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ogUrl(u)}
              alt={`${u.product} ${u.version} Banner`}
              className="cl-banner"
              style={{ maxWidth: '100%', marginBottom: 32 }}
            />

            <p className="cl-entry-desc" style={{ fontSize: '1rem', marginBottom: 32 }}>
              {u.descDe}
            </p>

            <h2 style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: 16 }}>
              Was ist neu
            </h2>
            <ul className="cl-changes" style={{ marginBottom: 0 }}>
              {u.changes.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
      <CookieNotice />
    </>
  );
}
