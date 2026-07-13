import type { ReactNode } from 'react'
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
      <header className={styles.header}>
        {/* ... Header (omito por brevedad, es igual) ... */}
      </header>

      <div className={styles.body}>
        {/* SIDEBAR */}
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

          {/* ESTO ESTABA FUERA, AHORA ESTÁ DENTRO DEL ASIDE */}
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
        </aside> {/* AHORA EL ASIDE CIERRA AQUÍ */}

        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
}