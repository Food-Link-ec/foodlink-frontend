import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ComercioLayout from '../components/ComercioLayout'
import styles from './NotificacionesComercioPage.module.css'

const NOTIFS_INIT = [
  { id:1, tipo:'urgente', titulo:'Lote próximo a vencer', desc:'Pan Artesanal #B-4488-Q caduca en 2 horas — considera reducir el precio para aumentar reservas.', tiempo:'Hace 5 min', leida:false },
  { id:2, tipo:'reserva', titulo:'Nueva reserva recibida', desc:'Fundación Quito Solidario reservó tu lote de 15kg de gourmet para hoy a las 18:30.', tiempo:'Hace 1 h', leida:false },
  { id:3, tipo:'confirmacion', titulo:'Recolección confirmada', desc:'Comedor Dignidad confirmó la recolección de Vegetales Orgánicos. Código de retiro: FL-9921.', tiempo:'Ayer', leida:true },
  { id:4, tipo:'impacto', titulo:'¡Hito alcanzado!', desc:'Has rescatado más de 1,000 kg este mes. Eres el Comercio Héroe de julio en Quito.', tiempo:'Ayer', leida:true },
  { id:5, tipo:'sistema', titulo:'Actualización del sistema', desc:'Se ha mejorado el proceso de verificación de lotes. Los lotes ahora se aprueban en menos de 10 minutos.', tiempo:'Hace 3 días', leida:true },
]

const TIPO_CFG: Record<string, { bg: string; color: string; icon: React.ReactNode }> = {
  urgente:     { bg:'#FEE2E2', color:'#991B1B', icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
  reserva:     { bg:'#DCFCE7', color:'#166534', icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  confirmacion:{ bg:'#DBEAFE', color:'#1E40AF', icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> },
  impacto:     { bg:'#DCFCE7', color:'#166534', icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> },
  sistema:     { bg:'#F3F4F6', color:'#6B7280', icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
}

export default function NotificacionesComercioPage() {
  const [notifs, setNotifs] = useState(NOTIFS_INIT)
  const noLeidas = notifs.filter(n => !n.leida).length
  return (
    <ComercioLayout>
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.titulo}>Notificaciones</h1>
            <p className={styles.subtitulo}>Mantente al tanto de las novedades de tu negocio en FoodLink.</p>
          </div>
          {noLeidas > 0 && (
            <button className={styles.btnMarcar} onClick={() => setNotifs(prev => prev.map(n => ({ ...n, leida: true })))}>
              Marcar todas como leídas
            </button>
          )}
        </div>

        {noLeidas > 0 && (
          <div className={styles.resumenBadge}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Tienes {noLeidas} notificación{noLeidas > 1 ? 'es' : ''} sin leer
          </div>
        )}

        <div className={styles.lista}>
          {notifs.map(n => {
            const cfg = TIPO_CFG[n.tipo]
            return (
              <div key={n.id} className={`${styles.card} ${!n.leida ? styles.cardNoLeida : ''}`} onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, leida: true } : x))}>
                <div className={styles.icono} style={{ background: cfg.bg, color: cfg.color }}>{cfg.icon}</div>
                <div className={styles.cuerpo}>
                  <div className={styles.cardTop}>
                    <p className={styles.cardTitulo}>{n.titulo}</p>
                    <span className={styles.cardTiempo}>{n.tiempo}</span>
                  </div>
                  <p className={styles.cardDesc}>{n.desc}</p>
                </div>
                {!n.leida && <span className={styles.dot}/>}
              </div>
            )
          })}
        </div>
      </div>
    </ComercioLayout>
  )
}