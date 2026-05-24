import { ImageResponse } from 'next/og'

// Icono para iOS / Apple home screen. Se sirve en /apple-icon como PNG 180x180.
// Reproduce la "B" del logo sobre el gradiente azul → verde de BogleHub.
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
          color: '#ffffff',
          fontSize: 130,
          fontWeight: 900,
          letterSpacing: '-0.06em',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        B
      </div>
    ),
    { ...size }
  )
}
