/**
 * Cuánto patrimonio de menos deja, al cabo de `años`, pagar una comisión anual más alta.
 *
 * Existe desde el 29-sep-2026 porque la cuenta vivía metida en el JSX de las comparativas
 * y estaba mal: restaba la MITAD de la diferencia de TER (`terDiff / 100 / 2`), así que el
 * coste que se enseñaba era más o menos la mitad del real. Una cifra que se publica en 53
 * páginas tiene que poder probarse.
 *
 * Supuesto, que se dice en la página: la rentabilidad bruta es la misma para los dos y la
 * comisión se descuenta cada año del rendimiento. Es un cálculo ilustrativo, no una
 * previsión.
 *
 * @param capital      importe inicial, en euros
 * @param rentabilidad rentabilidad anual antes de comisiones, en tanto por uno (0,07)
 * @param terBarato    comisión anual del más barato, en tanto por uno (0,0012)
 * @param terCaro      comisión anual del más caro, en tanto por uno (0,0022)
 */
export function costeDiferenciaTer(
  capital: number,
  rentabilidad: number,
  terBarato: number,
  terCaro: number,
  años: number,
): number {
  const conBarato = capital * (1 + rentabilidad - terBarato) ** años
  const conCaro = capital * (1 + rentabilidad - terCaro) ** años
  return Math.round(conBarato - conCaro)
}
