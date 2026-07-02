export interface DatosRegistroComercio {
  nombre: string
  ruc: string
  direccion: string
  telefono: string
  correo: string
}

export interface ComercioApi extends DatosRegistroComercio {
  id: string
  estado: string
}

export interface ComercioRepositorio {
  registrar(comercio: DatosRegistroComercio): Promise<ComercioApi>
}

const API_BASE_URL = import.meta.env?.VITE_API_URL ?? '/api'
const SIMULAR_BACKEND = true // cambiar a false cuando exista POST /api/comercios

export class ComercioApiRepository implements ComercioRepositorio {
  async registrar(comercio: DatosRegistroComercio): Promise<ComercioApi> {
    if (SIMULAR_BACKEND) return this.simularRegistro(comercio)

    const respuesta = await fetch(`${API_BASE_URL}/comercios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comercio),
    })

    if (!respuesta.ok) {
      const cuerpo = await respuesta.json().catch(() => ({}))
      throw new Error(cuerpo.mensaje || 'No se pudo registrar el comercio. Intenta nuevamente.')
    }
    return respuesta.json()
  }

  private async simularRegistro(comercio: DatosRegistroComercio): Promise<ComercioApi> {
    await new Promise((resolve) => setTimeout(resolve, 700))
    return { id: 'com_' + Date.now(), estado: 'PENDIENTE_VERIFICACION', ...comercio }
  }
}