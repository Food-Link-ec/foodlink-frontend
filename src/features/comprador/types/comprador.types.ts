export interface DatosRegistroComprador {
  cedula: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  password: string;
  confirmarClave?: string; // Opcional pero necesario para la validación
}

export interface CompradorRegistrado {
  id: string;
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  telefono: string;
}