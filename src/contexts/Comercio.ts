export type EstadoComercio = 'PENDIENTE_VERIFICACION' | 'VERIFICADO' | 'RECHAZADO'

export interface ComercioProps {
  id: string
  nombre: string
  ruc: string
  direccion: string
  telefono: string
  correo: string
  estado?: EstadoComercio
}

/** Entidad Comercio — Bounded Context: Establecimientos. */
export class Comercio {
  readonly id: string
  readonly nombre: string
  readonly ruc: string
  readonly direccion: string
  readonly telefono: string
  readonly correo: string
  readonly estado: EstadoComercio

  constructor({ id, nombre, ruc, direccion, telefono, correo, estado = 'PENDIENTE_VERIFICACION' }: ComercioProps) {
    this.id = id
    this.nombre = nombre
    this.ruc = ruc
    this.direccion = direccion
    this.telefono = telefono
    this.correo = correo
    this.estado = estado
  }

  static desdeRespuestaApi(data: ComercioProps): Comercio {
    return new Comercio(data)
  }
}