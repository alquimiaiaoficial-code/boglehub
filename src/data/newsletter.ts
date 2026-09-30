/**
 * Números de la newsletter semanal.
 *
 * El cron de Vercel llama cada martes a `/api/cron/newsletter`, que busca aquí el número cuya
 * `fecha` coincide con el día de hoy en Madrid y lo envía como broadcast de Resend a la audiencia.
 * Si no hay número para ese martes, no se envía nada: mejor ninguno que uno de relleno
 * (orden del fundador del 30-sep-2026: se envía sin pedirle permiso, así que el filtro es este).
 *
 * Formato de los párrafos: texto plano con enlaces `[texto](https://boglehub.com/...)`.
 * Sin HTML: el render lo escapa todo. Cada dato lleva su fuente, igual que en la web.
 *
 * Voz: memoria `boglehub-correos-voz` (sin rayas largas, sin listas, sin frases-tesis ni cierre
 * redondo). Describe, nunca recomienda: el test de lenguaje prescriptivo barre este fichero.
 */

export interface NumeroNewsletter {
  /** Número correlativo; da nombre al broadcast en Resend (`boglehub-n<numero>`), que es lo que evita reenviarlo. */
  numero: number
  /** Martes de envío, AAAA-MM-DD en hora de Madrid. */
  fecha: string
  asunto: string
  /** Línea que los clientes de correo enseñan junto al asunto. */
  preencabezado: string
  parrafos: string[]
}

export const NUMEROS_NEWSLETTER: readonly NumeroNewsletter[] = [
  {
    numero: 1,
    fecha: '2026-10-06',
    asunto: 'La cuenta europea de inversión, y una pregunta',
    preencabezado: 'Qué fondos cumplirían los porcentajes, leído en el BOE.',
    parrafos: [
      'Hola,',
      'El 30 de septiembre salió en el BOE la Cuenta de Ahorro e Inversión Financia Europa (Real Decreto-ley 26/2026). Dentro de ella se puede vender y cambiar de fondo sin tributar, y al sacar el dinero, la ganancia de lo que lleve más de cinco años dentro queda exenta al 100 % hasta 10.000 € por persona y al 20 % en lo que pase de ahí. Se pueden aportar hasta 150.000 €.',
      'Donde más nos detuvimos al leerla fue en qué se puede meter. Un fondo o ETF necesita al menos el 70 % de la cartera en el Espacio Económico Europeo. Reino Unido y Suiza no son del EEE, y en el MSCI Europe pesan un 22,38 % y un 14,29 % según la ficha de MSCI a 31 de agosto, así que un fondo de ese índice se queda en torno al 63 %. Uno del MSCI World, con Estados Unidos cerca del 70 %, tampoco llega. De nuestro catálogo, por composición solo cumplirían los tres fondos del MSCI EMU, que es la zona euro, y ninguno de los ETF.',
      'A 30 de septiembre todavía no se podía abrir con fondos. Falta que el Congreso convalide el decreto y que la CNMV cree el registro de fondos elegibles, para lo que tiene cuatro meses. Lo tienes leído artículo por artículo, con un ejemplo de cuánto se paga dentro y fuera de la cuenta, en [la página de la cuenta europea](https://boglehub.com/cuenta-europea-de-inversion).',
      'Y una pregunta que nos ayudaría mucho: ¿para qué entraste en BogleHub y qué no pudiste hacer? Basta con responder a este correo, lo leemos todo.',
      'Un saludo,',
    ],
  },
]
