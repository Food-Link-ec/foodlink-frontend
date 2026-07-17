import api from '../../../api/foodLinkApi';
import type { DatosRegistroComercio, ComercioRegistrado } from '../types/comercio.types';
import { getMensajeErrorRegistro } from '../../../utils/apiErrors';

export const registrarComercio = async (datos: DatosRegistroComercio): Promise<ComercioRegistrado> => {
  try {
    // Destructuramos para separar el campo que no va al backend
    const { confirmarClave, ...rest } = datos;

    // Mapeo a la estructura esperada por el endpoint
    const payload = {
      ruc: rest.ruc,
      nombre: rest.nombre,
      telefono: rest.telefono,
      email: rest.email, // Ajustado a la nueva interfaz
      provincia: 'Pichincha',
      ciudad: 'Quito',
      callePrincipal: rest.direccion,
      password: rest.password, // Ajustado a la nueva interfaz
    };

    const response = await api.post<ComercioRegistrado>('/comercios', payload);
    return response.data;
  } catch (error) {
    console.error("Error al registrar comercio:", error);
    throw new Error(getMensajeErrorRegistro(error));
  }
};

export interface LoteResumenDto {
  id: string
  nombre: string
  cantidad: string
  hace: string
  estado: string
  fotoUrl: string
}

export interface ReservaUrgentDto {
  loteId: string
  organizacion: string
  producto: string
  hora: string
}

export interface DashboardComercioResponse {
  comercioId: string
  nombreComercio: string
  ingresosMesActual: number
  ingresosMesAnterior: number
  porcentajeCambioIngresos: number
  totalKgRescatados: number
  reservasPendientes: number
  lotesActivos: number
  personasBeneficiadasMes: number
  lotesRecientes: LoteResumenDto[]
  reservasUrgentes: ReservaUrgentDto[]
  co2EvitadoKg: number
  totalLotesEntregados: number
  tituloLogro: string
  descripcionLogro: string
}

export const getMiDashboard = async (): Promise<DashboardComercioResponse> => {
  const response = await api.get<DashboardComercioResponse>('/comercios/mi-dashboard')
  return response.data
}