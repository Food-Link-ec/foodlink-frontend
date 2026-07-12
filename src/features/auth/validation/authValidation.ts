import type { Errores } from '../../../hooks/useForm'
import type { LoginRequest } from '../types/auth.types'
import { esEmailValido, esRequerido } from '../../../utils/validators'

export function validarCredenciales(values: LoginRequest): Errores<LoginRequest> {
  const errores: Errores<LoginRequest> = {}

  if (!esRequerido(values.email)) {
    errores.email = 'Ingresa tu correo electrónico.'
  } else if (!esEmailValido(values.email)) {
    errores.email = 'El formato del correo no es válido.'
  }

  if (!esRequerido(values.password)) {
    errores.password = 'Ingresa tu contraseña.'
  } else if (String(values.password).trim().length < 6) {
    errores.password = 'La contraseña debe tener mínimo 6 caracteres.'
  }

  return errores
}