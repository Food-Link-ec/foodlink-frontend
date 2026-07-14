export const calcularDescuento = (precioOriginal: number, precioFinal: number): number => {
  if (!precioOriginal || precioOriginal <= precioFinal) return 0;
  return Math.round(((precioOriginal - precioFinal) / precioOriginal) * 100);
};

export const fechaRelativa = (fechaISO: string): string => {
  const hoy = new Date();
  const fecha = new Date(fechaISO);
  hoy.setHours(0, 0, 0, 0);
  fecha.setHours(0, 0, 0, 0);
  const diffDias = Math.round((fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDias < 0) return 'Vencido';
  if (diffDias === 0) return 'Hoy';
  if (diffDias === 1) return 'Mañana';
  if (diffDias <= 7) return `En ${diffDias} días`;
  return fecha.toLocaleDateString('es-EC', { day: 'numeric', month: 'short' });
};
