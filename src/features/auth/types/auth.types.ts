export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  tipoUsuario: string
  usuarioId: string
  email: string
  rol: string
  expiraEnMs: number
}

export interface RefreshTokenRequest {
  refreshToken: string
}