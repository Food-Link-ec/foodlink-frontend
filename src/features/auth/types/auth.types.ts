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
}