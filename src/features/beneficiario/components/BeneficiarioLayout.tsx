import type { ReactNode } from 'react'
import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './BeneficiarioLayout.module.css'
import logoImg from '../../../assets/images/foodlink-logo.png.png'

interface Props { children: ReactNode }

const SIDE_NAV = [
  {
    to: '/dashboard',
    label: 'Panel de Control',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  },
  {
    to: '/dashboard/beneficiario/lotes',
    label: 'Explorar Lotes',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  },
  {
    to: '/dashboard/beneficiario/solicitudes',
    label: 'Mis Solicitudes',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  },
  {
    to: '/dashboard/beneficiario/impacto',
    label: 'Impacto Social',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
  },
  {
    to: '/dashboard/beneficiario/configuracion',
    label: 'Configuración',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  },
]

export default function BeneficiarioLayout({ children }: Props) {
  const location = useLocation()
  const navigate = useNavigate()
  const nombre = localStorage.getItem('nombreUsuario') || 'Organización'
  const email = localStorage.getItem('email') || 'org@email.com'
  const inicial = nombre.charAt(0).toUpperCase()
  const [perfilOpen, setPerfilOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const perfilRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (perfilRef.current && !perfilRef.current.contains(e.target as Node)) setPerfilOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

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
          {/* Notificaciones */}
          <div className={styles.panelAnchor} ref={notifRef}>
            <button className={styles.notifBtn} onClick={() => setNotifOpen(o => !o)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className={styles.notifDot}/>
            </button>
            {notifOpen && (
              <div className={styles.notifDropdown}>
                <div className={styles.notifHeader}>
                  <span>Notificaciones</span>
                  <span className={styles.notifBadge}>2 nuevas</span>
                </div>
                {[
                  { titulo: 'Nuevo lote disponible', desc: 'Panadería El Trigo donó 12 kg de pan artesanal', tiempo: 'Hace 10 min', bg: '#DCFCE7', color: '#166534' },
                  { titulo: 'Solicitud confirmada', desc: 'Tu pedido #SOL-442 fue aprobado por Mercado Central', tiempo: 'Hace 2 h', bg: '#DBEAFE', color: '#1E40AF' },
                  { titulo: 'Recordatorio de retiro', desc: 'Vegetales Orgánicos — retiro hoy a las 10:00', tiempo: 'Ayer', bg: '#FCEACB', color: '#C98418' },
                ].map((n, i) => (
                  <div key={i} className={styles.notifItem}>
                    <div className={styles.notifIcono} style={{ background: n.bg, color: n.color }}>
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

          {/* Avatar / Perfil */}
          <div className={styles.panelAnchor} ref={perfilRef}>
            <button
              className={`${styles.avatarBtn} ${perfilOpen ? styles.avatarBtnActivo : ''}`}
              onClick={() => setPerfilOpen(o => !o)}
            >
              <div className={styles.avatarCircle}>{inicial}</div>
              <span className={styles.avatarName}>{nombre.split(' ')[0]}</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                style={{ color: 'var(--fl-ink-faint)', transition: 'transform 0.2s', transform: perfilOpen ? 'rotate(180deg)' : 'none' }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {perfilOpen && (
              <div className={styles.perfilDropdown}>
                <div className={styles.perfilDropHeader}>
                  <div className={styles.perfilDropAvatar}>{inicial}</div>
                  <div>
                    <p className={styles.perfilDropNombre}>{nombre}</p>
                    <p className={styles.perfilDropEmail}>{email}</p>
                    <span className={styles.perfilDropRol}>Organización Receptora</span>
                  </div>
                </div>
                <div className={styles.perfilDropStats}>
                  <div className={styles.perfilDropStat}><span className={styles.perfilDropStatNum}>145</span><span className={styles.perfilDropStatLabel}>kg recibidos</span></div>
                  <div className={styles.perfilDropStatDiv}/>
                  <div className={styles.perfilDropStat}><span className={styles.perfilDropStatNum}>12</span><span className={styles.perfilDropStatLabel}>solicitudes</span></div>
                  <div className={styles.perfilDropStatDiv}/>
                  <div className={styles.perfilDropStat}><span className={styles.perfilDropStatNum}>480</span><span className={styles.perfilDropStatLabel}>raciones</span></div>
                </div>
                <nav className={styles.perfilDropMenu}>
                  {[
                    { to: '/dashboard/beneficiario/solicitudes', label: 'Mis Solicitudes', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
                    { to: '/dashboard/beneficiario/impacto', label: 'Impacto Social', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> },
                    { to: '/dashboard/beneficiario/configuracion', label: 'Configuración', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
                  ].map(item => (
                    <Link key={item.to} to={item.to} className={styles.perfilDropItem} onClick={() => setPerfilOpen(false)}>
                      <span className={styles.perfilDropItemIcon}>{item.icon}</span>
                      {item.label}
                      <svg className={styles.perfilDropChevron} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                    </Link>
                  ))}
                </nav>
                <button className={styles.perfilDropLogout} onClick={handleLogout}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  Cerrar sesión
                </button>
              </div>
            )}
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
              <span className={styles.userRole}>Organización Receptora</span>
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
            <div className={styles.impactoCard}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              <span>480 raciones este mes</span>
            </div>
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