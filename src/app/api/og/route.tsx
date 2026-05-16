import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') ?? 'BogleHub'
  const subtitle = searchParams.get('subtitle') ?? 'Análisis de cartera con IA'

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
          background: 'linear-gradient(135deg, #0a0a0a 0%, #141414 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 60,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 30 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                background: 'linear-gradient(135deg, #3b82f6, #10b981)',
              }}
            />
            <span style={{ fontSize: 36, fontWeight: 700, color: '#fafafa' }}>BogleHub</span>
          </div>
          <h1 style={{ fontSize: 64, fontWeight: 800, color: '#fafafa', textAlign: 'center', margin: 0, lineHeight: 1.1 }}>
            {title}
          </h1>
          <p style={{ fontSize: 28, color: '#a1a1aa', textAlign: 'center', marginTop: 20 }}>
            {subtitle}
          </p>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
