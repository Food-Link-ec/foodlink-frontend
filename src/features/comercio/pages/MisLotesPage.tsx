import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ComercioLayout from '../components/ComercioLayout'
import { getMisLotes } from '../../perfil/services/perfilService'
import type { LoteResponse } from '../../lotes/types/lote.types'
import styles from './MisLotesPage.module.css'

const MODALIDAD_LABEL: Record<string, string> = {
  VENTA: 'Venta',
  DONACION: 'Donación',
  RETIRO_DIRECTO: 'Retiro',
}

const ESTADO_CFG: Record<string, { label: string; cls: string }> = {
  DISPONIBLE: { label: 'Disponible', cls: styles.badgeActivo },
  RESERVADO: { label: 'Reservado', cls: styles.badgeReservado },
  VENDIDO: { label: 'Vendido', cls: styles.badgeReservado },
  DONADO: { label: 'Donado', cls: styles.badgeReservado },
  ENTREGADO: { label: 'Entregado', cls: styles.badgeEntregado },
  EXPIRADO: { label: 'Expirado', cls: styles.badgeBorrador },
}

const FILTROS = ['Todos', 'DISPONIBLE', 'RESERVADO', 'VENDIDO', 'DONADO', 'ENTREGADO', 'EXPIRADO']

export default function MisLotesPage() {
  const [filtro, setFiltro] = useState('Todos')
  const [lotes, setLotes] = useState<LoteResponse[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    setCargando(true)
    getMisLotes(filtro === 'Todos' ? undefined : filtro)
      .then(setLotes)
      .catch(() => setLotes([]))
      .finally(() => setCargando(false))
  }, [filtro])

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
              {f === 'Todos' ? 'Todos' : ESTADO_CFG[f]?.label ?? f}
            </button>
          ))}
        </div>

        {cargando && <p className={styles.subtitulo}>Cargando lotes…</p>}
        {!cargando && lotes.length === 0 && (
          <p className={styles.subtitulo}>No tienes lotes en este estado.</p>
        )}

        <div className={styles.grid}>
          {lotes.map(l => (
            <div key={l.id} className={styles.card}>
              <div className={styles.cardImgWrap}>
                {l.fotosUrl?.[0] && <img src={l.fotosUrl[0]} alt={l.descripcion} className={styles.cardImg} />}
                <span className={`${styles.badge} ${ESTADO_CFG[l.estado]?.cls ?? ''}`}>{ESTADO_CFG[l.estado]?.label ?? l.estado}</span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardNombre}>{l.descripcion}</h3>
                <div className={styles.cardMeta}>
                  <span>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                    {l.cantidadKg} kg
                  </span>
                  {l.categoriaProducto && <span>{l.categoriaProducto}</span>}
                </div>
                <div className={styles.cardFooter}>
                  <span className={`${styles.modalidadBadge} ${styles[`mod_${l.modalidad.toLowerCase()}`] ?? ''}`}>{MODALIDAD_LABEL[l.modalidad] ?? l.modalidad}</span>
                  {l.precioReducido != null && <span>${l.precioReducido.toFixed(2)}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ComercioLayout>
  )
}
