export interface LoteResponse {
  id: string
  comercioId: string
  modalidad: string
  estado: string
  cantidadKg: number
  precioReducido: number | null
  precioNormal: number | null
  fechaCaducidad: string
  fechaPublicacion: string
  descripcion: string
  fotosUrl: string[]
  latitud: number | null
  longitud: number | null
  categoriaProducto: string | null
  beneficiarioReservaId: string | null
}

export interface PageResponse<T> {
  contenido: T[]
  paginaActual: number
  totalPaginas: number
  totalElementos: number
  tamanioPagina: number
  esUltimaPagina: boolean
  esPrimeraPagina: boolean
}

export interface BuscarLotesParams {
  modalidad?: string
  categoria?: string
  lat?: number
  lng?: number
  radioKm?: number
}

export interface BuscarLotesPaginadoParams extends BuscarLotesParams {
  q?: string
  page?: number
  size?: number
}
