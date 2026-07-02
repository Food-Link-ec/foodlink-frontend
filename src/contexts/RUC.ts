import { esRucEcuadorValido } from '../shared/utils/validators'

export class DominioError extends Error {
  constructor(mensaje: string) {
    super(mensaje)
    this.name = 'DominioError'
  }
}

export class RUC {
  readonly valor: string

  constructor(valor: string) {
    const limpio = String(valor ?? '').replace(/\D/g, '')
    if (!esRucEcuadorValido(limpio)) {
      throw new DominioError('El RUC ingresado no es válido. Debe tener 13 dígitos y terminar en 001.')
    }
    this.valor = limpio
  }

  toString(): string {
    return this.valor
  }
}