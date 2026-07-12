import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './HeaderPanels.module.css'

interface Notif {
  id: string
  tipo: 'listo' | 'nuevo' | 'impacto' | 'oferta'
  titulo: string
  desc: string
  tiempo: string
  leida: boolean
}

const NOTIFS: Notif[] = [
  { id:'n1', tipo:'listo',   titulo:'¡Tu lote está listo!', desc:'Pack Panadería Artesanal · Panadería El Trigo', tiempo:'Hace 5 min', leida:false },
  { id:'n2', tipo:'nuevo',   titulo:'Nuevo lote disponible', desc:'10 Raciones Gourmet a -60% en González Suárez', tiempo:'Hace 1 h', leida:false },
  { id:'n3', tipo:'oferta',  titulo:'Oferta urgente', desc:'Frutas Tropicales caduca hoy — quedan 2 lotes', tiempo:'Hace 3 h', leida:false },
  { id:'n4', tipo:'impacto', titulo:'¡Nuevo logro desbloqueado!', desc:'Has evitado 10 kg de CO₂. ¡Sigue así!', tiempo:'Ayer', leida:true },
  { id:'n5', tipo:'nuevo',   titulo:'Lotes de tu zona', desc:'3 nuevos lotes en La Mariscal disponibles ahora', tiempo:'Ayer', leida:true },
]

const TIPO_ICON = {
  listo:   { bg: '#DCFCE7', color: '#166534', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> },
  nuevo:   { bg: '#DBEAFE', color: '#1E40AF', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
  impacto: { bg: '#DCFCE7', color: '#166534', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> },
  oferta:  { bg: '#FEE2E2', color: '#991B1B', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
}

/* ── PANEL NOTIFICACIONES ── */
export function NotifPanel({ onClose }: { onClose: () => void }) {
  const [notifs, setNotifs] = useState(NOTIFS)
  const noLeidas = notifs.filter(n => !n.leida).length
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  const marcarTodas = () => setNotifs(prev => prev.map(n => ({ ...n, leida: true })))
  const marcar = (id: string) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, leida: true } : n))

  return (
    <div ref={ref} className={styles.panel}>
      <div className={styles.panelHeader}>
        <div>
          <h3 className={styles.panelTitulo}>Notificaciones</h3>
          {noLeidas > 0 && <span className={styles.panelBadge}>{noLeidas} nuevas</span>}
        </div>
        {noLeidas > 0 && (
          <button className={styles.btnMarcar} onClick={marcarTodas}>Marcar todas</button>
        )}
      </div>

      <div className={styles.notifLista}>
        {notifs.map(n => {
          const cfg = TIPO_ICON[n.tipo]
          return (
            <div
              key={n.id}
              className={`${styles.notifItem} ${!n.leida ? styles.notifNoLeida : ''}`}
              onClick={() => marcar(n.id)}
            >
              <div className={styles.notifIcono} style={{ background: cfg.bg, color: cfg.color }}>
                {cfg.icon}
              </div>
              <div className={styles.notifCuerpo}>
                <p className={styles.notifTitulo}>{n.titulo}</p>
                <p className={styles.notifDesc}>{n.desc}</p>
                <span className={styles.notifTiempo}>{n.tiempo}</span>
              </div>
              {!n.leida && <span className={styles.notifDot}/>}
            </div>
          )
        })}
      </div>

      <div className={styles.panelFooter}>
        <button className={styles.btnVerTodas} onClick={onClose}>Ver todas las notificaciones</button>
      </div>
    </div>
  )
}

/* ── PANEL PERFIL ── */
export function PerfilPanel({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate()
  const nombre = localStorage.getItem('nombreUsuario') || 'Comprador'
  const email = localStorage.getItem('email') || 'usuario@email.com'
  const inicial = nombre.charAt(0).toUpperCase()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  const ir = (ruta: string) => { navigate(ruta); onClose() }
  const cerrar = () => { localStorage.clear(); navigate('/') }

  return (
    <div ref={ref} className={`${styles.panel} ${styles.panelPerfil}`}>
      {/* Header */}
      <div className={styles.perfilHeader}>
        <div className={styles.perfilAvatar}>{inicial}</div>
        <div>
          <p className={styles.perfilNombre}>{nombre}</p>
          <p className={styles.perfilEmail}>{email}</p>
          <span className={styles.perfilRol}>Comprador de Rescate</span>
        </div>
      </div>

      {/* Stats rápidos */}
      <div className={styles.perfilStats}>
        <div className={styles.perfilStat}>
          <span className={styles.perfilStatNum}>7</span>
          <span className={styles.perfilStatLabel}>Pedidos</span>
        </div>
        <div className={styles.perfilStatDiv}/>
        <div className={styles.perfilStat}>
          <span className={styles.perfilStatNum}>$42</span>
          <span className={styles.perfilStatLabel}>Ahorrado</span>
        </div>
        <div className={styles.perfilStatDiv}/>
        <div className={styles.perfilStat}>
          <span className={styles.perfilStatNum}>18kg</span>
          <span className={styles.perfilStatLabel}>CO₂ evitado</span>
        </div>
      </div>

      {/* Menu */}
      <nav className={styles.perfilMenu}>
        {[
          { label: 'Mis Pedidos', ruta: '/dashboard/comprador/pedidos', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> },
          { label: 'Mi Impacto', ruta: '/dashboard/comprador/impacto', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> },
          { label: 'Configuración', ruta: '/dashboard/comprador/configuracion', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
        ].map(item => (
          <button key={item.ruta} className={styles.perfilMenuItem} onClick={() => ir(item.ruta)}>
            <span className={styles.perfilMenuIcon}>{item.icon}</span>
            {item.label}
            <svg className={styles.perfilMenuChevron} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        ))}
      </nav>

      <button className={styles.btnCerrarSesion} onClick={cerrar}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Cerrar sesión
      </button>
    </div>
  )
}