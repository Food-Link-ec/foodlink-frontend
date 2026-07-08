import api from '../../../api/foodLinkApi';
import type{ DatosRegistroComprador } from '../types/comprador.types';
import { getMensajeErrorRegistro } from '../../../utils/apiErrors';

export const registrarComprador = async (datosFormulario: DatosRegistroComprador) => {
  try {
    const response = await api.post('/api/v1/compradores', datosFormulario);
    return response.data;
  } catch (error) {
    console.error("Error al registrar comprador:", error);
    throw new Error(getMensajeErrorRegistro(error));
  }
};