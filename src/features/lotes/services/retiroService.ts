import api from '../../../api/foodLinkApi'

export interface PinRetiroResponse {
  loteId: string
  pin: string
  qrData: string
  expiraEn: string
  mensaje: string
}

export const generarPin = async (loteId: string): Promise<PinRetiroResponse> => {
  const response = await api.post<PinRetiroResponse>(`/retiros/pin/${loteId}`)
  return response.data
}

export const validarPin = async (loteId: string, pin: string): Promise<{ mensaje: string; loteId: string }> => {
  const response = await api.post('/retiros/validar', { loteId, pin })
  return response.data
}
