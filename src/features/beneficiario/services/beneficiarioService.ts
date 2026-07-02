import type { BeneficiarioRegistrado, DatosRegistroBeneficiario } from '../types/beneficiario.types'

/**
 * ⚠️ MOCK — reemplazar cuando el backend entregue el endpoint real.
 *   POST {VITE_API_URL}/beneficiarios (multipart/form-data)
 *   campos: nombre, ruc, direccion, telefono, correo, clave, documento (file)
 *   200 → BeneficiarioRegistrado | 4xx → { mensaje: string }
 */
const SIMULAR_BACKEND = true
const API_BASE_URL = import.meta.env?.VITE_API_URL ?? '/api'

export async function registrarBeneficiario(datos: DatosRegistroBeneficiario): Promise<BeneficiarioRegistrado> {
  if (SIMULAR_BACKEND) return simularRegistro(datos)

  const formData = new FormData()
  formData.append('nombre', datos.nombre)
  formData.append('ruc', datos.ruc)
  formData.append('direccion', datos.direccion)
  formData.append('telefono', datos.telefono)
  formData.append('correo', datos.correo)
  formData.append('clave', datos.clave)
  if (datos.archivoDocumento) formData.append('documento', datos.archivoDocumento)

  const respuesta = await fetch(`${API_BASE_URL}/beneficiarios`, { method: 'POST', body: formData })

  if (!respuesta.ok) {
    const cuerpo = await respuesta.json().catch(() => ({}))
    throw new Error(cuerpo.mensaje || 'No se pudo registrar la organización. Intenta nuevamente.')
  }
  return respuesta.json()
}

async function simularRegistro(datos: DatosRegistroBeneficiario): Promise<BeneficiarioRegistrado> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return {
    id: 'ben_' + Date.now(),
    nombre: datos.nombre,
    ruc: datos.ruc,
    direccion: datos.direccion,
    telefono: datos.telefono,
    correo: datos.correo,
    nombreDocumento: datos.archivoDocumento?.name ?? '',
    estado: 'PENDIENTE_VERIFICACION',
  }
}