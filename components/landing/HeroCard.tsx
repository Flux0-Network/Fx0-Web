'use client';

import Image from 'next/image';

const PRODUCTS = [
  { name: 'LumaSpace', tag: 'Live', tagCls: 'hc-live', dot: '#22c55e' },
  { name: 'FlowWave',  tag: 'Beta', tagCls: 'hc-beta', dot: '#f59e0b' },
  { name: 'Vex0',      tag: 'Live', tagCls: 'hc-live', dot: '#22c55e' },
  { name: 'Vylder',    tag: 'Soon', tagCls: 'hc-soon', dot: '#8b5cf6' },
];

const NAV = ['Übersicht', 'Produkte', 'Early Access', 'Einstellungen'];

export default function HeroCard() {
  return (
    <div className="hc-outer">
      <div className="hc-glow" />

      <div className="hc-card">
        {/* browser bar */}
        <div className="hc-bar">
          <div className="hc-dots">
            <span style={{ background: '#ff5f56' }} />
            <span style={{ background: '#ffbd2e' }} />
            <span style={{ background: '#27c93f' }} />
          </div>
          <div className="hc-url">flux0.dev/dashboard</div>
        </div>

        {/* body */}
        <div className="hc-body">
          <div className="hc-sidebar">
            <Image
              src="/logo1.png"
              alt="Flux Network"
              width={80} height={20}
              style={{ height: '13px', width: 'auto', opacity: 0.65, marginBottom: '16px', display: 'block' }}
            />
            {NAV.map((item, i) => (
              <div key={item} className={`hc-nav-item${i === 1 ? ' active' : ''}`}>{item}</div>
            ))}
          </div>

          <div className="hc-main">
            <div className="hc-main-title">Meine Produkte</div>
            {PRODUCTS.map(p => (
              <div key={p.name} className="hc-row">
                <span className="hc-row-dot" style={{ background: p.dot }} />
                <span className="hc-row-name">{p.name}</span>
                <span className={`hc-row-tag ${p.tagCls}`}>{p.tag}</span>
              </div>
            ))}
            <div className="hc-hr" />
            <div className="hc-stats-row">
              <div className="hc-mini-stat"><span>3</span><small>Aktiv</small></div>
              <div className="hc-mini-stat"><span>12k</span><small>API Calls</small></div>
              <div className="hc-mini-stat"><span>99.9%</span><small>Uptime</small></div>
            </div>
          </div>
        </div>
      </div>

      {/* floating status badge */}
      <div className="hc-badge">
        <span className="hc-badge-pulse" />
        Alle Systeme Live
      </div>
    </div>
  );
}
