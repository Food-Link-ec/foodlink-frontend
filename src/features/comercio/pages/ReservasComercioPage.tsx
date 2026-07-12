import { useState } from 'react'
import ComercioLayout from '../components/ComercioLayout'
import styles from './ReservasComercioPage.module.css'

const RESERVAS = [
  { id:'#RES-8921', org:'Fundación Quito Solidario', avatar:'FQ', producto:'Canasta Panadería Premium', detalle:'4.5 kg · Pan artesanal', estado:'pendiente', fecha:'Hoy, 18:30', lugar:'Pickup Point A' },
  { id:'#RES-8915', org:'Comedor Dignidad', avatar:'CD', producto:'Caja Vegetales Orgánicos', detalle:'12 kg · Mezcla temporada', estado:'confirmada', fecha:'Mañana, 09:00', lugar:'Zona de Carga' },
  { id:'#RES-8890', org:'Albergue El Buen Samaritano', avatar:'AB', producto:'Excedentes Menú del Día', detalle:'15 raciones · Sopas y Guisos', estado:'recogido', fecha:'Ayer, 20:15', lugar:'Finalizado' },
  { id:'#RES-8882', org:'Niños del Inga', avatar:'NI', producto:'Pack Frutas Maduras', detalle:'8 kg · Variado', estado:'cancelada', fecha:'—', lugar:'Problema logístico' },
]

const ESTADO_CFG: Record<string, { label: string; cls: string }> = {
  pendiente:  { label: 'Pendiente',  cls: styles.badgePendiente },
  confirmada: { label: 'Confirmada', cls: styles.badgeConfirmada },
  recogido:   { label: 'Recogido',   cls: styles.badgeRecogido },
  cancelada:  { label: 'Cancelada',  cls: styles.badgeCancelada },
}

const METRICAS = [
  { label: 'Pendientes', val: '12', sub: 'Por confirmar' },
  { label: 'Confirmadas', val: '45', sub: 'Hoy' },
  { label: 'Rescatadas', val: '328', sub: 'Este mes' },
  { label: 'Kg salvados', val: '1.2k', sub: 'Impacto social' },
]

export default function ReservasComercioPage() {
  const [filtro, setFiltro] = useState('Todas')
  const reservasFiltradas = RESERVAS.filter(r => filtro === 'Todas' || r.estado === filtro.toLowerCase())

  return (
    <ComercioLayout>
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.titulo}>Reservas</h1>
            <p className={styles.subtitulo}>Gestiona las solicitudes de retiro de tus lotes publicados.</p>
          </div>
        </div>

        <div className={styles.metricasRow}>
          {METRICAS.map((m, i) => (
            <div key={i} className={styles.metricaCard}>
              <span className={styles.metricaVal}>{m.val}</span>
              <span className={styles.metricaLabel}>{m.label}</span>
              <span className={styles.metricaSub}>{m.sub}</span>
            </div>
          ))}
        </div>

        <div className={styles.filtros}>
          {['Todas', 'Pendiente', 'Confirmada', 'Recogido', 'Cancelada'].map(f => (
            <button key={f} onClick={() => setFiltro(f)} className={`${styles.pill} ${filtro === f ? styles.pillActivo : ''}`}>{f}</button>
          ))}
        </div>

        <div className={styles.lista}>
          {reservasFiltradas.map(r => (
            <div key={r.id} className={styles.card}>
              <div className={styles.cardAvatar}>{r.avatar}</div>
              <div className={styles.cardInfo}>
                <div className={styles.cardTop}>
                  <div>
                    <span className={styles.cardId}>{r.id}</span>
                    <h3 className={styles.cardOrg}>{r.org}</h3>
                  </div>
                  <span className={`${styles.badge} ${ESTADO_CFG[r.estado].cls}`}>{ESTADO_CFG[r.estado].label}</span>
                </div>
                <p className={styles.cardProd}>{r.producto} · <span>{r.detalle}</span></p>
                <div className={styles.cardMeta}>
                  <span><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>{r.fecha}</span>
                  <span><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>{r.lugar}</span>
                </div>
              </div>
              <div className={styles.cardAcciones}>
                {r.estado === 'pendiente' && <button className={styles.btnConfirmar}>Confirmar</button>}
                <button className={styles.btnDetalles}>Detalles</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ComercioLayout>
  )
}