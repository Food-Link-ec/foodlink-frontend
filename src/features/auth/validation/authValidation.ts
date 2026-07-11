import type { Errores } from '../../../hooks/useForm'
import type { Credenciales } from '../types/auth.types'
import { esEmailValido, esRequerido } from '../../../utils/validators'

export function validarCredenciales(values: Credenciales): Errores<Credenciales> {
  const errores: Errores<Credenciales> = {}

  if (!esRequerido(values.correo)) {
    errores.correo = 'Ingresa tu correo electrónico.'
  } else if (!esEmailValido(values.correo)) {
    errores.correo = 'El formato del correo no es válido.'
  }

  if (!esRequerido(values.clave)) {
    errores.clave = 'Ingresa tu contraseña.'
  } else if (String(values.clave).trim().length < 6) {
    errores.clave = 'La contraseña debe tener mínimo 6 caracteres.'
  }

  return errores
}