import api from '../../../api/foodLinkApi';
import type { DatosRegistroBeneficiario, BeneficiarioRegistrado } from '../types/beneficiario.types';
import { getMensajeErrorRegistro } from '../../../utils/apiErrors';

export const registrarBeneficiario = async (datos: DatosRegistroBeneficiario): Promise<BeneficiarioRegistrado> => {
  try {
    // Usamos FormData para incluir archivos (multipart/form-data)
    const formData = new FormData();
    
    formData.append('nombre', datos.nombre);
    formData.append('ruc', datos.ruc);
    formData.append('email', datos.correo);
    formData.append('telefono', datos.telefono);
    formData.append('provincia', 'Pichincha');
    formData.append('ciudad', 'Quito');
    formData.append('callePrincipal', datos.direccion);
    formData.append('password', datos.password);
    
    if (datos.archivoDocumento) {
      formData.append('documento', datos.archivoDocumento);
    }

    const response = await api.post<BeneficiarioRegistrado>('/api/v1/beneficiarios', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al registrar beneficiario:", error);
    throw new Error(getMensajeErrorRegistro(error));
  }
};