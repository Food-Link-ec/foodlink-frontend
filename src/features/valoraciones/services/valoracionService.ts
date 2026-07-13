import api from '../../../api/foodLinkApi'

export interface ValoracionResponse {
  id: number
  loteId: string
  comercioId: string
  puntuacion: number
  comentario: string | null
  creadoEn: string
}

export interface ResumenValoracionesResponse {
  comercioId: string
  nombreComercio: string
  promedioEstrellas: number
  totalValoraciones: number
  valoraciones: ValoracionResponse[]
}

export const getValoracionesComercio = async (comercioId: string): Promise<ResumenValoracionesResponse> => {
  const response = await api.get<ResumenValoracionesResponse>(`/valoraciones/comercio/${comercioId}`)
  return response.data
}

export const getMisValoraciones = async (): Promise<ResumenValoracionesResponse> => {
  const response = await api.get<ResumenValoracionesResponse>('/valoraciones/mis-valoraciones')
  return response.data
}
