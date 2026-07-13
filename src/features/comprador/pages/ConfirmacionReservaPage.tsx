import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import QRCode from 'react-qr-code'
import CompradorLayout from '../components/CompradorLayout'
import { generarPin } from '../../lotes/services/retiroService'
import type { PinRetiroResponse } from '../../lotes/services/retiroService'
import type { LoteResponse } from '../../lotes/types/lote.types'
import styles from './ConfirmacionReservaPage.module.css'

interface LocationState {
  lote: LoteResponse
}

const MODALIDAD_LABEL: Record<string, string> = {
  VENTA: 'Venta',
  DONACION: 'Donación',
  RETIRO_DIRECTO: 'Retiro',
}

export default function ConfirmacionReservaPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as LocationState | null
  const [copiado, setCopiado] = useState(false)
  const [pinData, setPinData] = useState<PinRetiroResponse | null>(null)
  const [errorPin, setErrorPin] = useState<string | null>(null)
  const [cargandoPin, setCargandoPin] = useState(true)

  useEffect(() => {
    if (!state?.lote) {
      navigate('/dashboard/comprador', { replace: true })
      return
    }
    let cancelado = false
    generarPin(state.lote.id)
      .then((data) => { if (!cancelado) setPinData(data) })
      .catch(() => { if (!cancelado) setErrorPin('No se pudo generar el PIN de retiro. Podrás generarlo luego desde "Mis pedidos".') })
      .finally(() => { if (!cancelado) setCargandoPin(false) })
    return () => { cancelado = true }
  }, [state, navigate])

  if (!state?.lote) return null

  const { lote } = state
  const gratis = lote.modalidad === 'DONACION' || !lote.precioReducido
  const total = gratis ? 0 : lote.precioReducido!
  const ahorroTotal = lote.precioNormal && lote.precioReducido ? lote.precioNormal - lote.precioReducido : 0

  const copiarCodigo = () => {
    if (!pinData) return
    navigator.clipboard.writeText(pinData.pin)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <CompradorLayout>
      <div className={styles.page}>

        {/* BREADCRUMB */}
        <nav className={styles.breadcrumb}>
          <Link to="/dashboard/comprador" className={styles.breadLink}>Explorar</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          <span className={styles.breadActual}>Confirmación</span>
        </nav>

        <div className={styles.grid}>

          {/* ── COLUMNA IZQUIERDA ── */}
          <div className={styles.colLeft}>

            {/* Banner de éxito */}
            <div className={styles.exitoBanner}>
              <div className={styles.exitoIconWrap}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div>
                <h1 className={styles.exitoTitulo}>¡Tu reserva está confirmada!</h1>
                <p className={styles.exitoSub}>
                  {lote.modalidad === 'DONACION'
                    ? 'Gracias por apoyar el rescate de alimentos en Quito.'
                    : `Has rescatado ${lote.cantidadKg} kg y ahorrado $${ahorroTotal.toFixed(2)} en este pedido.`
                  }
                </p>
              </div>
            </div>

            {/* Card del lote reservado */}
            <div className={styles.loteCard}>
              {lote.fotosUrl?.[0] && <img src={lote.fotosUrl[0]} alt={lote.descripcion} className={styles.loteImg} />}
              <div className={styles.loteInfo}>
                {lote.categoriaProducto && <span className={styles.loteCat}>{lote.categoriaProducto}</span>}
                <h2 className={styles.loteNombre}>{lote.descripcion}</h2>
                <div className={styles.loteTags}>
                  <span className={styles.loteTag}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                    {lote.cantidadKg} kg
                  </span>
                  <span className={styles.loteTag}>{MODALIDAD_LABEL[lote.modalidad] ?? lote.modalidad}</span>
                </div>
              </div>
            </div>

            {/* Instrucciones de retiro */}
            <div className={styles.instruccionesCard}>
              <h3 className={styles.instrucTitulo}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Cómo retirar tu lote
              </h3>
              <ol className={styles.pasosList}>
                <li className={styles.paso}>
                  <span className={styles.pasoNum}>1</span>
                  <div>
                    <strong>Dirígete al comercio antes de la fecha de caducidad</strong>
                    <p>Coordina el retiro con el comercio a través de la app.</p>
                  </div>
                </li>
                <li className={styles.paso}>
                  <span className={styles.pasoNum}>2</span>
                  <div>
                    <strong>Muestra tu código QR o PIN</strong>
                    <p>El personal validará tu PIN en el sistema y entregará el lote.</p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Acciones */}
            <div className={styles.acciones}>
              <button className={styles.btnSecundario} onClick={() => navigate('/dashboard/comprador')}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                Explorar más lotes
              </button>
              <button className={styles.btnSecundario} onClick={() => navigate('/dashboard/comprador/pedidos')}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                Ver mis pedidos
              </button>
            </div>
          </div>

          {/* ── COLUMNA DERECHA ── */}
          <div className={styles.colRight}>

            {/* QR Card */}
            <div className={styles.qrCard}>
              <div className={styles.qrHeader}>
                <span className={styles.qrEyebrow}>PIN de Retiro</span>
              </div>

              {cargandoPin && <p className={styles.qrNota}>Generando PIN…</p>}
              {errorPin && <p className={styles.qrNota} style={{ color: '#B3452C' }}>{errorPin}</p>}

              {pinData && (
                <>
                  <div className={styles.qrWrap}>
                    <QRCode value={pinData.qrData} size={200} style={{ width: '100%', height: 'auto', maxWidth: 200 }} />
                  </div>

                  <div className={styles.codigoWrap}>
                    <span className={styles.codigoText}>{pinData.pin}</span>
                    <button
                      className={`${styles.copiBtn} ${copiado ? styles.copiBtnOk : ''}`}
                      onClick={copiarCodigo}
                    >
                      {copiado ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                      )}
                      {copiado ? 'Copiado' : 'Copiar'}
                    </button>
                  </div>
                  <p className={styles.qrNota}>
                    Válido hasta: {new Date(pinData.expiraEn).toLocaleString('es-EC')}
                  </p>
                </>
              )}
            </div>

            {/* Detalles de pago */}
            <div className={styles.pagoCard}>
              <h3 className={styles.pagoTitulo}>Detalle</h3>

              <div className={styles.pagoLineas}>
                <div className={styles.pagoLinea}>
                  <span>{lote.descripcion}</span>
                  <span>{gratis ? 'Gratis' : `$${total.toFixed(2)}`}</span>
                </div>
                {ahorroTotal > 0 && (
                  <div className={styles.pagoLinea}>
                    <span className={styles.pagoAhorroLabel}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                      Tu ahorro
                    </span>
                    <span className={styles.pagoAhorroVal}>-${ahorroTotal.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className={styles.pagoTotal}>
                <span>Total</span>
                <strong>{gratis ? '$0.00' : `$${total.toFixed(2)}`}</strong>
              </div>

              {!gratis && (
                <div className={styles.metodoPago}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                  <span>Pago en efectivo al retirar</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </CompradorLayout>
  )
}
