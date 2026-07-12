import type { ReactNode } from 'react'
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import styles from './CompradorLayout.module.css'
import { NotifPanel, PerfilPanel } from './HeaderPanels'
import logoImg from '../../../assets/images/foodlink-logo.png.png'

interface Props { children: ReactNode }

const SIDE_NAV = [
  { to: '/dashboard/comprador',               label: 'Explorar Ofertas', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
  { to: '/dashboard/comprador/pedidos',        label: 'Mis Pedidos',      icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> },
  { to: '/dashboard/comprador/impacto',        label: 'Impacto Personal', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> },
  { to: '/dashboard/comprador/configuracion',  label: 'Configuración',    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
]

const NOTIF_COUNT = 3

export default function CompradorLayout({ children }: Props) {
  const location = useLocation()
  const navigate = useNavigate()
  const nombre = localStorage.getItem('nombreUsuario') || 'Comprador'
  const inicial = nombre.charAt(0).toUpperCase()
  const [panelAbierto, setPanelAbierto] = useState<'notif' | 'perfil' | null>(null)

  const togglePanel = (panel: 'notif' | 'perfil') =>
    setPanelAbierto(prev => prev === panel ? null : panel)

  const handleLogout = () => { localStorage.clear(); navigate('/') }

  return (
    <div className={styles.shell}>

      {/* ── HEADER ── */}
      <header className={styles.header}>
        <Link to="/" className={styles.logoLink}>
          <img src={logoImg} alt="FoodLink" className={styles.logoImg} />
          <span className={styles.logoText}>FoodLink</span>
        </Link>

        <div className={styles.headerRight}>
          {/* Notificaciones */}
          <div className={styles.panelAnchor}>
            <button
              className={`${styles.notifBtn} ${panelAbierto === 'notif' ? styles.btnActivo : ''}`}
              onClick={() => togglePanel('notif')}
              aria-label="Notificaciones"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              {NOTIF_COUNT > 0 && <span className={styles.notifDot}/>}
            </button>
            {panelAbierto === 'notif' && <NotifPanel onClose={() => setPanelAbierto(null)} />}
          </div>

          {/* Avatar / Perfil */}
          <div className={styles.panelAnchor}>
            <button
              className={`${styles.avatarBtn} ${panelAbierto === 'perfil' ? styles.btnActivo : ''}`}
              onClick={() => togglePanel('perfil')}
            >
              <div className={styles.avatarCircle}>{inicial}</div>
              <span className={styles.avatarName}>{nombre.split(' ')[0]}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--fl-ink-faint)', transition: 'transform 0.2s', transform: panelAbierto === 'perfil' ? 'rotate(180deg)' : 'none' }}><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            {panelAbierto === 'perfil' && <PerfilPanel onClose={() => setPanelAbierto(null)} />}
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <div className={styles.body}>

        {/* ── SIDEBAR ── */}
        <aside className={styles.sidebar}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>{inicial}</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{nombre}</span>
              <span className={styles.userRole}>Comprador de Rescate</span>
            </div>
          </div>

          <nav className={styles.sideNav}>
            {SIDE_NAV.map(item => {
              const active = location.pathname === item.to
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`${styles.sideNavItem} ${active ? styles.sideNavActive : ''}`}
                >
                  <span className={styles.sideNavIcon}>{item.icon}</span>
                  <span className={styles.sideNavLabel}>{item.label}</span>
                  {active && <span className={styles.sideNavIndicator}/>}
                </Link>
              )
            })}
          </nav>

          <div className={styles.sideBottom}>
            <div className={styles.ecoCard}>
              <div className={styles.ecoIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
              </div>
              <div>
                <span className={styles.ecoNum}>18 kg</span>
                <span className={styles.ecoLabel}>CO₂ evitados este mes</span>
              </div>
            </div>

            <button className={styles.logoutBtn} onClick={handleLogout}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Cerrar Sesión
            </button>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
}