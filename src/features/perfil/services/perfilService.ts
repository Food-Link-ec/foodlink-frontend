import api from '../../../api/foodLinkApi'
import type { LoteResponse } from '../../lotes/types/lote.types'

export { getMiPerfil } from '../../auth/services/authService'

export const getMisLotes = async (estado?: string): Promise<LoteResponse[]> => {
  const response = await api.get<LoteResponse[]>('/comercios/mis-lotes', {
    params: estado ? { estado } : undefined,
  })
  return response.data
}

export const getMisReservas = async (): Promise<LoteResponse[]> => {
  const response = await api.get<LoteResponse[]>('/redistribucion/mis-reservas')
  return response.data
}

export interface EstadisticasCompradorResponse {
  compradorId: string
  totalLotesComprados: number
  totalPagado: number
  totalKgAdquiridos: number
  ahorroEstimado: number
  mensajeAhorro: string
  co2EvitadoKg: number
  kmSinConducir: number
  arbolesEquivalentes: number
  ahorroUltimos7Meses: number[]
}

export const getMisEstadisticas = async (): Promise<EstadisticasCompradorResponse> => {
  const response = await api.get<EstadisticasCompradorResponse>('/compradores/mis-estadisticas')
  return response.data
}
