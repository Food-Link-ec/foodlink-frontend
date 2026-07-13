import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import CompradorLayout from '../components/CompradorLayout'
import { getLoteById } from '../../lotes/services/loteService'
import { reservarLote } from '../../lotes/services/redistribucionService'
import { getValoracionesComercio } from '../../valoraciones/services/valoracionService'
import type { ResumenValoracionesResponse } from '../../valoraciones/services/valoracionService'
import { getImpactoComercio } from '../../impacto/services/impactoService'
import type { ImpactoComercioResponse } from '../../impacto/services/impactoService'
import type { LoteResponse } from '../../lotes/types/lote.types'
import styles from './DetalleLotePage.module.css'

const EstrellasBadge = ({ promedio, total }: { promedio: number; total: number }) => (
  <div className={styles.comercioRating}>
    <span style={{ color: '#F0A93A', letterSpacing: '1px' }}>
      {'★'.repeat(Math.round(promedio))}{'☆'.repeat(5 - Math.round(promedio))}
    </span>
    <span className={styles.comercioRatingNum}>{promedio.toFixed(1)}</span>
    <span className={styles.comercioRatingTotal}>({total} reseñas)</span>
  </div>
)

const MODALIDAD_LABEL: Record<string, string> = {
  VENTA: 'Venta',
  DONACION: 'Donación',
  RETIRO_DIRECTO: 'Retiro',
}

const formatModalidad = (modalidad: string) => MODALIDAD_LABEL[modalidad] ?? modalidad

const formatFecha = (iso: string) => {
  const fecha = new Date(iso)
  if (Number.isNaN(fecha.getTime())) return iso
  return fecha.toLocaleDateString('es-EC', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })
}

export default function DetalleLotePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [lote, setLote] = useState<LoteResponse | null>(null)
  const [cargando, setCargando] = useState(true)
  const [imgActiva, setImgActiva] = useState(0)
  const [reservando, setReservando] = useState(false)
  const [errorReserva, setErrorReserva] = useState<string | null>(null)
  const [valoraciones, setValoraciones] = useState<ResumenValoracionesResponse | null>(null)
  const [impactoComercio, setImpactoComercio] = useState<ImpactoComercioResponse | null>(null)

  useEffect(() => {
    if (!id) return
    let cancelado = false
    setCargando(true)
    getLoteById(id)
      .then((data) => { if (!cancelado) setLote(data) })
      .catch(() => { if (!cancelado) setLote(null) })
      .finally(() => { if (!cancelado) setCargando(false) })
    return () => { cancelado = true }
  }, [id])

  useEffect(() => {
    if (!lote?.comercioId) return
    let cancelado = false
    getValoracionesComercio(lote.comercioId)
      .then((data) => { if (!cancelado) setValoraciones(data) })
      .catch(() => {})
    getImpactoComercio(lote.comercioId)
      .then((data) => { if (!cancelado) setImpactoComercio(data) })
      .catch(() => {})
    return () => { cancelado = true }
  }, [lote?.comercioId])

  if (cargando) {
    return (
      <CompradorLayout>
        <div className={styles.page}><p>Cargando lote…</p></div>
      </CompradorLayout>
    )
  }

  if (!lote) {
    return (
      <CompradorLayout>
        <div className={styles.noEncontrado}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <h2>Lote no encontrado</h2>
          <p>Este lote ya no está disponible o fue removido.</p>
          <button onClick={() => navigate('/dashboard/comprador')} className={styles.btnVolver}>
            Ver otros lotes
          </button>
        </div>
      </CompradorLayout>
    )
  }

  const gratis = lote.modalidad === 'DONACION' || !lote.precioReducido
  const ahorro = lote.precioNormal && lote.precioReducido
    ? Math.round(100 - (lote.precioReducido / lote.precioNormal) * 100)
    : null
  const galeria = lote.fotosUrl?.length ? lote.fotosUrl : []

  const handleReservar = async () => {
    setErrorReserva(null)
    setReservando(true)
    try {
      const loteReservado = await reservarLote(lote.id)
      navigate(`/dashboard/comprador/confirmacion/${lote.id}`, { state: { lote: loteReservado } })
    } catch (err: any) {
      if (err.response?.status === 409) {
        setErrorReserva('Este lote ya fue reservado por otra persona. Explora otras opciones disponibles.')
      } else {
        setErrorReserva(err.response?.data?.mensaje || 'No se pudo completar la reserva. Intenta nuevamente.')
      }
    } finally {
      setReservando(false)
    }
  }

  return (
    <CompradorLayout>
      <div className={styles.page}>

        {/* BREADCRUMB */}
        <nav className={styles.breadcrumb}>
          <Link to="/dashboard/comprador" className={styles.breadcrumbLink}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            Explorar
          </Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          <span className={styles.breadcrumbCat}>{lote.categoriaProducto ?? 'Lote'}</span>
        </nav>

        {/* GRID PRINCIPAL */}
        <div className={styles.mainGrid}>

          {/* ── COLUMNA IZQUIERDA: Imágenes ── */}
          <div className={styles.colImg}>
            <div className={styles.imgPrincipalWrap}>
              {galeria[imgActiva] && (
                <img src={galeria[imgActiva]} alt={lote.descripcion} className={styles.imgPrincipal} />
              )}
              {gratis && <span className={styles.gratisChip}>GRATIS</span>}
            </div>

            {galeria.length > 1 && (
              <div className={styles.galeria}>
                {galeria.map((src, i) => (
                  <button
                    key={i}
                    className={`${styles.thumb} ${imgActiva === i ? styles.thumbActivo : ''}`}
                    onClick={() => setImgActiva(i)}
                  >
                    <img src={src} alt={`Vista ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}

            {(valoraciones && valoraciones.totalValoraciones > 0) || impactoComercio ? (
              <div className={styles.comercioCard}>
                <div className={styles.comercioHeader}>
                  <div>
                    <p className={styles.comercioNombre}>{impactoComercio?.nombreComercio ?? valoraciones?.nombreComercio}</p>
                    {valoraciones && valoraciones.totalValoraciones > 0 && (
                      <EstrellasBadge promedio={valoraciones.promedioEstrellas} total={valoraciones.totalValoraciones} />
                    )}
                  </div>
                </div>
                {impactoComercio && (
                  <div className={styles.comercioDatos}>
                    <span>{impactoComercio.totalKgRescatados.toFixed(1)} kg rescatados</span>
                    <span>{impactoComercio.tituloLogro}</span>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* ── COLUMNA DERECHA: Info + Reserva ── */}
          <div className={styles.colInfo}>

            <div className={styles.loteHeader}>
              <div className={styles.loteMeta}>
                {lote.categoriaProducto && <span className={styles.loteCategoria}>{lote.categoriaProducto}</span>}
                <span className={styles.loteModalidad}>{formatModalidad(lote.modalidad)}</span>
                <span className={styles.loteModalidad}>{lote.estado}</span>
              </div>
              <h1 className={styles.loteNombre}>{lote.descripcion}</h1>
            </div>

            {/* Datos clave */}
            <div className={styles.datosGrid}>
              <div className={styles.datoItem}>
                <div className={styles.datoIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                </div>
                <div>
                  <span className={styles.datoLabel}>Cantidad</span>
                  <span className={styles.datoVal}>{lote.cantidadKg} kg</span>
                </div>
              </div>
              <div className={styles.datoItem}>
                <div className={styles.datoIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <span className={styles.datoLabel}>Caduca</span>
                  <span className={styles.datoVal}>{formatFecha(lote.fechaCaducidad)}</span>
                </div>
              </div>
            </div>

            {/* Card de reserva */}
            <div className={styles.pagoCard}>
              <div className={styles.pagoPrecios}>
                <div className={styles.pagoLeft}>
                  {lote.precioNormal != null && (
                    <span className={styles.pagoAntes}>${lote.precioNormal.toFixed(2)} precio normal</span>
                  )}
                  <div className={styles.pagoOferta}>
                    {gratis
                      ? <span className={styles.pagoGratis}>Gratis</span>
                      : <span className={styles.pagoPrecio}>${lote.precioReducido!.toFixed(2)}</span>
                    }
                  </div>
                </div>
                {ahorro !== null && <span className={styles.pagoAhorroBadge}>-{ahorro}%</span>}
              </div>

              {errorReserva && (
                <p className={styles.pagoNota} style={{ color: '#B3452C' }}>{errorReserva}</p>
              )}

              <button className={styles.btnReservar} onClick={handleReservar} disabled={reservando || lote.estado !== 'DISPONIBLE'}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                {reservando
                  ? 'Reservando…'
                  : lote.estado !== 'DISPONIBLE'
                    ? 'No disponible'
                    : lote.modalidad === 'DONACION' ? 'Reservar Donación' : `Reservar · $${gratis ? '0.00' : lote.precioReducido!.toFixed(2)}`
                }
              </button>

              <p className={styles.pagoNota}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Al reservar recibirás un PIN y código QR para retirar el lote.
              </p>
            </div>

            <div className={styles.contenidoSection}>
              <h3 className={styles.seccionTitulo}>Descripción</h3>
              <p className={styles.loteDescripcion}>{lote.descripcion}</p>
            </div>
          </div>
        </div>
      </div>
    </CompradorLayout>
  )
}
