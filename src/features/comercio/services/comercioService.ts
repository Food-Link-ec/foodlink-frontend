import type { ComercioRegistrado, DatosRegistroComercio } from '../types/comercio.types'

const SIMULAR_BACKEND = true
const API_BASE_URL = import.meta.env?.VITE_API_URL ?? '/api'

export async function registrarComercio(datos: DatosRegistroComercio): Promise<ComercioRegistrado> {
  if (SIMULAR_BACKEND) {
    return simularRegistro(datos)
  }

  const respuesta = await fetch(`${API_BASE_URL}/comercios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })

  if (!respuesta.ok) {
    const cuerpo = await respuesta.json().catch(() => ({}))
    throw new Error(cuerpo.mensaje || 'No se pudo registrar el comercio. Intenta nuevamente.')
  }

  return respuesta.json()
}

async function simularRegistro(datos: DatosRegistroComercio): Promise<ComercioRegistrado> {
  await new Promise((resolve) => setTimeout(resolve, 700))

  if (datos.ruc === '1790012345001') {
    throw new Error('Ya existe un comercio registrado con este RUC.')
  }

  return {
    id: 'com_' + Date.now(),
    estado: 'PENDIENTE_VERIFICACION',
    ...datos,
  }
}