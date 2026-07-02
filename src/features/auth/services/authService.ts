import type { Credenciales, SesionUsuario } from '../types/auth.types'

/**
 * ⚠️ MOCK — reemplazar cuando el backend entregue el endpoint real.
 *
 * Contrato esperado (ajusta cuando llegue la definición real):
 *   POST {VITE_API_URL}/auth/login
 *   body: { correo, clave }
 *   200 → SesionUsuario (incluye token)
 *   401 → { mensaje: string }
 *
 * SIMULAR_BACKEND en true responde en memoria con un delay artificial.
 * Para probar el error, usa la contraseña "clave-incorrecta".
 */
const SIMULAR_BACKEND = true
const API_BASE_URL = import.meta.env?.VITE_API_URL ?? '/api'

export async function iniciarSesion(credenciales: Credenciales): Promise<SesionUsuario> {
  if (SIMULAR_BACKEND) {
    return simularLogin(credenciales)
  }

  const respuesta = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credenciales),
  })

  if (!respuesta.ok) {
    const cuerpo = await respuesta.json().catch(() => ({}))
    throw new Error(cuerpo.mensaje || 'Correo o contraseña incorrectos.')
  }

  return respuesta.json()
}

async function simularLogin({ correo, clave }: Credenciales): Promise<SesionUsuario> {
  await new Promise((resolve) => setTimeout(resolve, 700))

  if (clave === 'clave-incorrecta') {
    throw new Error('Correo o contraseña incorrectos.')
  }

  return {
    id: 'usr_demo_001',
    nombre: correo.split('@')[0],
    correo,
    tipo: 'COMPRADOR',
    token: 'demo-token-' + Date.now(),
  }
}