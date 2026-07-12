import { useState } from 'react'
import { Link } from 'react-router-dom'
import ComercioLayout from '../components/ComercioLayout'
import styles from './MisLotesPage.module.css'

interface Lote {
  id: string
  nombre: string
  cantidad: string
  unidad: string
  modalidad: string
  estado: string
  fecha: string
  img: string
  reservas: number
  descripcion: string
}

const LOTES: Lote[] = [
  { id:'#B-4492-Q', nombre:'Mix Frutas Tropicales', cantidad:'45', unidad:'kg', modalidad:'Donación', estado:'activo', fecha:'Hoy, 10:30', img:'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=120&q=70', reservas:3, descripcion:'Selección de frutas tropicales de temporada en óptimo estado.' },
  { id:'#B-4488-Q', nombre:'Pan Artesanal Variado', cantidad:'12', unidad:'kg', modalidad:'Rescate', estado:'reservado', fecha:'Ayer', img:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&q=70', reservas:1, descripcion:'Assortment de panes artesanales horneados esta mañana.' },
  { id:'#B-4470-Q', nombre:'Vegetales de Temporada', cantidad:'20', unidad:'kg', modalidad:'Donación', estado:'entregado', fecha:'10 Jul', img:'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=120&q=70', reservas:0, descripcion:'Mix de verduras orgánicas frescas de temporada.' },
  { id:'#B-4465-Q', nombre:'Lácteos Premium', cantidad:'15', unidad:'kg', modalidad:'Rescate', estado:'borrador', fecha:'8 Jul', img:'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=120&q=70', reservas:0, descripcion:'Selección de lácteos artesanales próximos a vencer.' },
  { id:'#B-4460-Q', nombre:'Raciones Gourmet', cantidad:'10', unidad:'raciones', modalidad:'Venta', estado:'activo', fecha:'Hoy, 08:00', img:'https://images.unsplash.com/photo-1547592180-85f173990554?w=120&q=70', reservas:2, descripcion:'Raciones gourmet preparadas hoy con ingredientes frescos.' },
]

const ESTADO_CFG: Record<string, { label: string; cls: string }> = {
  activo:    { label: 'Activo',    cls: styles.badgeActivo },
  reservado: { label: 'Reservado', cls: styles.badgeReservado },
  entregado: { label: 'Entregado', cls: styles.badgeEntregado },
  borrador:  { label: 'Borrador',  cls: styles.badgeBorrador },
}

const FILTROS = ['Todos', 'Activo', 'Reservado', 'Entregado', 'Borrador']

export default function MisLotesPage() {
  const [filtro, setFiltro] = useState('Todos')
  const [editando, setEditando] = useState<Lote | null>(null)
  const [lotes, setLotes] = useState(LOTES)
  const [confirmEliminar, setConfirmEliminar] = useState<string | null>(null)

  const lotesFiltrados = lotes.filter(l =>
    filtro === 'Todos' || l.estado === filtro.toLowerCase()
  )

  const handleGuardarEdicion = () => {
    if (!editando) return
    setLotes(prev => prev.map(l => l.id === editando.id ? editando : l))
    setEditando(null)
  }

  const handleEliminar = (id: string) => {
    setLotes(prev => prev.filter(l => l.id !== id))
    setConfirmEliminar(null)
  }

  return (
    <ComercioLayout>
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.titulo}>Mis Lotes</h1>
            <p className={styles.subtitulo}>Gestiona todos tus lotes publicados en FoodLink.</p>
          </div>
          <Link to="/dashboard/comercio/nuevo-lote" className={styles.btnNuevo}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Nuevo lote
          </Link>
        </div>

        <div className={styles.filtros}>
          {FILTROS.map(f => (
            <button key={f} onClick={() => setFiltro(f)} className={`${styles.pill} ${filtro === f ? styles.pillActivo : ''}`}>
              {f}
              <span className={styles.pillCnt}>
                {f === 'Todos' ? lotes.length : lotes.filter(l => l.estado === f.toLowerCase()).length}
              </span>
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {lotesFiltrados.map(l => (
            <div key={l.id} className={styles.card}>
              <div className={styles.cardImgWrap}>
                <img src={l.img} alt={l.nombre} className={styles.cardImg} />
                <span className={`${styles.badge} ${ESTADO_CFG[l.estado].cls}`}>{ESTADO_CFG[l.estado].label}</span>
                {l.reservas > 0 && (
                  <span className={styles.reservasBadge}>{l.reservas} reserva{l.reservas > 1 ? 's' : ''}</span>
                )}
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardId}>{l.id}</p>
                <h3 className={styles.cardNombre}>{l.nombre}</h3>
                <div className={styles.cardMeta}>
                  <span>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                    {l.cantidad} {l.unidad}
                  </span>
                  <span>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {l.fecha}
                  </span>
                </div>
                <div className={styles.cardFooter}>
                  <span className={`${styles.modalidadBadge} ${styles[`mod_${l.modalidad.toLowerCase()}`]}`}>{l.modalidad}</span>
                  <div className={styles.cardAcciones}>
                    <button className={styles.accionBtn} onClick={() => setEditando({ ...l })}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      Editar
                    </button>
                    <button className={styles.accionBtnDanger} onClick={() => setConfirmEliminar(l.id)}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal editar */}
        {editando && (
          <div className={styles.modalOverlay} onClick={() => setEditando(null)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitulo}>Editar lote</h2>
                <button className={styles.modalClose} onClick={() => setEditando(null)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>

              <div className={styles.modalBody}>
                <img src={editando.img} alt={editando.nombre} className={styles.modalImg} />

                <div className={styles.modalCampo}>
                  <label className={styles.modalLabel}>Nombre del lote</label>
                  <input
                    type="text"
                    value={editando.nombre}
                    onChange={e => setEditando({ ...editando, nombre: e.target.value })}
                    className={styles.modalInput}
                  />
                </div>

                <div className={styles.modalRow}>
                  <div className={styles.modalCampo}>
                    <label className={styles.modalLabel}>Cantidad</label>
                    <input
                      type="number"
                      value={editando.cantidad}
                      onChange={e => setEditando({ ...editando, cantidad: e.target.value })}
                      className={styles.modalInput}
                    />
                  </div>
                  <div className={styles.modalCampo}>
                    <label className={styles.modalLabel}>Unidad</label>
                    <select
                      value={editando.unidad}
                      onChange={e => setEditando({ ...editando, unidad: e.target.value })}
                      className={styles.modalInput}
                    >
                      {['kg', 'g', 'litros', 'unidades', 'raciones', 'cajas'].map(u => (
                        <option key={u}>{u}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.modalCampo}>
                    <label className={styles.modalLabel}>Estado</label>
                    <select
                      value={editando.estado}
                      onChange={e => setEditando({ ...editando, estado: e.target.value })}
                      className={styles.modalInput}
                    >
                      {['activo', 'reservado', 'entregado', 'borrador'].map(e => (
                        <option key={e} value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.modalCampo}>
                  <label className={styles.modalLabel}>Modalidad</label>
                  <div className={styles.modalModalidades}>
                    {['Donación', 'Rescate', 'Venta'].map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setEditando({ ...editando, modalidad: m })}
                        className={`${styles.modalModalidadBtn} ${editando.modalidad === m ? styles.modalModalidadActiva : ''}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.modalCampo}>
                  <label className={styles.modalLabel}>Descripción</label>
                  <textarea
                    value={editando.descripcion}
                    onChange={e => setEditando({ ...editando, descripcion: e.target.value })}
                    className={`${styles.modalInput} ${styles.modalTextarea}`}
                    rows={3}
                  />
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button className={styles.modalBtnGuardar} onClick={handleGuardarEdicion}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Guardar cambios
                </button>
                <button className={styles.modalBtnCancelar} onClick={() => setEditando(null)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmación eliminar */}
        {confirmEliminar && (
          <div className={styles.modalOverlay} onClick={() => setConfirmEliminar(null)}>
            <div className={styles.modalConfirm} onClick={e => e.stopPropagation()}>
              <div className={styles.confirmIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <h3 className={styles.confirmTitulo}>¿Eliminar este lote?</h3>
              <p className={styles.confirmSub}>Esta acción no se puede deshacer. El lote será removido permanentemente.</p>
              <div className={styles.confirmAcciones}>
                <button className={styles.confirmBtnEliminar} onClick={() => handleEliminar(confirmEliminar)}>
                  Sí, eliminar
                </button>
                <button className={styles.confirmBtnCancelar} onClick={() => setConfirmEliminar(null)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ComercioLayout>
  )
}