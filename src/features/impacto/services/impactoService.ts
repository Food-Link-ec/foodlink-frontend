import api from '../../../api/foodLinkApi'

export interface ImpactoDashboardResponse {
  totalKgRescatados: number
  totalCo2EvitadoKg: number
  totalPersonasBeneficiadas: number
  totalLotesEntregados: number
  mensaje: string
}

export interface ImpactoComercioResponse {
  comercioId: string
  nombreComercio: string
  totalKgRescatados: number
  totalCo2EvitadoKg: number
  totalPersonasBeneficiadas: number
  totalLotesEntregados: number
  kgRescatadosMesActual: number
  tituloLogro: string
  descripcionLogro: string
  mensajeImpacto: string
}

export const getDashboardImpacto = async (): Promise<ImpactoDashboardResponse> => {
  const response = await api.get<ImpactoDashboardResponse>('/impacto/dashboard')
  return response.data
}

export const getMiImpacto = async (): Promise<ImpactoComercioResponse> => {
  const response = await api.get<ImpactoComercioResponse>('/impacto/mi-impacto')
  return response.data
}

export const descargarReportePDF = async (): Promise<void> => {
  const response = await api.get('/impacto/mi-impacto/reporte', { responseType: 'blob' })
  const url = URL.createObjectURL(response.data)
  const a = document.createElement('a')
  a.href = url
  a.download = 'reporte-impacto.pdf'
  a.click()
  URL.revokeObjectURL(url)
}

export const descargarReportePDFComercio = async (comercioId: string): Promise<void> => {
  const response = await api.get(`/impacto/comercio/${comercioId}/reporte`, { responseType: 'blob' })
  const url = URL.createObjectURL(response.data)
  const a = document.createElement('a')
  a.href = url
  a.download = `reporte-impacto-${comercioId}.pdf`
  a.click()
  URL.revokeObjectURL(url)
}

export const getImpactoComercio = async (comercioId: string): Promise<ImpactoComercioResponse> => {
  const response = await api.get<ImpactoComercioResponse>(`/impacto/comercio/${comercioId}`)
  return response.data
}
