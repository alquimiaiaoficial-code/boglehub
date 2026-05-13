import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function HomePage() {
  return (
    <main>
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 h-16">
          <span className="text-xl font-bold">📊 BogleHub</span>
          <Link href="/analyzer">
            <Button>Analizar mi cartera</Button>
          </Link>
        </div>
      </header>

      <section className="bg-gradient-to-b from-white to-zinc-50">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Tu cartera de fondos indexados,<br />
            <span className="text-brand-600">analizada con IA en segundos.</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-600">
            Indexa Capital te <em>gestiona</em> el dinero. BogleHub te da <em>las herramientas</em> para que lo gestiones tú.
            Asignación, diversificación, costes y FIRE — todo en español, gratis.
          </p>
          <Link href="/analyzer" className="mt-8 inline-block">
            <Button size="lg">Empezar gratis →</Button>
          </Link>
          <p className="mt-3 text-sm text-zinc-400">Sin registro. Tus datos viven en tu navegador.</p>
        </div>
      </section>

      <footer className="border-t border-zinc-200 py-8 text-center text-sm text-zinc-500">
        © 2026 BogleHub · Información educativa, no asesoramiento financiero
      </footer>
    </main>
  )
}
