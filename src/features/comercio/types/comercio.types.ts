export interface DatosRegistroComercio {
  nombre: string
  ruc: string
  direccion: string
  telefono: string
  correo: string
<<<<<<< HEAD
  clave: string
  confirmarClave: string
=======
  password: string
>>>>>>> dev
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