import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CompradorLayout from '../components/CompradorLayout'
import styles from './MisPedidosPage.module.css'

type EstadoPedido = 'pendiente' | 'listo' | 'retirado' | 'cancelado'

interface Pedido {
  id: string
  codigoReserva: string
  loteNombre: string
  comercio: string
  zona: string
  img: string
  categoria: string
  modalidad: string
  precio: number
  cantidad: number
  fecha: string
  horarioRetiro: string
  estado: EstadoPedido
}

const PEDIDOS: Pedido[] = [
  {
    id: 'p1', codigoReserva: 'FL-8A3K-X2WP',
    loteNombre: 'Pack Panadería Artesanal', comercio: 'Panadería El Trigo', zona: 'La Mariscal',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=75',
    categoria: 'Panadería', modalidad: 'Venta', precio: 3, cantidad: 1,
    fecha: 'Hoy', horarioRetiro: 'Hoy, 18:00 – 20:00', estado: 'pendiente',
  },
  {
    id: 'p2', codigoReserva: 'FL-9BVZ-M4QR',
    loteNombre: 'Lote Lácteos Premium', comercio: 'Delilac Quesería', zona: 'Cumbayá',
    img: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&q=75',
    categoria: 'Lácteos', modalidad: 'Venta', precio: 6, cantidad: 1,
    fecha: 'Ayer', horarioRetiro: 'Ayer, 10:00 – 12:00', estado: 'listo',
  },
  {
    id: 'p3', codigoReserva: 'FL-2TJF-C7YN',
    loteNombre: 'Canasta Frutas Tropicales', comercio: 'La Frutería', zona: 'La Floresta',
    img: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300&q=75',
    categoria: 'Frutas y Verduras', modalidad: 'Venta', precio: 4.50, cantidad: 2,
    fecha: '10 jul', horarioRetiro: '10 jul, 16:00 – 18:00', estado: 'retirado',
  },
  {
    id: 'p4', codigoReserva: 'FL-5HKD-R9PL',
    loteNombre: 'Verduras Orgánicas Mix', comercio: 'Mercado El Labrador', zona: 'Cotocollao',
    img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&q=75',
    categoria: 'Frutas y Verduras', modalidad: 'Donación', precio: 0, cantidad: 1,
    fecha: '8 jul', horarioRetiro: '8 jul, 08:00 – 10:00', estado: 'retirado',
  },
  {
    id: 'p5', codigoReserva: 'FL-1GXM-W6TK',
    loteNombre: '10 Raciones Gourmet', comercio: 'Cocina Contemporánea', zona: 'González Suárez',
    img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=300&q=75',
    categoria: 'Preparados', modalidad: 'Venta', precio: 18, cantidad: 1,
    fecha: '5 jul', horarioRetiro: '5 jul, 19:30 – 21:30', estado: 'cancelado',
  },
]

const ESTADO_CONFIG = {
  pendiente: { label: 'Pendiente de retiro', color: styles.estadoPendiente, dot: '#F0A93A' },
  listo:     { label: 'Listo para retirar', color: styles.estadoListo,     dot: '#22C55E' },
  retirado:  { label: 'Retirado',           color: styles.estadoRetirado,  dot: '#94A3B8' },
  cancelado: { label: 'Cancelado',          color: styles.estadoCancelado, dot: '#EF4444' },
}

const FILTROS = ['Todos', 'Pendiente', 'Listo', 'Retirado', 'Cancelado']

export default function MisPedidosPage() {
  const [filtro, setFiltro] = useState('Todos')
  const [expandido, setExpandido] = useState<string | null>(null)
  const navigate = useNavigate()

  const pedidosFiltrados = PEDIDOS.filter(p => {
    if (filtro === 'Todos') return true
    return p.estado === filtro.toLowerCase()
  })

  const totalGastado = PEDIDOS.filter(p => p.estado === 'retirado' && p.modalidad === 'Venta')
    .reduce((acc, p) => acc + p.precio * p.cantidad, 0)

  const totalRescatado = PEDIDOS.filter(p => p.estado === 'retirado').length

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

        {/* Stats rápidos */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <span className={styles.statNum}>{PEDIDOS.length}</span>
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
            <span className={styles.statNum}>
              {PEDIDOS.filter(p => p.estado === 'pendiente' || p.estado === 'listo').length}
            </span>
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
                {f === 'Todos' ? PEDIDOS.length : PEDIDOS.filter(p => p.estado === f.toLowerCase()).length}
              </span>
            </button>
          ))}
        </div>

        {/* Lista */}
        {pedidosFiltrados.length === 0 ? (
          <div className={styles.vacio}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <p>No tienes pedidos en este estado.</p>
          </div>
        ) : (
          <div className={styles.lista}>
            {pedidosFiltrados.map(pedido => {
              const cfg = ESTADO_CONFIG[pedido.estado]
              const abierto = expandido === pedido.id
              return (
                <div key={pedido.id} className={`${styles.pedidoCard} ${abierto ? styles.pedidoAbierto : ''}`}>
                  <div className={styles.pedidoMain} onClick={() => setExpandido(abierto ? null : pedido.id)}>
                    <img src={pedido.img} alt={pedido.loteNombre} className={styles.pedidoImg} />
                    <div className={styles.pedidoInfo}>
                      <div className={styles.pedidoInfoTop}>
                        <span className={styles.pedidoCat}>{pedido.categoria}</span>
                        <span className={`${styles.pedidoEstado} ${cfg.color}`}>
                          <span className={styles.estadoDot} style={{ background: cfg.dot }}/>
                          {cfg.label}
                        </span>
                      </div>
                      <h3 className={styles.pedidoNombre}>{pedido.loteNombre}</h3>
                      <p className={styles.pedidoCom}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {pedido.comercio} · {pedido.zona}
                      </p>
                    </div>
                    <div className={styles.pedidoMeta}>
                      <span className={styles.pedidoPrecio}>
                        {pedido.modalidad === 'Donación' ? 'Gratis' : `$${(pedido.precio * pedido.cantidad).toFixed(2)}`}
                      </span>
                      <span className={styles.pedidoFecha}>{pedido.fecha}</span>
                      <svg className={`${styles.chevron} ${abierto ? styles.chevronUp : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </div>

                  {/* Detalle expandido */}
                  {abierto && (
                    <div className={styles.pedidoDetalle}>
                      <div className={styles.detalleGrid}>
                        <div className={styles.detalleDato}>
                          <span className={styles.detalleLabel}>Código de reserva</span>
                          <span className={styles.detalleCodigo}>{pedido.codigoReserva}</span>
                        </div>
                        <div className={styles.detalleDato}>
                          <span className={styles.detalleLabel}>Horario de retiro</span>
                          <span className={styles.detalleVal}>{pedido.horarioRetiro}</span>
                        </div>
                        <div className={styles.detalleDato}>
                          <span className={styles.detalleLabel}>Cantidad</span>
                          <span className={styles.detalleVal}>{pedido.cantidad} lote{pedido.cantidad > 1 ? 's' : ''}</span>
                        </div>
                        <div className={styles.detalleDato}>
                          <span className={styles.detalleLabel}>Modalidad</span>
                          <span className={styles.detalleVal}>{pedido.modalidad}</span>
                        </div>
                      </div>
                      {(pedido.estado === 'pendiente' || pedido.estado === 'listo') && (
                        <div className={styles.detalleAcciones}>
                          <button className={styles.btnVerQR}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3"/><path d="M17 17h3v3"/><path d="M14 20h3"/><path d="M20 14h.01"/></svg>
                            Ver código QR
                          </button>
                          <button className={styles.btnCancelar}>Cancelar reserva</button>
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