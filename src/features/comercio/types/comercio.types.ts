export interface DatosRegistroComercio {
  nombre: string
  ruc: string
  direccion: string
  telefono: string
  correo: string
}

export type EstadoComercio = 'PENDIENTE_VERIFICACION' | 'VERIFICADO' | 'RECHAZADO'

export interface ComercioRegistrado extends DatosRegistroComercio {
  id: string
  estado: EstadoComercio
}