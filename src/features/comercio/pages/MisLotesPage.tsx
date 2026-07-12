import { useState } from 'react'
import { Link } from 'react-router-dom'
import ComercioLayout from '../components/ComercioLayout'
import styles from './MisLotesPage.module.css'

const LOTES = [
  { id:'#B-4492-Q', nombre:'Mix Frutas Tropicales', cantidad:'45 kg', modalidad:'Donación', estado:'activo', fecha:'Hoy, 10:30', img:'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=120&q=70', reservas:3 },
  { id:'#B-4488-Q', nombre:'Pan Artesanal Variado', cantidad:'12 kg', modalidad:'Rescate', estado:'reservado', fecha:'Ayer', img:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=120&q=70', reservas:1 },
  { id:'#B-4470-Q', nombre:'Vegetales de Temporada', cantidad:'20 kg', modalidad:'Donación', estado:'entregado', fecha:'10 Jul', img:'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=120&q=70', reservas:0 },
  { id:'#B-4465-Q', nombre:'Lácteos Premium', cantidad:'15 kg', modalidad:'Rescate', estado:'borrador', fecha:'8 Jul', img:'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=120&q=70', reservas:0 },
  { id:'#B-4460-Q', nombre:'Raciones Gourmet', cantidad:'10 raciones', modalidad:'Venta', estado:'activo', fecha:'Hoy, 08:00', img:'https://images.unsplash.com/photo-1547592180-85f173990554?w=120&q=70', reservas:2 },
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
  const lotesFiltrados = LOTES.filter(l => filtro === 'Todos' || l.estado === filtro.toLowerCase())

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
              <span className={styles.pillCnt}>{f === 'Todos' ? LOTES.length : LOTES.filter(l => l.estado === f.toLowerCase()).length}</span>
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {lotesFiltrados.map(l => (
            <div key={l.id} className={styles.card}>
              <div className={styles.cardImgWrap}>
                <img src={l.img} alt={l.nombre} className={styles.cardImg} />
                <span className={`${styles.badge} ${ESTADO_CFG[l.estado].cls}`}>{ESTADO_CFG[l.estado].label}</span>
                {l.reservas > 0 && <span className={styles.reservasBadge}>{l.reservas} reserva{l.reservas > 1 ? 's' : ''}</span>}
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardId}>{l.id}</p>
                <h3 className={styles.cardNombre}>{l.nombre}</h3>
                <div className={styles.cardMeta}>
                  <span><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>{l.cantidad}</span>
                  <span><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>{l.fecha}</span>
                </div>
                <div className={styles.cardFooter}>
                  <span className={`${styles.modalidadBadge} ${styles[`mod_${l.modalidad.toLowerCase()}`]}`}>{l.modalidad}</span>
                  <div className={styles.cardAcciones}>
                    <button className={styles.accionBtn}>Editar</button>
                    <button className={styles.accionBtnDanger}>Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ComercioLayout>
  )
}