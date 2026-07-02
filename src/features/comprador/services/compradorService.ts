import type { CompradorRegistrado, DatosRegistroComprador } from '../types/comprador.types'

/**
 * ⚠️ MOCK — reemplazar cuando el backend entregue el endpoint real.
 *   POST {VITE_API_URL}/compradores
 *   body: DatosRegistroComprador (sin confirmarClave)
 *   200 → CompradorRegistrado | 4xx → { mensaje: string }
 */
const SIMULAR_BACKEND = true
const API_BASE_URL = import.meta.env?.VITE_API_URL ?? '/api'

export async function registrarComprador(datos: DatosRegistroComprador): Promise<CompradorRegistrado> {
  if (SIMULAR_BACKEND) return simularRegistro(datos)

  const { confirmarClave, ...payload } = datos

  const respuesta = await fetch(`${API_BASE_URL}/compradores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!respuesta.ok) {
    const cuerpo = await respuesta.json().catch(() => ({}))
    throw new Error(cuerpo.mensaje || 'No se pudo completar el registro. Intenta nuevamente.')
  }
  return respuesta.json()
}

async function simularRegistro(datos: DatosRegistroComprador): Promise<CompradorRegistrado> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  if (datos.cedula === '1712345678') {
    throw new Error('Ya existe una cuenta registrada con esta cédula.')
  }

  const { clave, confirmarClave, ...resto } = datos
  return { id: 'cmp_' + Date.now(), ...resto }
}