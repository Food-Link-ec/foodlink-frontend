import type { LoginRequest, AuthResponse } from '../types/auth.types'

const API_BASE_URL = import.meta.env?.VITE_API_URL ?? 'http://localhost:8080/api/v1'

export async function iniciarSesion(credenciales: LoginRequest): Promise<AuthResponse> {
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