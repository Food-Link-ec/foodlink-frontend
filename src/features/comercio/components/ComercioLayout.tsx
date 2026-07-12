import type { ReactNode } from 'react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './ComercioLayout.module.css'
import logoImg from '../../../assets/images/foodlink-logo.png.png'

interface Props { children: ReactNode }

const SIDE_NAV = [
  { to: '/dashboard', label: 'Panel de Control', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
  { to: '/dashboard/comercio/mis-lotes', label: 'Mis Lotes', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg> },
  { to: '/dashboard/comercio/reservas', label: 'Reservas', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { to: '/dashboard/comercio/impacto', label: 'Impacto', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
  { to: '/dashboard/comercio/configuracion', label: 'Configuración', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
]

export default function ComercioLayout({ children }: Props) {
  const location = useLocation()
  const navigate = useNavigate()
  const nombre = localStorage.getItem('nombreUsuario') || 'Comercio'
  const inicial = nombre.charAt(0).toUpperCase()
  const [notifOpen, setNotifOpen] = useState(false)

  const handleLogout = () => { localStorage.clear(); navigate('/') }

  return (
    <div className={styles.shell}>

      {/* HEADER */}
      <header className={styles.header}>
        <Link to="/" className={styles.logoLink}>
          <img src={logoImg} alt="FoodLink" className={styles.logoImg} />
          <span className={styles.logoText}>FoodLink</span>
        </Link>

        <div className={styles.headerRight}>
          <Link to="/dashboard/comercio/nuevo-lote" className={styles.btnNuevoLote}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Publicar Lote
          </Link>
          <div className={styles.panelAnchor}>
            <button className={styles.notifBtn} onClick={() => setNotifOpen(o => !o)} aria-label="Notificaciones">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span className={styles.notifDot}/>
            </button>
            {notifOpen && (
              <div className={styles.notifDropdown}>
                <div className={styles.notifHeader}>
                  <span>Notificaciones</span>
                  <button onClick={() => navigate('/dashboard/comercio/notificaciones')} className={styles.notifVerTodas}>Ver todas</button>
                </div>
                {[
                  { titulo: 'Nueva reserva recibida', desc: '#RES-8921 · Fundación Quito Solidario', tiempo: 'Hace 5 min', color: '#DCFCE7', tc: '#166534' },
                  { titulo: 'Lote próximo a vencer', desc: 'Pan Artesanal — caduca en 2 horas', tiempo: 'Hace 1 h', color: '#FEE2E2', tc: '#991B1B' },
                  { titulo: 'Recolección confirmada', desc: 'Vegetales Orgánicos · Mañana 09:00', tiempo: 'Ayer', color: '#DBEAFE', tc: '#1E40AF' },
                ].map((n, i) => (
                  <div key={i} className={styles.notifItem}>
                    <div className={styles.notifIcono} style={{ background: n.color, color: n.tc }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="4"/></svg>
                    </div>
                    <div>
                      <p className={styles.notifTitulo}>{n.titulo}</p>
                      <p className={styles.notifDesc}>{n.desc}</p>
                      <span className={styles.notifTiempo}>{n.tiempo}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={styles.avatarPill}>
            <div className={styles.avatarCircle}>{inicial}</div>
            <span className={styles.avatarName}>{nombre.split(' ')[0]}</span>
          </div>
        </div>
      </header>

      <div className={styles.body}>
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>{inicial}</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{nombre}</span>
              <span className={styles.userRole}>Administrador de Rescate</span>
            </div>
          </div>

          <nav className={styles.sideNav}>
            {SIDE_NAV.map(item => {
              const active = location.pathname === item.to
              return (
                <Link key={item.to} to={item.to} className={`${styles.sideNavItem} ${active ? styles.sideNavActive : ''}`}>
                  <span className={styles.sideNavIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                  {active && <span className={styles.sideNavDot}/>}
                </Link>
              )
            })}
          </nav>

          <div className={styles.sideBottom}>
            <Link to="/dashboard/comercio/notificaciones" className={styles.notifLink}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              Notificaciones
              <span className={styles.notifBadge}>3</span>
            </Link>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Cerrar Sesión
            </button>
          </div>
        </aside>

        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
}