'use client';

import { useState } from 'react';
import { UPDATES, ogUrl, type Update } from './updates-data';

const BASE = typeof window !== 'undefined' ? window.location.origin : 'https://flux0.dev';
const PRODUCTS = ['Alle', 'LumaSpace', 'FlowWave', 'Vex0', 'BuildFrameOS'];

function UpdateCard({ u }: { u: Update }) {
  const [copied, setCopied] = useState(false);

  async function handleCopyLink() {
    const url = `${BASE}/changelog/${u.slug}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div id={u.slug} className="cl-entry">
      <div className="cl-entry-meta">
        <span className="changelog-date">{u.date}</span>
        <span className={`changelog-tag ${u.tagCls}`}>{u.product}</span>
        <span className="changelog-version">{u.version}</span>
      </div>
      <div className="cl-entry-body">
        <h3 className="cl-entry-title">{u.title}</h3>
        <p className="cl-entry-desc">{u.descDe}</p>

        {/* Banner */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ogUrl(u)}
          alt={`${u.product} ${u.version} Banner`}
          className="cl-banner"
          loading="lazy"
        />

        <ul className="cl-changes">
          {u.changes.map((c, j) => <li key={j}>{c}</li>)}
        </ul>

        <div className="cl-actions">
          <button className="cl-action-btn cl-action-btn--discord" onClick={handleCopyLink}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
            {copied ? 'Link kopiert!' : 'Link kopieren'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChangelogClient() {
  const [filter, setFilter] = useState('Alle');
  const filtered = filter === 'Alle'
    ? UPDATES
    : UPDATES.filter(u => u.product === filter);

  return (
    <>
      <div className="cl-filter-row">
        {PRODUCTS.map(p => (
          <button
            key={p}
            className={`cl-filter-btn${filter === p ? ' cl-filter-btn--active' : ''}`}
            onClick={() => setFilter(p)}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="cl-entries">
        {filtered.map(u => <UpdateCard key={u.slug} u={u} />)}
      </div>
    </>
  );
}
