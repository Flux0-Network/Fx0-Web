import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';

export const runtime = 'edge';

const ACCENT: Record<string, string> = {
  LumaSpace:    '#4ade80',
  FlowWave:     '#818cf8',
  Vex0:         '#fbbf24',
  BuildFrameOS: '#f472b6',
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const product = searchParams.get('product') ?? 'Flux Network';
  const version = searchParams.get('version') ?? '';
  const title   = searchParams.get('title')   ?? '';
  const date    = searchParams.get('date')     ?? '';
  const changes = searchParams.get('changes')  ?? '';

  const accent  = ACCENT[product] ?? '#a78bfa';
  const changeList = changes ? changes.split('|').slice(0, 4) : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #13111c 100%)',
          display: 'flex',
          flexDirection: 'column',
          padding: '52px 60px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* top accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: accent }} />

        {/* glow blob */}
        <div style={{
          position: 'absolute',
          top: -120,
          right: -120,
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: accent + '18',
          filter: 'blur(80px)',
        }} />

        {/* header row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            background: accent + '22',
            border: `1px solid ${accent}55`,
            borderRadius: 99,
            padding: '5px 16px',
            fontSize: 14,
            color: accent,
            fontWeight: 700,
            letterSpacing: 1,
          }}>
            {product}
          </div>
          <div style={{ fontSize: 13, color: '#ffffff50', fontFamily: 'monospace', letterSpacing: 1 }}>
            {version}
          </div>
          <div style={{ marginLeft: 'auto', fontSize: 13, color: '#ffffff33', fontFamily: 'monospace' }}>
            {date}
          </div>
        </div>

        {/* title */}
        <div style={{
          fontSize: 52,
          fontWeight: 900,
          color: '#ffffff',
          letterSpacing: -2,
          lineHeight: 1.1,
          marginTop: 28,
          maxWidth: 820,
        }}>
          {title}
        </div>

        {/* changes */}
        {changeList.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28 }}>
            {changeList.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ color: accent, fontSize: 16, fontWeight: 700, fontFamily: 'monospace', flexShrink: 0 }}>+</div>
                <div style={{ fontSize: 16, color: '#ffffffaa', lineHeight: 1.4 }}>{c}</div>
              </div>
            ))}
          </div>
        )}

        {/* footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: 24,
          borderTop: '1px solid #ffffff12',
        }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#ffffff66', letterSpacing: 3, textTransform: 'uppercase' }}>
            Flux Network
          </div>
          <div style={{ fontSize: 13, color: '#ffffff33', fontFamily: 'monospace' }}>
            flux0.dev/changelog
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
