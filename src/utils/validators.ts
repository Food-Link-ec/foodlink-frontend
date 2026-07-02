export function esRequerido(valor: unknown): boolean {
  if (valor === undefined || valor === null) return false
  return String(valor).trim().length > 0
}

export function longitudMinima(valor: unknown, min: number): boolean {
  return String(valor ?? '').trim().length >= min
}

export function esEmailValido(valor: unknown): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(String(valor ?? '').trim())
}

/** Teléfono ecuatoriano: fijo (0[2-7] + 7 dígitos) o celular (09 + 8 dígitos). */
export function esTelefonoEcuadorValido(valor: unknown): boolean {
  const limpio = String(valor ?? '').replace(/[\s-]/g, '')
  return /^(09\d{8}|0[2-7]\d{7})$/.test(limpio)
}

/** Cédula ecuatoriana: algoritmo módulo 10, coeficientes alternados 2,1,2,1... */
export function esCedulaEcuadorValida(valor: unknown): boolean {
  const cedula = String(valor ?? '').replace(/\D/g, '')
  if (cedula.length !== 10) return false

  const provincia = parseInt(cedula.slice(0, 2), 10)
  if (provincia < 1 || provincia > 24) return false

  const tercerDigito = parseInt(cedula[2], 10)
  if (tercerDigito > 6) return false

  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2]
  const suma = coeficientes.reduce((acc, coef, i) => {
    let producto = parseInt(cedula[i], 10) * coef
    if (producto >= 10) producto -= 9
    return acc + producto
  }, 0)

  const digitoVerificador = parseInt(cedula[9], 10)
  const decenaSuperior = Math.ceil(suma / 10) * 10
  const resultado = decenaSuperior - suma === 10 ? 0 : decenaSuperior - suma

  return resultado === digitoVerificador
}

/** RUC ecuatoriano: 13 dígitos, termina en 001, coherente con cédula o sociedad. */
export function esRucEcuadorValido(valor: unknown): boolean {
  const ruc = String(valor ?? '').replace(/\D/g, '')
  if (ruc.length !== 13) return false
  if (!ruc.endsWith('001')) return false

  const tercerDigito = parseInt(ruc[2], 10)
  if (tercerDigito <= 6) {
    return esCedulaEcuadorValida(ruc.slice(0, 10))
  }
  return tercerDigito === 6 || tercerDigito === 9
}