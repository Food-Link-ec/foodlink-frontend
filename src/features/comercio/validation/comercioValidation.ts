import type { Errores } from '../../../hooks/useForm'
import type { DatosRegistroComercio } from '../types/comercio.types'
import {
  esEmailValido,
  esRequerido,
  esRucEcuadorValido,
  esTelefonoEcuadorValido,
  longitudMinima,
} from '../../../utils/validators'

/**
 * Reglas de validación propias del registro de Comercio.
 * Separadas del componente para poder testearlas de forma aislada
 * y reutilizarlas si en el futuro hay otro formulario de edición.
 */
export function validarComercio(values: DatosRegistroComercio): Errores<DatosRegistroComercio> {
  const errores: Errores<DatosRegistroComercio> = {}

  if (!esRequerido(values.nombre)) {
    errores.nombre = 'Ingresa el nombre del comercio.'
  }

  if (!esRequerido(values.ruc)) {
    errores.ruc = 'Ingresa el RUC.'
  } else if (!esRucEcuadorValido(values.ruc)) {
    errores.ruc = 'El RUC debe tener 13 dígitos y terminar en 001.'
  }

  if (!esRequerido(values.direccion)) {
    errores.direccion = 'Ingresa la dirección del establecimiento.'
  }

  if (!esRequerido(values.telefono)) {
    errores.telefono = 'Ingresa un teléfono de contacto.'
  } else if (!esTelefonoEcuadorValido(values.telefono)) {
    errores.telefono = 'Formato no válido. Ej: 0991234567.'
  }

  if (!esRequerido(values.correo)) {
    errores.correo = 'Ingresa un correo electrónico.'
  } else if (!esEmailValido(values.correo)) {
    errores.correo = 'El formato del correo no es válido.'
  }

  if (!esRequerido(values.password)) {
    errores.password = 'Ingresa una contraseña.'
  } else if (!longitudMinima(values.password, 8)) {
    errores.password = 'La contraseña debe tener al menos 8 caracteres.'
  }

  return errores
}