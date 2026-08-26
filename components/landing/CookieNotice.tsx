'use client';

import { useState, useEffect } from 'react';

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem('flux0-cookies-accepted')) setVisible(true);
    } catch {}
  }, []);

  function accept() {
    try { localStorage.setItem('flux0-cookies-accepted', '1'); } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-notice" style={{ display: 'flex' }}>
      <p>
        Wir verwenden Cookies, um die Webseite zu verbessern. Mehr in unserer{' '}
        <a href="/impressum.html">Datenschutzerklärung</a>.
      </p>
      <div className="cookie-notice-actions">
        <button className="cookie-accept" onClick={accept}>Akzeptieren</button>
        <button className="cookie-close" onClick={accept}>✕</button>
      </div>
    </div>
  );
}
