import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import CompradorLayout from '../components/CompradorLayout'
import { getLoteById } from '../data/lotes'
import styles from './DetalleLotePage.module.css'

export default function DetalleLotePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const lote = getLoteById(id ?? '')
  const [imgActiva, setImgActiva] = useState(0)
  const [cantidad, setCantidad] = useState(1)

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

  const precioTotal = lote.precio * cantidad
  const ahorroTotal = (lote.precioNormal - lote.precio) * cantidad

  const handleReservar = () => {
    navigate(`/dashboard/comprador/confirmacion/${lote.id}`, {
      state: { lote, cantidad, precioTotal }
    })
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
          <span className={styles.breadcrumbCat}>{lote.categoria}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          <span className={styles.breadcrumbActual}>{lote.nombre}</span>
        </nav>

        {/* GRID PRINCIPAL */}
        <div className={styles.mainGrid}>

          {/* ── COLUMNA IZQUIERDA: Imágenes ── */}
          <div className={styles.colImg}>
            <div className={styles.imgPrincipalWrap}>
              <img
                src={lote.imgGaleria[imgActiva]}
                alt={lote.nombre}
                className={styles.imgPrincipal}
              />
              <span className={`${styles.tag} ${styles[`tag_${lote.tagVariant}`]}`}>
                {lote.tagVariant === 'urgente' && <span className={styles.pulse}/>}
                {lote.tag}
              </span>
              {lote.modalidad === 'Donación' && (
                <span className={styles.gratisChip}>GRATIS</span>
              )}
            </div>

            {/* Miniaturas */}
            {lote.imgGaleria.length > 1 && (
              <div className={styles.galeria}>
                {lote.imgGaleria.map((src, i) => (
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

            {/* Info del comercio */}
            <div className={styles.comercioCard}>
              <div className={styles.comercioHeader}>
                <div className={styles.comercioAvatar}>
                  {lote.comercio.charAt(0)}
                </div>
                <div>
                  <p className={styles.comercioNombre}>{lote.comercio}</p>
                  <div className={styles.comercioRating}>
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="12" height="12" viewBox="0 0 24 24"
                        fill={i < Math.floor(lote.calificacion) ? '#F0A93A' : 'none'}
                        stroke="#F0A93A" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    ))}
                    <span className={styles.comercioRatingNum}>{lote.calificacion}</span>
                    <span className={styles.comercioRatingTotal}>({lote.totalReseñas} reseñas)</span>
                  </div>
                </div>
              </div>
              <div className={styles.comercioDatos}>
                <span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {lote.direccionCompleta}
                </span>
                <span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {lote.telefono}
                </span>
              </div>
            </div>
          </div>

          {/* ── COLUMNA DERECHA: Info + Compra ── */}
          <div className={styles.colInfo}>

            {/* Header del lote */}
            <div className={styles.loteHeader}>
              <div className={styles.loteMeta}>
                <span className={styles.loteCategoria}>{lote.categoria}</span>
                <span className={`${styles.loteModalidad} ${styles[`mod_${lote.modalidad.toLowerCase()}`]}`}>
                  {lote.modalidad}
                </span>
              </div>
              <h1 className={styles.loteNombre}>{lote.nombre}</h1>
              <p className={styles.loteDescripcion}>{lote.descripcion}</p>
            </div>

            {/* Datos clave */}
            <div className={styles.datosGrid}>
              <div className={styles.datoItem}>
                <div className={styles.datoIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                </div>
                <div>
                  <span className={styles.datoLabel}>Cantidad</span>
                  <span className={styles.datoVal}>{lote.cantidad}</span>
                </div>
              </div>
              <div className={styles.datoItem}>
                <div className={styles.datoIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <span className={styles.datoLabel}>Caduca</span>
                  <span className={`${styles.datoVal} ${lote.tagVariant === 'urgente' ? styles.datoUrgente : ''}`}>{lote.caduca}</span>
                </div>
              </div>
              <div className={styles.datoItem}>
                <div className={styles.datoIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <div>
                  <span className={styles.datoLabel}>Retiro</span>
                  <span className={styles.datoVal}>{lote.horarioRetiro}</span>
                </div>
              </div>
              <div className={styles.datoItem}>
                <div className={styles.datoIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <span className={styles.datoLabel}>Disponibles</span>
                  <span className={styles.datoVal}>{lote.disponibles} lotes</span>
                </div>
              </div>
            </div>

            {/* Contenido del lote */}
            <div className={styles.contenidoSection}>
              <h3 className={styles.seccionTitulo}>Qué incluye este lote</h3>
              <ul className={styles.contenidoList}>
                {lote.contenido.map((item, i) => (
                  <li key={i} className={styles.contenidoItem}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card de pago */}
            <div className={styles.pagoCard}>
              <div className={styles.pagoPrecios}>
                <div className={styles.pagoLeft}>
                  <span className={styles.pagoAntes}>${lote.precioNormal.toFixed(2)} precio normal</span>
                  <div className={styles.pagoOferta}>
                    {lote.precio === 0
                      ? <span className={styles.pagoGratis}>Gratis</span>
                      : <span className={styles.pagoPrecio}>${lote.precio.toFixed(2)}</span>
                    }
                    <span className={styles.pagoUnidad}>/ lote</span>
                  </div>
                </div>
                <span className={styles.pagoAhorroBadge}>-{lote.ahorro}%</span>
              </div>

              {lote.modalidad === 'Venta' && (
                <div className={styles.cantidadWrap}>
                  <span className={styles.cantidadLabel}>Cantidad</span>
                  <div className={styles.cantidadCtrl}>
                    <button
                      className={styles.cantidadBtn}
                      onClick={() => setCantidad(c => Math.max(1, c - 1))}
                      disabled={cantidad <= 1}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </button>
                    <span className={styles.cantidadNum}>{cantidad}</span>
                    <button
                      className={styles.cantidadBtn}
                      onClick={() => setCantidad(c => Math.min(lote.disponibles, c + 1))}
                      disabled={cantidad >= lote.disponibles}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </button>
                  </div>
                </div>
              )}

              {lote.modalidad === 'Venta' && cantidad > 1 && (
                <div className={styles.pagoResumen}>
                  <span>Total ({cantidad} lotes)</span>
                  <strong>${precioTotal.toFixed(2)}</strong>
                </div>
              )}

              {lote.modalidad === 'Venta' && cantidad > 1 && (
                <div className={styles.pagoAhorroTotal}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                  Ahorras ${ahorroTotal.toFixed(2)} respecto al precio normal
                </div>
              )}

              <button className={styles.btnReservar} onClick={handleReservar}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                {lote.modalidad === 'Donación' ? 'Reservar Donación' : `Reservar y Pagar · $${precioTotal.toFixed(2)}`}
              </button>

              <p className={styles.pagoNota}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Recibirás un código QR para retirar en {lote.comercio}
              </p>
            </div>

            {/* Impacto ambiental */}
            <div className={styles.impactoCard}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
              <div>
                <span className={styles.impactoTitulo}>Tu impacto al reservar</span>
                <span className={styles.impactoSub}>Evitas ~1.2 kg de CO₂ · Rescatas {lote.cantidad} de desperdicio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CompradorLayout>
  )
}