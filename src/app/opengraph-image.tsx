import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Steel Motion LLC — AI Automation & Custom Software Development'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0B1A2B',
          position: 'relative',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Gradient background effects */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-5%',
            width: '40%',
            height: '80%',
            background:
              'radial-gradient(circle, rgba(13, 110, 110, 0.2) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: '40%',
            height: '80%',
            background:
              'radial-gradient(circle, rgba(32, 178, 160, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #0D6E6E, #20B2A0, #0D6E6E)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 80px',
            zIndex: 10,
          }}
        >
          {/* Brand name */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: 900,
              color: 'white',
              letterSpacing: '-0.03em',
              marginBottom: '16px',
            }}
          >
            Steel Motion LLC
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '30px',
              fontWeight: 600,
              background: 'linear-gradient(90deg, #20B2A0 0%, #0D6E6E 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '40px',
              letterSpacing: '-0.01em',
            }}
          >
            AI Automation & Custom Software Development
          </div>

          {/* Divider */}
          <div
            style={{
              width: '120px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #0D6E6E, transparent)',
              marginBottom: '40px',
            }}
          />

          {/* Subtitle */}
          <div
            style={{
              fontSize: '22px',
              color: '#8892B0',
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: 1.5,
            }}
          >
            Veteran-Owned · Based in Texas · Serving Businesses Nationwide
          </div>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            fontSize: '16px',
            color: '#4A5568',
            letterSpacing: '0.05em',
          }}
        >
          steelmotionllc.com
        </div>
      </div>
    ),
    { ...size }
  )
}
