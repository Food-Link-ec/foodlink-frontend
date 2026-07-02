export interface DatosRegistroBeneficiario {
  nombre: string
  ruc: string
  direccion: string
  telefono: string
  correo: string
  clave: string
  confirmarClave: string
  archivoDocumento: File | null
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