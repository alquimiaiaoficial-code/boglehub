import Link from 'next/link'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Logo size="md" />
            <p className="mt-4 text-sm text-fg-muted max-w-xs">
              Análisis de cartera con IA para inversores indexados. 100% gratis, sin registro, código abierto.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-fg mb-3">Producto</h4>
            <ul className="space-y-2 text-sm text-fg-muted">
              <li><Link href="/analyzer" className="hover:text-fg transition-colors">Analizador</Link></li>
              <li><Link href="/" className="hover:text-fg transition-colors">Cómo funciona</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-fg mb-3">Recursos</h4>
            <ul className="space-y-2 text-sm text-fg-muted">
              <li><Link href="https://github.com/alquimiaiaoficial-code/boglehub" target="_blank" rel="noopener" className="hover:text-fg transition-colors">GitHub</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-2 text-xs text-fg-subtle">
          <p>© 2026 BogleHub · Información educativa, no asesoramiento financiero</p>
          <p>Hecho con código abierto en España</p>
        </div>
      </div>
    </footer>
  )
}
