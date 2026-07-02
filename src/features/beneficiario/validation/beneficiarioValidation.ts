import type { Errores } from '../../../hooks/useForm'
import type { DatosRegistroBeneficiario } from '../types/beneficiario.types'
import { esRequerido, esRucEcuadorValido, esTelefonoEcuadorValido } from '../../../utils/validators'

const EXTENSIONES_PERMITIDAS = ['pdf', 'jpg', 'jpeg', 'png']
const TAMANO_MAXIMO_MB = 5

function archivoEsValido(archivo: File): string | null {
  const extension = archivo.name.split('.').pop()?.toLowerCase()
  if (!extension || !EXTENSIONES_PERMITIDAS.includes(extension)) {
    return 'Formato no permitido. Usa PDF, JPG o PNG.'
  }
  if (archivo.size > TAMANO_MAXIMO_MB * 1024 * 1024) {
    return `El archivo supera el tamaño máximo de ${TAMANO_MAXIMO_MB}MB.`
  }
  return null
}

export function validarBeneficiario(values: DatosRegistroBeneficiario): Errores<DatosRegistroBeneficiario> {
  const errores: Errores<DatosRegistroBeneficiario> = {}

  if (!esRequerido(values.nombre)) {
    errores.nombre = 'Ingresa el nombre de la organización.'
  }

  if (!esRequerido(values.ruc)) {
    errores.ruc = 'Ingresa el RUC de la organización.'
  } else if (!esRucEcuadorValido(values.ruc)) {
    errores.ruc = 'El RUC debe tener 13 dígitos y terminar en 001.'
  }

  if (!esRequerido(values.direccion)) {
    errores.direccion = 'Ingresa la dirección de la organización.'
  }

  if (!esRequerido(values.telefono)) {
    errores.telefono = 'Ingresa un teléfono de contacto.'
  } else if (!esTelefonoEcuadorValido(values.telefono)) {
    errores.telefono = 'Formato no válido. Ej: 0991234567.'
  }

  if (!values.archivoDocumento) {
    errores.archivoDocumento = 'Adjunta el documento de validación (PDF o imagen).'
  } else {
    const error = archivoEsValido(values.archivoDocumento)
    if (error) errores.archivoDocumento = error
  }

  return errores
}