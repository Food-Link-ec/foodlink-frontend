export interface DatosRegistroComprador {
  nombre: string
  apellido: string
  cedula: string
  correo: string
  telefono: string
}

export interface CompradorRegistrado extends DatosRegistroComprador {
  id: string
}