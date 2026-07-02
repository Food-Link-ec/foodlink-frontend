export interface DatosRegistroComercio {
  nombre: string
  ruc: string
  direccion: string
  telefono: string
  correo: string
  clave: string
  confirmarClave: string
}

export type EstadoComercio = 'PENDIENTE_VERIFICACION' | 'VERIFICADO' | 'RECHAZADO'

export interface ComercioRegistrado {
  id: string
  nombre: string
  ruc: string
  direccion: string
  telefono: string
  correo: string
  estado: EstadoComercio
}