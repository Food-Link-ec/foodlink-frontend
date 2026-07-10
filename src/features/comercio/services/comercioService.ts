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

<<<<<<< HEAD
export async function registrarComercio(datos: DatosRegistroComercio): Promise<ComercioRegistrado> {
  if (SIMULAR_BACKEND) return simularRegistro(datos)

  const { confirmarClave, ...payload } = datos

  const respuesta = await fetch(`${API_BASE_URL}/comercios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!respuesta.ok) {
    const cuerpo = await respuesta.json().catch(() => ({}))
    throw new Error(cuerpo.mensaje || 'No se pudo registrar el comercio. Intenta nuevamente.')
  }
  return respuesta.json()
}

async function simularRegistro(datos: DatosRegistroComercio): Promise<ComercioRegistrado> {
  await new Promise((resolve) => setTimeout(resolve, 700))

  if (datos.ruc === '1790012345001') {
    throw new Error('Ya existe un comercio registrado con este RUC.')
  }

  const { clave, confirmarClave, ...resto } = datos
  return { id: 'com_' + Date.now(), estado: 'PENDIENTE_VERIFICACION', ...resto }
}
=======
    const response = await api.post('/api/v1/comercios', payload);
    return response.data;
  } catch (error) {
    console.error("Error al registrar comercio:", error);
    throw new Error(getMensajeErrorRegistro(error));
  }
};
>>>>>>> dev
