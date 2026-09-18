/**
 * Validación de ISIN por su dígito de control.
 *
 * POR QUÉ EXISTE ESTO. El 18-sep-2026, al verificar el catálogo de fondos contra fuentes
 * externas, dos ISINs no aparecían en ningún registro ni en ninguna búsqueda. La hipótesis
 * cómoda era que la fuente consultada no los cubría. La comprobación barata dijo otra cosa:
 * el dígito de control no cuadraba, así que **no podían existir**. Estaban inventados.
 *
 * Un barrido con esta función sobre todo `src/` encontró **siete** ISINs imposibles: dos en
 * el catálogo de fondos y cinco en `etfs.json`, que es el catálogo que sostiene el producto.
 * Y esos cinco se publicaban en la ficha del ETF, en los datos estructurados de schema.org,
 * en `llms-full.txt` —el fichero que leen los motores de IA— y dentro de la instrucción
 * «usa el buscador con el ISIN» de las páginas de compra, junto a la frase «verifica que el
 * ISIN coincide exactamente para evitar comprar un ETF equivocado».
 *
 * LO QUE ESTA FUNCIÓN SÍ Y NO GARANTIZA. Un ISIN con dígito correcto puede seguir siendo el
 * de OTRO producto: `LU1437015735` es un ISIN perfectamente válido, y es un ETF de renta
 * variable europea que nuestra ficha describía como un fondo de renta fija. Esto detecta lo
 * imposible, no lo falso. Verificar en fuente sigue siendo obligatorio.
 *
 * El algoritmo es el de la norma ISO 6166: las letras se convierten a números (A=10 … Z=35),
 * se concatenan los dígitos y se aplica Luhn desde la derecha.
 */

/** Devuelve el dígito de control que DEBERÍA tener el ISIN, o null si no tiene la forma. */
export function digitoDeControlIsin(isin: string): number | null {
  const limpio = isin.trim().toUpperCase()
  if (!/^[A-Z]{2}[A-Z0-9]{9}[0-9]$/.test(limpio)) return null

  let digitos = ''
  for (const caracter of limpio.slice(0, 11)) {
    digitos += caracter >= '0' && caracter <= '9'
      ? caracter
      : String(caracter.charCodeAt(0) - 55) // 'A' (65) -> 10
  }

  let total = 0
  // Luhn: se dobla empezando por la cifra más a la derecha de las once.
  for (let i = digitos.length - 1, posicion = 0; i >= 0; i--, posicion++) {
    let n = Number(digitos[i])
    if (posicion % 2 === 0) {
      n *= 2
      if (n > 9) n -= 9
    }
    total += n
  }
  return (10 - (total % 10)) % 10
}

/** true si el ISIN tiene la forma correcta y su dígito de control cuadra. */
export function esIsinValido(isin: string): boolean {
  const esperado = digitoDeControlIsin(isin)
  if (esperado === null) return false
  return esperado === Number(isin.trim().slice(-1))
}
