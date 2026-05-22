import Link from 'next/link'
import { Logo } from './Logo'
import { Button } from './ui/Button'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 h-16">
        <Link href="/" className="flex items-center">
          <Logo size="md" />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-fg-muted">
          <Link href="/analyzer" className="hover:text-fg transition-colors">Analizador</Link>
          <Link href="/comparar" className="hover:text-fg transition-colors">Comparar ETFs</Link>
          <Link href="/etfs" className="hover:text-fg transition-colors">ETFs</Link>
          <Link href="/chat" className="hover:text-fg transition-colors">Chat IA</Link>
          <Link href="/blog" className="hover:text-fg transition-colors">Blog</Link>
        </nav>
        <Link href="/analyzer">
          <Button size="sm" variant="accent">Empezar gratis</Button>
        </Link>
      </div>
    </header>
  )
}
