import api from '../../../api/foodLinkApi';
import type{ DatosRegistroComercio } from '../types/comercio.types';
import { getMensajeErrorRegistro } from '../../../utils/apiErrors';

export const registrarComercio = async (datosFormulario: DatosRegistroComercio) => {
  try {
    const payload = {
      ruc: datosFormulario.ruc,
      nombre: datosFormulario.nombre,
      telefono: datosFormulario.telefono,
      email: datosFormulario.correo,
      provincia: 'Pichincha',
      ciudad: 'Quito',
      callePrincipal: datosFormulario.direccion,
      password: datosFormulario.password,
    };

    const response = await api.post('/api/v1/comercios', payload);
    return response.data;
  } catch (error) {
    console.error("Error al registrar comercio:", error);
    throw new Error(getMensajeErrorRegistro(error));
  }
};