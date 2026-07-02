import type { Errores } from '../../../hooks/useForm'
import type { DatosRegistroComprador } from '../types/comprador.types'
import {
  esCedulaEcuadorValida,
  esEmailValido,
  esPasswordSegura,
  esRequerido,
  esTelefonoEcuadorValido,
} from '../../../utils/validators'

export function validarComprador(values: DatosRegistroComprador): Errores<DatosRegistroComprador> {
  const errores: Errores<DatosRegistroComprador> = {}

  if (!esRequerido(values.nombre)) errores.nombre = 'Ingresa tu nombre.'
  if (!esRequerido(values.apellido)) errores.apellido = 'Ingresa tu apellido.'

  if (!esRequerido(values.cedula)) errores.cedula = 'Ingresa tu número de cédula.'
  else if (!esCedulaEcuadorValida(values.cedula)) errores.cedula = 'La cédula ingresada no es válida.'

  if (!esRequerido(values.correo)) errores.correo = 'Ingresa tu correo electrónico.'
  else if (!esEmailValido(values.correo)) errores.correo = 'El formato del correo no es válido.'

  if (!esRequerido(values.telefono)) errores.telefono = 'Ingresa un teléfono de contacto.'
  else if (!esTelefonoEcuadorValido(values.telefono)) errores.telefono = 'Formato no válido. Ej: 0991234567.'

  if (!esRequerido(values.clave)) errores.clave = 'Ingresa una contraseña.'
  else if (!esPasswordSegura(values.clave)) errores.clave = 'La contraseña debe tener al menos 8 caracteres.'

  if (!esRequerido(values.confirmarClave)) errores.confirmarClave = 'Confirma tu contraseña.'
  else if (values.confirmarClave !== values.clave) errores.confirmarClave = 'Las contraseñas no coinciden.'

  return errores
}