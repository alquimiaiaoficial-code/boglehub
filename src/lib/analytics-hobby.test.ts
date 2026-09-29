import { describe, it, expect, vi, beforeEach } from 'vitest'

// En el plan Hobby de Vercel los eventos personalizados no se registran; lo único que se
// cuenta son páginas vistas. Este test vigila que cada evento siga saliendo también como
// vista de /evento/<nombre>, que es lo que de verdad llega al panel.
const track = vi.fn()
const pageview = vi.fn()
vi.mock('@vercel/analytics', () => ({ track, pageview }))

const { trackEvent, eventPath } = await import('./analytics')

describe('trackEvent en el plan Hobby', () => {
  beforeEach(() => {
    track.mockReset()
    pageview.mockReset()
  })

  it('manda el evento también como página vista virtual', () => {
    trackEvent('analysis_completed', { positions: 3 })
    expect(track).toHaveBeenCalledWith('analysis_completed', { positions: 3 })
    expect(pageview).toHaveBeenCalledWith({
      route: '/evento/analysis_completed',
      path: '/evento/analysis_completed',
    })
  })

  it('la ruta virtual no contiene los datos del evento', () => {
    expect(eventPath('email_captured')).toBe('/evento/email_captured')
    trackEvent('email_captured', { source: 'footer' })
    const [{ path }] = pageview.mock.calls[0]
    expect(path).not.toContain('footer')
  })

  it('si la analítica falla, no rompe la página', () => {
    pageview.mockImplementation(() => {
      throw new Error('bloqueado por el navegador')
    })
    expect(() => trackEvent('chat_used')).not.toThrow()
  })
})
