import api from '../../../api/foodLinkApi'

// El backend NO trata confianzaFecha/fuenteOcr como enums reales (son String en
// el DTO). El camino normal (ServicioIAAdapter) devuelve minúsculas libres del
// propio LLM: "alta"/"media"/"baja", "tesseract"/"gemini"/"ninguna", o null.
// El camino de excepción (IaController catch) en cambio devuelve "NO_DETECTADA"/
// "NINGUNO" en mayúsculas. Por eso aquí se tipa como string | null y no como
// unión literal — normaliza con .toUpperCase() antes de comparar en la UI.
export interface SugerenciaPublicacion {
  fechaCaducidadSugerida: string | null
  categoriaProductoSugerida: string | null
  descripcionSugerida: string | null
  confianzaFecha: string | null
  fuenteOcr: string | null
  instruccion: string
}

export const sugerirPublicacion = async (imagen: File): Promise<SugerenciaPublicacion> => {
  const formData = new FormData()
  formData.append('imagen', imagen)
  const response = await api.post<SugerenciaPublicacion>('/ia/sugerir-publicacion', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export interface AnalisisImagen {
  fechaDetectada: string | null
  categoriaProducto: string | null
  descripcionSugerida: string | null
  confianzaFecha: string | null
  fuenteOcr: string | null
}

export const analizarImagen = async (imagen: File): Promise<AnalisisImagen> => {
  const formData = new FormData()
  formData.append('imagen', imagen)
  const response = await api.post<AnalisisImagen>('/ia/analizar-imagen', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}
