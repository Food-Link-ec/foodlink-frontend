import type { ReactNode } from 'react'
import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from './AdminLayout.module.css'
import logoImg from '../../../assets/images/foodlink-logo.png.png'

interface Props { children: ReactNode }

const SIDE_NAV = [
  {
    to: '/dashboard/admin',
    label: 'Panel de Control',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  },
  {
    to: '/dashboard/admin/usuarios',
    label: 'Usuarios',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    badge: '3',
  },
  {
    to: '/dashboard/admin/lotes',
    label: 'Lotes',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
  },
  {
    to: '/dashboard/admin/reportes',
    label: 'Reportes',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  },
  {
    to: '/dashboard/admin/configuracion',
    label: 'Configuración',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  },
]

export default function AdminLayout({ children }: Props) {
  const location = useLocation()
  const navigate = useNavigate()
  
  const nombre = localStorage.getItem('nombreUsuario') || 'Admin'
  const inicial = nombre.charAt(0).toUpperCase()
  
  const [perfilOpen, setPerfilOpen] = useState(false)
  const perfilRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (perfilRef.current && !perfilRef.current.contains(e.target as Node)) {
        setPerfilOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = () => { 
    localStorage.clear()
    navigate('/') 
  }

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        {/* ... (Tu contenido del header permanece igual) ... */}
        <div className={styles.headerLeft}>
          <Link to="/" className={styles.logoLink}>
            <img src={logoImg} alt="FoodLink" className={styles.logoImg} />
            <span className={styles.logoText}>FoodLink</span>
          </Link>
          <span className={styles.adminBadge}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Panel Admin
          </span>
        </div>
        {/* ... resto del header ... */}
      </header>

      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>{inicial}</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{nombre}</span>
              <span className={styles.userRole}>Super Administrador</span>
            </div>
          </div>

          <nav className={styles.sideNav}>
            {SIDE_NAV.map(item => {
              const active = location.pathname === item.to
              return (
                <Link key={item.to} to={item.to} className={`${styles.sideNavItem} ${active ? styles.sideNavActive : ''}`}>
                  <span className={styles.sideNavIcon}>{item.icon}</span>
                  <span className={styles.sideNavLabel}>{item.label}</span>
                  {item.badge && <span className={styles.sideNavBadge}>{item.badge}</span>}
                  {active && !item.badge && <span className={styles.sideNavDot}/>}
                </Link>
              )
            })}
          </nav>

          {/* ESTA ES LA PARTE CORREGIDA: Incluido dentro del <aside> */}
          <div className={styles.sideBottom}>
            <div className={styles.sideSystemInfo}>
              <span className={styles.sideSystemDot}/>
              <span>Sistema activo · v1.0</span>
            </div>

            <Link to="/dashboard/admin/configuracion" className={styles.sidePerfilCard}>
              <div className={styles.sidePerfilAvatar}>{inicial}</div>
              <div className={styles.sidePerfilInfo}>
                <span className={styles.sidePerfilNombre}>{nombre}</span>
                <span className={styles.sidePerfilRol}>Super Admin</span>
              </div>
            </Link>

            <button className={styles.logoutBtn} onClick={handleLogout}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Cerrar Sesión
            </button>
          </div>
        </aside>

        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
}