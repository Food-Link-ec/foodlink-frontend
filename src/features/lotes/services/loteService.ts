import api from '../../../api/foodLinkApi'
import type { BuscarLotesParams, BuscarLotesPaginadoParams, LoteResponse, PageResponse } from '../types/lote.types'

export interface PublicarLoteRequest {
  modalidad: 'VENTA' | 'DONACION' | 'RETIRO_DIRECTO'
  cantidadKg: number
  precio?: number | null
  precioMercado?: number | null
  fechaCaducidad: string
  descripcion: string
  fotosUrl: string[]
  latitud?: number | null
  longitud?: number | null
  categoriaProducto?: string | null
}

export const publicarLote = async (data: PublicarLoteRequest): Promise<LoteResponse> => {
  const response = await api.post<LoteResponse>('/lotes', data)
  return response.data
}

export const getLotes = async (params?: BuscarLotesParams): Promise<LoteResponse[]> => {
  // GET /lotes usa los nombres de parámetro `latitud`/`longitud` (distinto de /lotes/buscar, que usa `lat`/`lng`).
  const response = await api.get<LoteResponse[]>('/lotes', {
    params: {
      modalidad: params?.modalidad,
      categoria: params?.categoria,
      latitud: params?.lat,
      longitud: params?.lng,
      radioKm: params?.radioKm,
    },
  })
  return response.data
}

export const buscarLotes = async (params?: BuscarLotesPaginadoParams): Promise<PageResponse<LoteResponse>> => {
  const response = await api.get<PageResponse<LoteResponse>>('/lotes/buscar', { params })
  return response.data
}

export const getLoteById = async (id: string): Promise<LoteResponse> => {
  const response = await api.get<LoteResponse>(`/lotes/${id}`)
  return response.data
}
