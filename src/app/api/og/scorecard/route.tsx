import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

function gradeFromScore(score: number): { letter: string; color: string } {
  if (score >= 90) return { letter: 'A', color: '#10b981' }
  if (score >= 75) return { letter: 'B', color: '#3b82f6' }
  if (score >= 60) return { letter: 'C', color: '#eab308' }
  if (score >= 45) return { letter: 'D', color: '#f97316' }
  return { letter: 'F', color: '#ef4444' }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const rawScore = Number(searchParams.get('score') ?? '0')
  const score = Number.isFinite(rawScore)
    ? Math.max(0, Math.min(100, Math.round(rawScore)))
    : 0
  const ter = Number(searchParams.get('ter') ?? '0')
  const etfs = Number(searchParams.get('etfs') ?? '0')
  const { letter, color } = gradeFromScore(score)

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #141414 100%)',
          fontFamily: 'sans-serif',
          padding: 60,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #3b82f6, #10b981)',
            }}
          />
          <span style={{ fontSize: 32, fontWeight: 700, color: '#fafafa' }}>
            BogleHub
          </span>
        </div>

        {/* Body: score grande + mini stats */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 30,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 26, color: '#a1a1aa', marginBottom: 8 }}>
              Mi nota Boglehead
            </span>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
              <span
                style={{
                  fontSize: 200,
                  fontWeight: 800,
                  color,
                  lineHeight: 1,
                }}
              >
                {score}
              </span>
              <span
                style={{ fontSize: 56, color: '#a1a1aa', marginBottom: 24 }}
              >
                /100
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                marginTop: 10,
                padding: '8px 20px',
                borderRadius: 10,
                background: color,
                fontSize: 32,
                fontWeight: 700,
                color: '#0a0a0a',
              }}
            >
              {letter}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 20, color: '#a1a1aa' }}>
                TER ponderado
              </span>
              <span
                style={{ fontSize: 42, fontWeight: 700, color: '#fafafa' }}
              >
                {ter.toFixed(2)}%
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 20, color: '#a1a1aa' }}>
                Clases de activo
              </span>
              <span
                style={{ fontSize: 42, fontWeight: 700, color: '#fafafa' }}
              >
                {etfs}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', marginTop: 30 }}>
          <span style={{ fontSize: 24, color: '#a1a1aa' }}>
            Hazte tu propia nota en boglehub.vercel.app
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
