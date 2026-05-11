import { ImageResponse } from 'next/og';

export const alt = '{{YOUR_NAME}}';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#fafafa',
          color: '#111111',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#6b7280',
          }}
        >
          {'{{YOUR_NAME}}'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {'{{YOUR_TAGLINE}}'}
          </div>
          <div style={{ fontSize: 28, color: '#6b7280' }}>{'{{YOUR_DOMAIN}}'}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
