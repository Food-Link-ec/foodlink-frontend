<<<<<<< HEAD
export interface Credenciales {
  correo: string
  clave: string
}

export type TipoUsuario = 'COMERCIO' | 'BENEFICIARIO' | 'COMPRADOR' | 'ADMINISTRADOR'

export interface SesionUsuario {
  id: string
  nombre: string
  correo: string
  tipo: TipoUsuario
  token: string
=======
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
>>>>>>> dev
}