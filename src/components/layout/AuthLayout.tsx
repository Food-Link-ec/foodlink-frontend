import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../ui/Logo'
import './AuthLayout.css'

interface AuthLayoutProps {
  eyebrow: string
  title: string
  description: string
  stat?: string
  statLabel?: string
  backTo?: string
  backLabel?: string
  children: ReactNode
}

export default function AuthLayout({
  eyebrow,
  title,
  description,
  stat,
  statLabel,
  backTo,
  backLabel,
  children,
}: AuthLayoutProps) {
  return (
    <div className="fl-auth">
      <aside className="fl-auth__panel fl-ticket-edge">
        {/* Textura de fondo SVG */}
        <div className="fl-auth__texture" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice">
            <circle cx="360" cy="50" r="160" fill="url(#g1)" />
            <circle cx="0" cy="650" r="200" fill="url(#g2)" />
            <defs>
              <radialGradient id="g1"><stop offset="0%" stopColor="#F0A93A" stopOpacity="0.20" /><stop offset="100%" stopColor="#F0A93A" stopOpacity="0" /></radialGradient>
              <radialGradient id="g2"><stop offset="0%" stopColor="#D9713F" stopOpacity="0.18" /><stop offset="100%" stopColor="#D9713F" stopOpacity="0" /></radialGradient>
            </defs>
          </svg>
        </div>

        {/* Encabezado del panel */}
        <div className="fl-auth__panel-top">
          <Link to="/" className="fl-auth__logo">
            <Logo light size={34} />
          </Link>
          {backTo && (
            <Link to={backTo} className="fl-auth__back">
              {backLabel || '← Volver'}
            </Link>
          )}
        </div>

        {/* Cuerpo del panel */}
        <div className="fl-auth__panel-body">
          <span className="fl-auth__eyebrow-badge">{eyebrow}</span>
          <h1 className="fl-auth__title">{title}</h1>
          <p className="fl-auth__description">{description}</p>
        </div>

        {/* Estadísticas */}
        {stat && (
          <div className="fl-auth__stat">
            <span className="fl-auth__stat-value fl-mono">{stat}</span>
            <span className="fl-auth__stat-label">{statLabel}</span>
          </div>
        )}
      </aside>

      {/* Columna derecha: formulario */}
      <main className="fl-auth__content">
        {/* Header superior: logo + volver al inicio */}
        <div className="fl-auth__form-header">
          <Link to="/" className="fl-auth__form-logo">
            <Logo size={28} compact />
          </Link>
          <Link to="/" className="fl-auth__form-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
            </svg>
            Volver al inicio
          </Link>
        </div>

        <div className="fl-auth__card">
          {children}

          {/* Pie de página del formulario */}
          <p className="fl-auth__login-hint">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </p>
        </div>
      </main>
    </div>
  )
}