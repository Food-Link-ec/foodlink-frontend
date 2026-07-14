import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import QRCode from 'react-qr-code'
import CompradorLayout from '../components/CompradorLayout'
import { getMisReservas, cancelarReserva } from '../../lotes/services/redistribucionService'
import { generarPin } from '../../lotes/services/retiroService'
import type { PinRetiroResponse } from '../../lotes/services/retiroService'
import type { LoteResponse } from '../../lotes/types/lote.types'
import styles from './MisPedidosPage.module.css'

const MODALIDAD_LABEL: Record<string, string> = {
  VENTA: 'Venta',
  DONACION: 'Donación',
  RETIRO_DIRECTO: 'Retiro',
}

const CATEGORIA_LABELS: Record<string, string> = {
  FRUTAS_VERDURAS: 'Frutas y Verduras',
  LACTEOS: 'Lácteos',
  PANADERIA: 'Panadería',
  CARNES: 'Carnes',
  ABARROTES: 'Abarrotes',
  COMIDA_PREPARADA: 'Comida Preparada',
  BEBIDAS: 'Bebidas',
}

const formatModalidad = (modalidad: string) => MODALIDAD_LABEL[modalidad] ?? modalidad
const formatCategoria = (categoria: string) => CATEGORIA_LABELS[categoria] ?? categoria

const formatFecha = (iso: string) => {
  const fecha = new Date(iso)
  if (Number.isNaN(fecha.getTime())) return iso
  return fecha.toLocaleDateString('es-EC', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

type FiltroPedido = 'Todos' | 'Pendiente' | 'Listo' | 'Retirado' | 'Cancelado'

const ESTADO_PEDIDO_CFG: Record<string, { label: string; filtro: FiltroPedido; cls: string; dot: string }> = {
  RESERVADO: { label: 'Pendiente de retiro', filtro: 'Pendiente', cls: styles.estadoPendiente, dot: '#F0A93A' },
  VENDIDO: { label: 'Listo para retirar', filtro: 'Listo', cls: styles.estadoListo, dot: '#22C55E' },
  DONADO: { label: 'Listo para retirar', filtro: 'Listo', cls: styles.estadoListo, dot: '#22C55E' },
  ENTREGADO: { label: 'Retirado', filtro: 'Retirado', cls: styles.estadoRetirado, dot: '#94A3B8' },
  EXPIRADO: { label: 'Cancelado', filtro: 'Cancelado', cls: styles.estadoCancelado, dot: '#EF4444' },
}

const cfgFor = (estado: string) =>
  ESTADO_PEDIDO_CFG[estado] ?? { label: estado, filtro: 'Pendiente' as FiltroPedido, cls: styles.estadoPendiente, dot: '#F0A93A' }

const FILTROS: FiltroPedido[] = ['Todos', 'Pendiente', 'Listo', 'Retirado', 'Cancelado']

export default function MisPedidosPage() {
  const [pedidos, setPedidos] = useState<LoteResponse[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtro, setFiltro] = useState<FiltroPedido>('Todos')
  const [expandido, setExpandido] = useState<string | null>(null)
  const [pines, setPines] = useState<Record<string, PinRetiroResponse>>({})
  const [cargandoPin, setCargandoPin] = useState<string | null>(null)
  const [cancelando, setCancelando] = useState<string | null>(null)
  const navigate = useNavigate()

  const cargarPedidos = () => {
    setCargando(true)
    setError(null)
    getMisReservas()
      .then(setPedidos)
      .catch(() => setError('No se pudo cargar tu historial de pedidos.'))
      .finally(() => setCargando(false))
  }

  useEffect(() => { cargarPedidos() }, [])

  const pedidosFiltrados = pedidos.filter(p => filtro === 'Todos' || cfgFor(p.estado).filtro === filtro)

  const totalRescatado = pedidos.filter(p => p.estado === 'ENTREGADO').length

  const totalGastado = pedidos
    .filter(p => p.estado === 'ENTREGADO' && p.modalidad === 'VENTA' && p.precioReducido)
    .reduce((acc, p) => acc + (p.precioReducido ?? 0), 0)

  const pendientesDeRetiro = pedidos.filter(p => {
    const f = cfgFor(p.estado).filtro
    return f === 'Pendiente' || f === 'Listo'
  }).length

  const verQR = async (loteId: string) => {
    if (pines[loteId]) return
    setCargandoPin(loteId)
    try {
      const pin = await generarPin(loteId)
      setPines(prev => ({ ...prev, [loteId]: pin }))
    } catch {
      setError('No se pudo generar el código de retiro. Intenta nuevamente.')
    } finally {
      setCargandoPin(null)
    }
  }

  const cancelar = async (loteId: string) => {
    setCancelando(loteId)
    try {
      await cancelarReserva(loteId)
      cargarPedidos()
    } catch {
      setError('No se pudo cancelar la reserva.')
    } finally {
      setCancelando(null)
    }
  }

  return (
    <CompradorLayout>
      <div className={styles.page}>

        {/* Header */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.titulo}>Mis Pedidos</h1>
            <p className={styles.subtitulo}>Historial completo de tus reservas y retiros en FoodLink.</p>
          </div>
          <button className={styles.btnExplorar} onClick={() => navigate('/dashboard/comprador')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            Explorar más lotes
          </button>
        </div>

        {error && <p className={styles.subtitulo} style={{ color: '#B3452C' }}>{error}</p>}

        {/* Stats rápidos */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <span className={styles.statNum}>{pedidos.length}</span>
            <span className={styles.statLabel}>Pedidos totales</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNum}>{totalRescatado}</span>
            <span className={styles.statLabel}>Lotes retirados</span>
          </div>
          <div className={styles.statCard}>
            <span className={`${styles.statNum} ${styles.statNumVerde}`}>${totalGastado.toFixed(2)}</span>
            <span className={styles.statLabel}>Total invertido</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNum}>{pendientesDeRetiro}</span>
            <span className={styles.statLabel}>Pendientes de retiro</span>
          </div>
        </div>

        {/* Filtros */}
        <div className={styles.filtros}>
          {FILTROS.map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`${styles.filtroPill} ${filtro === f ? styles.filtroActivo : ''}`}
            >
              {f}
              <span className={styles.filtroCnt}>
                {f === 'Todos' ? pedidos.length : pedidos.filter(p => cfgFor(p.estado).filtro === f).length}
              </span>
            </button>
          ))}
        </div>

        {/* Lista */}
        {cargando ? (
          <p className={styles.subtitulo}>Cargando pedidos…</p>
        ) : pedidosFiltrados.length === 0 ? (
          <div className={styles.vacio}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <p>No tienes pedidos en este estado.</p>
          </div>
        ) : (
          <div className={styles.lista}>
            {pedidosFiltrados.map(pedido => {
              const cfg = cfgFor(pedido.estado)
              const abierto = expandido === pedido.id
              const gratis = pedido.modalidad === 'DONACION' || !pedido.precioReducido
              const pin = pines[pedido.id]
              const puedeCancelar = cfg.filtro === 'Pendiente'
              const puedeVerQR = cfg.filtro === 'Pendiente' || cfg.filtro === 'Listo'
              return (
                <div key={pedido.id} className={`${styles.pedidoCard} ${abierto ? styles.pedidoAbierto : ''}`}>
                  <div className={styles.pedidoMain} onClick={() => setExpandido(abierto ? null : pedido.id)}>
                    {pedido.fotosUrl?.[0] && (
                      <img src={pedido.fotosUrl[0]} alt={pedido.descripcion} className={styles.pedidoImg} />
                    )}
                    <div className={styles.pedidoInfo}>
                      <div className={styles.pedidoInfoTop}>
                        {pedido.categoriaProducto && <span className={styles.pedidoCat}>{formatCategoria(pedido.categoriaProducto)}</span>}
                        <span className={`${styles.pedidoEstado} ${cfg.cls}`}>
                          <span className={styles.estadoDot} style={{ background: cfg.dot }}/>
                          {cfg.label}
                        </span>
                      </div>
                      <h3 className={styles.pedidoNombre}>{pedido.descripcion}</h3>
                    </div>
                    <div className={styles.pedidoMeta}>
                      <span className={styles.pedidoPrecio}>
                        {gratis ? 'Gratis' : `$${pedido.precioReducido!.toFixed(2)}`}
                      </span>
                      <span className={styles.pedidoFecha}>{formatFecha(pedido.fechaCaducidad)}</span>
                      <svg className={`${styles.chevron} ${abierto ? styles.chevronUp : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </div>

                  {/* Detalle expandido */}
                  {abierto && (
                    <div className={styles.pedidoDetalle}>
                      <div className={styles.detalleGrid}>
                        <div className={styles.detalleDato}>
                          <span className={styles.detalleLabel}>Cantidad</span>
                          <span className={styles.detalleVal}>{pedido.cantidadKg} kg</span>
                        </div>
                        <div className={styles.detalleDato}>
                          <span className={styles.detalleLabel}>Modalidad</span>
                          <span className={styles.detalleVal}>{formatModalidad(pedido.modalidad)}</span>
                        </div>
                        <div className={styles.detalleDato}>
                          <span className={styles.detalleLabel}>Fecha de caducidad</span>
                          <span className={styles.detalleVal}>{formatFecha(pedido.fechaCaducidad)}</span>
                        </div>
                        {pin && (
                          <div className={styles.detalleDato}>
                            <span className={styles.detalleLabel}>Código de retiro</span>
                            <span className={styles.detalleCodigo}>{pin.pin}</span>
                          </div>
                        )}
                      </div>

                      {pin && (
                        <div style={{ margin: '0.75rem 0' }}>
                          <QRCode value={pin.qrData} size={140} style={{ width: 140, height: 140 }} />
                        </div>
                      )}

                      {(puedeCancelar || puedeVerQR) && (
                        <div className={styles.detalleAcciones}>
                          {puedeVerQR && (
                            <button className={styles.btnVerQR} onClick={() => verQR(pedido.id)} disabled={cargandoPin === pedido.id || !!pin}>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3"/><path d="M17 17h3v3"/><path d="M14 20h3"/><path d="M20 14h.01"/></svg>
                              {cargandoPin === pedido.id ? 'Generando…' : pin ? 'Código generado' : 'Ver código QR'}
                            </button>
                          )}
                          {puedeCancelar && (
                            <button className={styles.btnCancelar} onClick={() => cancelar(pedido.id)} disabled={cancelando === pedido.id}>
                              {cancelando === pedido.id ? 'Cancelando…' : 'Cancelar reserva'}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </CompradorLayout>
  )
}
