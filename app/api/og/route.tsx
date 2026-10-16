import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';

export const runtime = 'edge';

const ACCENT: Record<string, string> = {
  LumaSpace:    '#4ade80',
  FlowWave:     '#818cf8',
  Vex0:         '#fbbf24',
  BuildFrameOS: '#f472b6',
  'Flux Network': '#00d4b1',
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const product = searchParams.get('product') ?? 'Flux Network';
  const version = searchParams.get('version') ?? '';
  const title   = searchParams.get('title')   ?? '';
  const tagline = searchParams.get('tagline')  ?? '';
  const date    = searchParams.get('date')     ?? '';

  const accent = ACCENT[product] ?? '#00d4b1';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#080808',
          display: 'flex',
          flexDirection: 'column',
          padding: '56px 72px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Diagonal line texture — repeating-linear-gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(135deg, transparent 0px, transparent 88px, rgba(255,255,255,0.028) 88px, rgba(255,255,255,0.028) 89px)',
        }} />

        {/* Subtle right-side glow */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '-80px',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}12 0%, transparent 70%)`,
          display: 'flex',
        }} />

        {/* Top-left: product icon dot + name + version */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: accent,
            flexShrink: 0,
            display: 'flex',
          }} />
          <div style={{ fontSize: 17, fontWeight: 700, color: '#ffffff', letterSpacing: 0.5 }}>
            {product}
          </div>
          {version ? (
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', marginLeft: 4 }}>
              {version}
            </div>
          ) : null}
          <div style={{ marginLeft: 'auto', fontSize: 13, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>
            {date}
          </div>
        </div>

        {/* Main text block — center vertically */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          paddingBottom: 8,
        }}>
          {/* Title — large, bold, white */}
          <div style={{
            fontSize: 80,
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: -3,
            lineHeight: 1.0,
            maxWidth: 900,
          }}>
            {title}
          </div>

          {/* Tagline — slightly dimmer, same size */}
          {tagline ? (
            <div style={{
              fontSize: 80,
              fontWeight: 900,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: -3,
              lineHeight: 1.0,
              maxWidth: 900,
              marginTop: 4,
            }}>
              {tagline}
            </div>
          ) : null}

          {/* powered by Flux0 */}
          <div style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#00d4b1',
            marginTop: 36,
            letterSpacing: 0.2,
          }}>
            powered by Flux0
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 1,
          paddingTop: 20,
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: 3, textTransform: 'uppercase' }}>
            Flux Network
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' }}>
            flux0.dev/changelog
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
