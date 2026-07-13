import api from '../../../api/foodLinkApi'

export interface ComercioResponse {
  id: string
  ruc: string
  nombre: string
  telefono: string
  email: string
  estado: string
  fechaRegistro: string
}

export interface BeneficiarioResponse {
  id: string
  nombre: string
  ruc: string
  email: string
  estadoVerificacion: string
  fechaRegistro: string
}

export interface AnalyticsDashboardResponse {
  totalComerciosRegistrados: number
  totalComerciosVerificados: number
  totalBeneficiariosVerificados: number
  totalCompradoresActivos: number
  totalLotesPublicados: number
  totalLotesDisponibles: number
  totalLotesReservados: number
  totalLotesEntregados: number
  totalLotesExpirados: number
  totalKgRescatados: number
  totalCo2EvitadoKg: number
  totalPersonasBeneficiadas: number
  totalLotesEntregadosMesActual: number
  kgRescatadosMesActual: number
  top5Comercios: Array<{ comercioId: string; nombreComercio: string; lotesEntregados: number; kgRescatados: number }>
}

export const getComerciosPendientes = async (): Promise<ComercioResponse[]> => {
  const response = await api.get<ComercioResponse[]>('/admin/comercios/pendientes')
  return response.data
}

export const getTodosLosComercios = async (): Promise<ComercioResponse[]> => {
  const response = await api.get<ComercioResponse[]>('/admin/comercios')
  return response.data
}

export const verificarComercio = async (id: string): Promise<ComercioResponse> => {
  const response = await api.post<ComercioResponse>(`/admin/comercios/${id}/verificar`)
  return response.data
}

export const rechazarComercio = async (id: string): Promise<ComercioResponse> => {
  const response = await api.post<ComercioResponse>(`/admin/comercios/${id}/rechazar`)
  return response.data
}

export const suspenderComercio = async (id: string): Promise<ComercioResponse> => {
  const response = await api.post<ComercioResponse>(`/admin/comercios/${id}/suspender`)
  return response.data
}

export const getBeneficiariosPendientes = async (): Promise<BeneficiarioResponse[]> => {
  const response = await api.get<BeneficiarioResponse[]>('/admin/beneficiarios/pendientes')
  return response.data
}

export const getTodosLosBeneficiarios = async (): Promise<BeneficiarioResponse[]> => {
  const response = await api.get<BeneficiarioResponse[]>('/admin/beneficiarios')
  return response.data
}

export const verificarBeneficiario = async (id: string): Promise<BeneficiarioResponse> => {
  const response = await api.post<BeneficiarioResponse>(`/admin/beneficiarios/${id}/verificar`)
  return response.data
}

export const rechazarBeneficiario = async (id: string): Promise<BeneficiarioResponse> => {
  const response = await api.post<BeneficiarioResponse>(`/admin/beneficiarios/${id}/rechazar`)
  return response.data
}

export const getAnalytics = async (): Promise<AnalyticsDashboardResponse> => {
  const response = await api.get<AnalyticsDashboardResponse>('/admin/analytics')
  return response.data
}
