import api from '../../../api/foodLinkApi'
import type { LoginRequest, AuthResponse } from '../types/auth.types'

export const iniciarSesion = async (credenciales: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', credenciales)

    localStorage.setItem('accessToken', response.data.accessToken)
    localStorage.setItem('refreshToken', response.data.refreshToken)
    localStorage.setItem('usuarioId', response.data.usuarioId)
    localStorage.setItem('tipoUsuario', response.data.tipoUsuario)
    localStorage.setItem('email', response.data.email)

    return response.data
  } catch (error: any) {
    const mensajeError = error.response?.data?.mensaje || error.response?.data?.message || 'Correo o contraseña incorrectos'
    throw new Error(mensajeError)
  }
}

export const cerrarSesion = async (): Promise<void> => {
  const refreshToken = localStorage.getItem('refreshToken')
  if (refreshToken) {
    await api.post('/auth/logout', { refreshToken }).catch(() => undefined)
  }
  localStorage.clear()
}

export const getMiPerfil = async () => {
  const response = await api.get('/auth/me')
  return response.data
}
