import Link from 'next/link'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo size="md" />
            <p className="mt-4 text-sm text-fg-muted max-w-xs">
              Análisis de cartera con IA para inversores indexados. 100% gratis, sin registro. Tus datos viven en tu navegador.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-fg mb-3">Producto</h4>
            <ul className="space-y-2 text-sm text-fg-muted">
              <li><Link href="/analyzer" className="hover:text-fg transition-colors">Analizador</Link></li>
              <li><Link href="/chat" className="hover:text-fg transition-colors">Chat IA</Link></li>
              <li><Link href="/" className="hover:text-fg transition-colors">Cómo funciona</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-fg mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-fg-muted">
              <li><Link href="/aviso-legal" className="hover:text-fg transition-colors">Aviso legal</Link></li>
              <li><Link href="/privacidad" className="hover:text-fg transition-colors">Privacidad</Link></li>
              <li><Link href="/terminos" className="hover:text-fg transition-colors">Términos de uso</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-2 text-xs text-fg-subtle">
          <p>© 2026 BogleHub · Información educativa, no asesoramiento financiero</p>
          <p>Hecho con cariño en España</p>
        </div>
      </div>
    </footer>
  )
}
