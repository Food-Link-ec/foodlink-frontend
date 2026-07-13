import {type ReactNode } from 'react'
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './AdminLayout.module.css'
import logoImg from '../../../assets/images/foodlink-logo.png.png'

interface Props {
  children: ReactNode
  activeTab?: Tab
  onTabChange?: (tab: Tab) => void
  badges?: Partial<Record<Tab, number>>
}

type Tab = 'comercios' | 'beneficiarios' | 'analytics'

interface NavItem {
  tab: Tab
  label: string
  icon: React.ReactNode
}

const SIDE_NAV: NavItem[] = [
  {
    tab: 'comercios',
    label: 'Comercios',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    tab: 'beneficiarios',
    label: 'Beneficiarios',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    tab: 'analytics',
    label: 'Analytics',
    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  },
]

export default function AdminLayout({ children, activeTab, onTabChange, badges = {} }: Props) {
  const navigate = useNavigate()
  const nombre = localStorage.getItem('nombreUsuario') || 'Admin'
  const inicial = nombre.charAt(0).toUpperCase()
  const [perfilOpen, setPerfilOpen] = useState(false)
  const perfilRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (perfilRef.current && !perfilRef.current.contains(e.target as Node)) setPerfilOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = () => { localStorage.clear(); navigate('/') }

  return (
    <div className={styles.shell}>
      {/* HEADER */}
      <header className={styles.header}>
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

        <div className={styles.headerRight}>

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
                    <span className={styles.perfilDropRol}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      Administrador
                    </span>
                  </div>
                </div>
                <nav className={styles.perfilDropMenu}>
                  {/* Links de dropdown */}
                  <Link to="/dashboard/admin/configuracion" className={styles.perfilDropItem} onClick={() => setPerfilOpen(false)}>
                    Configuración del sistema
                  </Link>
                  <Link to="/dashboard/admin/reportes" className={styles.perfilDropItem} onClick={() => setPerfilOpen(false)}>
                    Ver reportes
                  </Link>
                </nav>
                <button className={styles.perfilDropLogout} onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className={styles.body}>
        {/* SIDEBAR CORREGIDO */}
        <aside className={styles.sidebar}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>{inicial}</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{nombre}</span>
              <span className={styles.userRole}>Administrador</span>
            </div>
          </div>

          <nav className={styles.sideNav}>
            {SIDE_NAV.map(item => {
              const active = activeTab === item.tab
              const count = badges[item.tab]
              return (
                <button
                  key={item.tab}
                  onClick={() => onTabChange?.(item.tab)}
                  className={`${styles.sideNavItem} ${active ? styles.sideNavActive : ''}`}
                >
                  <span className={styles.sideNavIcon}>{item.icon}</span>
                  <span className={styles.sideNavLabel}>{item.label}</span>
                  {count != null && count > 0
                    ? <span className={styles.sideNavBadge}>{count}</span>
                    : active && <span className={styles.sideNavDot}/>
                  }
                </button>
              )
            })}
          </nav>

          <div className={styles.sideBottom}>
            <div className={styles.sideSystemInfo}>
              <span className={styles.sideSystemDot}/>
              <span>Sistema activo · v1.0</span>
            </div>

            <button className={styles.logoutBtn} onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </aside>

        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
}