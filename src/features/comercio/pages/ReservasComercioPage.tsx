import { useEffect, useState } from 'react'
import ComercioLayout from '../components/ComercioLayout'
import { getMisLotes } from '../../perfil/services/perfilService'
import { confirmarVenta, confirmarDonacion } from '../../lotes/services/redistribucionService'
import { validarPin } from '../../lotes/services/retiroService'
import type { LoteResponse } from '../../lotes/types/lote.types'
import styles from './ReservasComercioPage.module.css'

const MODALIDAD_LABEL: Record<string, string> = {
  VENTA: 'Venta',
  DONACION: 'Donación',
  RETIRO_DIRECTO: 'Retiro',
}

export default function ReservasComercioPage() {
  const [lotes, setLotes] = useState<LoteResponse[]>([])
  const [cargando, setCargando] = useState(true)
  const [confirmandoId, setConfirmandoId] = useState<string | null>(null)
  const [errorPorLote, setErrorPorLote] = useState<Record<string, string>>({})
  const [pinPorLote, setPinPorLote] = useState<Record<string, string>>({})
  const [validandoId, setValidandoId] = useState<string | null>(null)
  const [mensajePorLote, setMensajePorLote] = useState<Record<string, string>>({})

  const cargarLotes = () => {
    setCargando(true)
    getMisLotes()
      .then(setLotes)
      .catch(() => setLotes([]))
      .finally(() => setCargando(false))
  }

  useEffect(() => {
    cargarLotes()
  }, [])

  const reservas = lotes.filter((l) => l.estado === 'RESERVADO')
  const pendientesDeRetiro = lotes.filter((l) => l.estado === 'VENDIDO' || l.estado === 'DONADO')

  const handleConfirmar = async (lote: LoteResponse) => {
    if (!lote.beneficiarioReservaId) {
      setErrorPorLote((prev) => ({ ...prev, [lote.id]: 'Este lote no tiene un usuario de reserva asociado.' }))
      return
    }
    setConfirmandoId(lote.id)
    setErrorPorLote((prev) => { const copy = { ...prev }; delete copy[lote.id]; return copy })
    try {
      if (lote.modalidad === 'DONACION') {
        await confirmarDonacion(lote.id, lote.beneficiarioReservaId)
      } else {
        await confirmarVenta(lote.id, lote.beneficiarioReservaId)
      }
      cargarLotes()
    } catch (err: any) {
      setErrorPorLote((prev) => ({
        ...prev,
        [lote.id]: err.response?.data?.mensaje || 'No se pudo confirmar la transacción.',
      }))
    } finally {
      setConfirmandoId(null)
    }
  }

  const handleValidarPin = async (loteId: string) => {
    const pin = (pinPorLote[loteId] || '').trim()
    if (!pin) return
    setValidandoId(loteId)
    setMensajePorLote((prev) => { const copy = { ...prev }; delete copy[loteId]; return copy })
    try {
      await validarPin(loteId, pin)
      setMensajePorLote((prev) => ({ ...prev, [loteId]: '✅ Retiro confirmado exitosamente' }))
      cargarLotes()
    } catch (err: any) {
      const mensaje = err.response?.status === 400
        ? 'PIN incorrecto o expirado. Verifica e intenta de nuevo.'
        : err.response?.data?.mensaje || 'No se pudo validar el PIN.'
      setMensajePorLote((prev) => ({ ...prev, [loteId]: mensaje }))
    } finally {
      setValidandoId(null)
    }
  }

  return (
    <ComercioLayout>
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.titulo}>Reservas</h1>
            <p className={styles.subtitulo}>Confirma la venta o donación de los lotes reservados para generar el PIN de retiro.</p>
          </div>
        </div>

        {cargando && <p className={styles.subtitulo}>Cargando reservas…</p>}

        {!cargando && reservas.length === 0 && (
          <p className={styles.subtitulo}>No tienes lotes reservados pendientes de confirmar.</p>
        )}

        <div className={styles.lista}>
          {reservas.map((lote) => (
            <div key={lote.id} className={styles.cardWrap}>
              <div className={styles.card}>
                <div className={styles.cardAvatar}>{(lote.categoriaProducto ?? 'L').charAt(0)}</div>
                <div className={styles.cardInfo}>
                  <div className={styles.cardTop}>
                    <div>
                      <h3 className={styles.cardOrg}>{lote.descripcion}</h3>
                    </div>
                    <span className={styles.badge}>{MODALIDAD_LABEL[lote.modalidad] ?? lote.modalidad}</span>
                  </div>
                  <p className={styles.cardProd}>{lote.cantidadKg} kg</p>
                  {errorPorLote[lote.id] && (
                    <p className={styles.cardMeta} style={{ color: '#B3452C' }}>{errorPorLote[lote.id]}</p>
                  )}
                </div>
                <div className={styles.cardAcciones}>
                  <button
                    className={styles.btnConfirmar}
                    disabled={confirmandoId === lote.id}
                    onClick={() => handleConfirmar(lote)}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    {confirmandoId === lote.id ? 'Confirmando…' : lote.modalidad === 'DONACION' ? 'Confirmar donación' : 'Confirmar venta'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pendientes de retiro: venta/donación ya confirmada, falta validar el PIN físico */}
        {pendientesDeRetiro.length > 0 && (
          <>
            <div className={styles.pageHeader} style={{ marginTop: '2rem' }}>
              <div>
                <h2 className={styles.titulo} style={{ fontSize: '1.25rem' }}>Pendientes de retiro</h2>
                <p className={styles.subtitulo}>Ingresa el PIN que muestra el cliente para confirmar la entrega física.</p>
              </div>
            </div>

            <div className={styles.lista}>
              {pendientesDeRetiro.map((lote) => (
                <div key={lote.id} className={styles.cardWrap}>
                  <div className={styles.card}>
                    <div className={styles.cardAvatar}>{(lote.categoriaProducto ?? 'L').charAt(0)}</div>
                    <div className={styles.cardInfo}>
                      <div className={styles.cardTop}>
                        <div>
                          <h3 className={styles.cardOrg}>{lote.descripcion}</h3>
                        </div>
                        <span className={styles.badge}>{lote.estado}</span>
                      </div>
                      <p className={styles.cardProd}>{lote.cantidadKg} kg</p>
                      {mensajePorLote[lote.id] && (
                        <p className={styles.cardMeta} style={{ color: mensajePorLote[lote.id].startsWith('✅') ? '#1F4D3C' : '#B3452C' }}>
                          {mensajePorLote[lote.id]}
                        </p>
                      )}
                    </div>
                    <div className={styles.cardAcciones}>
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="PIN"
                        value={pinPorLote[lote.id] || ''}
                        onChange={(e) => setPinPorLote((prev) => ({ ...prev, [lote.id]: e.target.value.toUpperCase() }))}
                        className={styles.codigoTexto}
                        style={{ width: '5rem', textAlign: 'center' }}
                      />
                      <button
                        className={styles.btnConfirmar}
                        disabled={validandoId === lote.id}
                        onClick={() => handleValidarPin(lote.id)}
                      >
                        {validandoId === lote.id ? 'Validando…' : 'Validar PIN'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </ComercioLayout>
  )
}
