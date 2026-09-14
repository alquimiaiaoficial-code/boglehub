import Link from 'next/link'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo size="md" />
            <p className="mt-4 text-sm text-fg-muted max-w-xs">
              Análisis de cartera con IA para inversores indexados. 100% gratis, sin registro. Tus datos viven en tu navegador.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-fg mb-3">Producto</h4>
            <ul className="space-y-2 text-sm text-fg-muted">
              <li><Link href="/empezar" className="hover:text-fg transition-colors">Cómo empezar</Link></li>
              <li><Link href="/analyzer" className="hover:text-fg transition-colors">Analizador</Link></li>
              <li><Link href="/comparar" className="hover:text-fg transition-colors">Comparar ETFs</Link></li>
              <li><Link href="/chat" className="hover:text-fg transition-colors">Chat IA</Link></li>
              <li><Link href="/calculadora/interes-compuesto" className="hover:text-fg transition-colors">Interés compuesto</Link></li>
              <li><Link href="/calculadora/fire-monte-carlo" className="hover:text-fg transition-colors">Calculadora FIRE</Link></li>
              <li><Link href="/calculadora/roboadvisor-vs-diy" className="hover:text-fg transition-colors">Roboadvisor vs DIY</Link></li>
              <li><Link href="/calculadora/irpf-venta-fondos" className="hover:text-fg transition-colors">Calculadora IRPF</Link></li>
              <li><Link href="/calculadora/comparar-brokers" className="hover:text-fg transition-colors">Comparador de brokers</Link></li>
              <li><Link href="/calculadora" className="hover:text-fg transition-colors">Todas las calculadoras</Link></li>
              <li><Link href="/score" className="hover:text-fg transition-colors">Puntúa tu cartera</Link></li>
              <li><Link href="/guia" className="hover:text-fg transition-colors">Guía en PDF</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-fg mb-3">ETFs y fondos</h4>
            <ul className="space-y-2 text-sm text-fg-muted">
              <li><Link href="/etf" className="hover:text-fg transition-colors">Catálogo ETF</Link></li>
              <li><Link href="/etfs/msci-world" className="hover:text-fg transition-colors">ETFs MSCI World</Link></li>
              <li><Link href="/etfs/sp500" className="hover:text-fg transition-colors">ETFs S&P 500</Link></li>
              <li><Link href="/etfs/acumulacion" className="hover:text-fg transition-colors">ETFs acumulación</Link></li>
              <li><Link href="/etfs/renta-fija" className="hover:text-fg transition-colors">ETFs renta fija</Link></li>
              <li><Link href="/fondo" className="hover:text-fg transition-colors">Fondos indexados</Link></li>
              <li><Link href="/gestora" className="hover:text-fg transition-colors">Gestoras</Link></li>
              <li><Link href="/comparar-fondo" className="hover:text-fg transition-colors">Comparar fondos</Link></li>
            </ul>
          </div>
          {/*
            Columna añadida el 14-sep-2026. No es decoración: era la causa de que el 43 % de
            las URLs del sitemap estuvieran en «Google no reconoce esta URL» — ni rastreadas
            una sola vez. `/broker`, `/roboadvisor`, `/gestora`, `/cartera`, `/perfil` y el
            resto no tenían NINGÚN enlace desde el menú ni desde el pie, así que Googlebot
            entraba por la home y no encontraba camino hasta ellas.
            No era un problema de calidad -no las miraba y las descartaba-, era que no
            llegaba. `hubs-enlazados.test.ts` impide que vuelva a pasar.
          */}
          <div>
            <h4 className="font-semibold text-sm text-fg mb-3">Dónde invertir</h4>
            <ul className="space-y-2 text-sm text-fg-muted">
              <li><Link href="/broker" className="hover:text-fg transition-colors">Brókers</Link></li>
              <li><Link href="/roboadvisor" className="hover:text-fg transition-colors">Roboadvisors</Link></li>
              <li><Link href="/cartera" className="hover:text-fg transition-colors">Carteras modelo</Link></li>
              <li><Link href="/perfil" className="hover:text-fg transition-colors">Perfiles de inversor</Link></li>
              <li><Link href="/jubilacion" className="hover:text-fg transition-colors">Jubilación</Link></li>
              <li><Link href="/invertir" className="hover:text-fg transition-colors">Cuánto invertir al mes</Link></li>
              <li><Link href="/plan" className="hover:text-fg transition-colors">Planes por edad</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-fg mb-3">Mercados</h4>
            <ul className="space-y-2 text-sm text-fg-muted">
              <li><Link href="/mercado" className="hover:text-fg transition-colors">Mercados</Link></li>
              <li><Link href="/pais" className="hover:text-fg transition-colors">Por país</Link></li>
              <li><Link href="/sector" className="hover:text-fg transition-colors">Por sector</Link></li>
              <li><Link href="/historico" className="hover:text-fg transition-colors">Histórico por año</Link></li>
              <li><Link href="/simulacion" className="hover:text-fg transition-colors">Simulaciones</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-fg mb-3">Recursos</h4>
            <ul className="space-y-2 text-sm text-fg-muted">
              <li><Link href="/blog" className="hover:text-fg transition-colors">Blog</Link></li>
              <li><Link href="/glosario" className="hover:text-fg transition-colors">Glosario</Link></li>
              <li><Link href="/faq" className="hover:text-fg transition-colors">Preguntas frecuentes</Link></li>
              <li><Link href="/datos-clave" className="hover:text-fg transition-colors">Datos clave 2026</Link></li>
              <li><Link href="/sobre" className="hover:text-fg transition-colors">Sobre BogleHub</Link></li>
              <li><Link href="/metodologia" className="hover:text-fg transition-colors">Metodología</Link></li>
              <li><Link href="/llms" className="hover:text-fg transition-colors">Datos para IAs</Link></li>
              <li><Link href="/en" className="hover:text-fg transition-colors">English</Link></li>
              <li>
                <a
                  href="https://www.youtube.com/@BogleHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-fg transition-colors"
                >
                  Canal de YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@boglehub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-fg transition-colors"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/boglehub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-fg transition-colors"
                >
                  Instagram
                </a>
              </li>
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
