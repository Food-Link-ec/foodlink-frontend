import api from '../../../api/foodLinkApi';
import type { DatosRegistroComprador, CompradorRegistrado } from '../types/comprador.types';
import { getMensajeErrorRegistro } from '../../../utils/apiErrors';

export const registrarComprador = async (datos: DatosRegistroComprador): Promise<CompradorRegistrado> => {
  try {
    // Excluimos confirmarClave antes de enviar el payload al servidor
    const { confirmarClave, ...payload } = datos;

    const response = await api.post<CompradorRegistrado>('/api/v1/compradores', payload);
    return response.data;
  } catch (error) {
    console.error("Error al registrar comprador:", error);
    throw new Error(getMensajeErrorRegistro(error));
  }
};