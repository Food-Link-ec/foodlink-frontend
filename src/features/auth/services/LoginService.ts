import api from '../../../api/foodLinkApi' 
import type { LoginRequest } from '../types/auth.types' 
import type { AuthResponse } from '../types/auth.types'

export async function loginComercio(credentials: LoginRequest): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>('/auth/login', credentials)

    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)
      localStorage.setItem('usuarioId', response.data.usuarioId)
    }
    
    return response.data
  } catch (error: any) {
    const mensajeError = error.response?.data?.message || 'Correo o contraseña incorrectos'
    throw new Error(mensajeError)
  }
}