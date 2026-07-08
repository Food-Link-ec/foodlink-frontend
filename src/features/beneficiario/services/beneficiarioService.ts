import api from '../../../api/foodLinkApi';
import type{ DatosRegistroBeneficiario } from '../types/beneficiario.types';
import { getMensajeErrorRegistro } from '../../../utils/apiErrors';

export const registrarBeneficiario = async (datosFormulario: DatosRegistroBeneficiario) => {
  try {
    const payload = {
      nombre: datosFormulario.nombre,
      ruc: datosFormulario.ruc,
      email: datosFormulario.correo,
      telefono: datosFormulario.telefono,
      provincia: 'Pichincha',
      ciudad: 'Quito',
      callePrincipal: datosFormulario.direccion,
      password: datosFormulario.password,
    };

    const response = await api.post('/api/v1/beneficiarios', payload);
    return response.data;
  } catch (error) {
    console.error("Error al registrar beneficiario:", error);
    throw new Error(getMensajeErrorRegistro(error));
  }
};