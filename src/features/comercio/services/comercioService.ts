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