import api from '../../../api/foodLinkApi'
import type { LoteResponse } from '../types/lote.types'

export const reservarLote = async (loteId: string): Promise<LoteResponse> => {
  const response = await api.post<LoteResponse>('/redistribucion/reservar', { loteId })
  return response.data
}

export const cancelarReserva = async (loteId: string, motivo?: string): Promise<LoteResponse> => {
  const response = await api.post<LoteResponse>('/redistribucion/cancelar', {
    loteId,
    motivo: motivo || 'Cancelado por el usuario',
  })
  return response.data
}

export const confirmarVenta = async (loteId: string, compradorId: string): Promise<LoteResponse> => {
  const response = await api.post<LoteResponse>('/redistribucion/confirmar-venta', { loteId, compradorId })
  return response.data
}

export const confirmarDonacion = async (loteId: string, organizacionId: string): Promise<LoteResponse> => {
  const response = await api.post<LoteResponse>('/redistribucion/confirmar-donacion', { loteId, organizacionId })
  return response.data
}

export const getMisReservas = async (): Promise<LoteResponse[]> => {
  const response = await api.get<LoteResponse[]>('/redistribucion/mis-reservas')
  return response.data
}
