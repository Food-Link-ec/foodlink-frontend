/**
 * Datos que captura el formulario. El archivo se maneja aparte del
 * resto de campos porque un `File` no es serializable a JSON: se
 * envía en un FormData cuando se conecte al backend real.
 */
export interface DatosRegistroBeneficiario {
  nombre: string
  ruc: string
  direccion: string
  telefono: string
  archivoDocumento: File | null
}

export type EstadoBeneficiario = 'PENDIENTE_VERIFICACION' | 'VERIFICADO' | 'RECHAZADO'

export interface BeneficiarioRegistrado {
  id: string
  nombre: string
  ruc: string
  direccion: string
  telefono: string
  nombreDocumento: string
  estado: EstadoBeneficiario
}