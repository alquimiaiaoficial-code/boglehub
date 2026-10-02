// Versión web de la newsletter (`/newsletter` y `/newsletter/<n>`). Funciones puras: qué números
// se pueden enseñar ya y cómo partir un párrafo en texto y enlaces sin pasar por HTML.

import type { NumeroNewsletter } from '@/data/newsletter'

/**
 * Los números ya enviados, del más reciente al más antiguo. Uno sale a la web el día DESPUÉS de su
 * martes: así nunca aparece en la web antes que en el correo, aunque el cron se retrase.
 */
export function numerosPublicados(
  numeros: readonly NumeroNewsletter[],
  hoyMadrid: string,
): NumeroNewsletter[] {
  return numeros.filter((n) => n.fecha < hoyMadrid).sort((a, b) => b.numero - a.numero)
}

/** El saludo y la despedida tienen sentido en el correo, no en la página. */
export function parrafosWeb(n: NumeroNewsletter): string[] {
  return n.parrafos.filter((p) => !/^(Hola|Un saludo)\b/.test(p.trim()))
}

export type Trozo = { texto: string; href?: string }

const ENLACE = /\[([^\]]+)\]\((https:\/\/boglehub\.com[^)\s]*)\)/g

/** Parte un párrafo en trozos de texto y enlaces internos (`https://boglehub.com/x` pasa a `/x`). */
export function trozos(p: string): Trozo[] {
  const out: Trozo[] = []
  let ultimo = 0
  for (const m of p.matchAll(ENLACE)) {
    if (m.index! > ultimo) out.push({ texto: p.slice(ultimo, m.index) })
    out.push({ texto: m[1], href: m[2].replace('https://boglehub.com', '') || '/' })
    ultimo = m.index! + m[0].length
  }
  if (ultimo < p.length) out.push({ texto: p.slice(ultimo) })
  return out
}

/** «6 de octubre de 2026» a partir de AAAA-MM-DD, sin depender de la zona horaria del servidor. */
export function fechaLarga(iso: string): string {
  const [a, m, d] = iso.split('-').map(Number)
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  return `${d} de ${meses[m - 1]} de ${a}`
}
