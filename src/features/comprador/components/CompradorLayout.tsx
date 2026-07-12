import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CompradorSidebar from './CompradorSidebar'
import Logo from '../../../components/ui/Logo'
import styles from './CompradorLayout.module.css'

interface CompradorLayoutProps {
  children: ReactNode
}

export default function CompradorLayout({ children }: CompradorLayoutProps) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className={styles.layout}>
      <CompradorSidebar />

      {/* Header solo en mobile */}
      <header className={styles.mobileHeader}>
        <Link to="/" className={styles.mobileLogoLink}>
          <Logo size={26} compact />
        </Link>
        <button className={styles.mobileLogout} onClick={handleLogout}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>
      </header>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}