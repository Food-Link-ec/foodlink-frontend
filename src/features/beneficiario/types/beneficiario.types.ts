export interface DatosRegistroBeneficiario {
  nombre: string
  ruc: string
  direccion: string
  telefono: string
  clave: string
  confirmarClave: string
  archivoDocumento: File | null
  correo: string
  password: string
}

export type EstadoBeneficiario = 'PENDIENTE_VERIFICACION' | 'VERIFICADO' | 'RECHAZADO'

export interface BeneficiarioRegistrado {
  id: string
  nombre: string
  ruc: string
  direccion: string
  telefono: string
  correo: string
  nombreDocumento: string
  estado: EstadoBeneficiario
}