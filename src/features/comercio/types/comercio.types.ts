export interface DatosRegistroComercio {
  nombre: string
  ruc: string
  direccion: string
  telefono: string
  email: string
  password: string
  confirmarClave?: string
}

export type EstadoComercio = 'PENDIENTE_VERIFICACION' | 'VERIFICADO' | 'RECHAZADO'

export interface ComercioRegistrado {
  id: string
  nombre: string
  ruc: string
  direccion: string
  telefono: string
  email: string
  estado: EstadoComercio
}