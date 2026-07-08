import axios from 'axios'

const MENSAJE_DUPLICADO = 'Ya existe una cuenta registrada con estos datos. Por favor, inicia sesión.'
const MENSAJE_RED = 'No pudimos conectarnos con el servidor. Verifica tu conexión e intenta de nuevo.'
const MENSAJE_GENERICO = 'Ocurrió un error inesperado. Intenta nuevamente en unos minutos.'

/** Traduce errores de Axios (duplicados, red, etc.) a mensajes amigables para el usuario. */
export function getMensajeErrorRegistro(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    if (status === 400 || status === 409 || status === 422) {
      return MENSAJE_DUPLICADO
    }
    if (!error.response) {
      return MENSAJE_RED
    }
  }
  return MENSAJE_GENERICO
}
