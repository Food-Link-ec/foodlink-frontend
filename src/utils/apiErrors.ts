import axios from 'axios'

const MENSAJE_DUPLICADO = 'Ya existe una cuenta registrada con estos datos. Por favor, inicia sesión.'
const MENSAJE_VALIDACION = 'Datos inválidos. Verifica RUC, cédula, teléfono y email.'
const MENSAJE_RED = 'No pudimos conectarnos con el servidor. Verifica tu conexión e intenta de nuevo.'
const MENSAJE_GENERICO = 'Ocurrió un error inesperado. Intenta nuevamente en unos minutos.'

/** Traduce errores de Axios (duplicados, validación ecuatoriana, red, etc.) a mensajes amigables para el usuario. */
export function getMensajeErrorRegistro(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    // 422: el backend rechazó RUC/cédula/teléfono/email por no pasar la validación
    // ecuatoriana (módulo 11, módulo 10, formato 09XXXXXXXX/0XXXXXXXX). El mensaje
    // que devuelve ya es específico ("La cédula 'X' tiene un dígito verificador
    // inválido"), así que lo mostramos tal cual en vez de un mensaje genérico.
    if (status === 422) {
      return error.response?.data?.mensaje || MENSAJE_VALIDACION
    }
    if (status === 400 || status === 409) {
      return MENSAJE_DUPLICADO
    }
    if (!error.response) {
      return MENSAJE_RED
    }
  }
  return MENSAJE_GENERICO
}
