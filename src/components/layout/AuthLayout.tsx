import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../ui/Logo'
import BackLink from '../ui/BackLink'
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
      <aside className="fl-auth__panel">
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

        <Link to="/login" className="fl-auth__logo"><Logo light size={34} /></Link>

        <div className="fl-auth__panel-body">
          <span className="fl-auth__eyebrow-badge">{eyebrow}</span>
          <h1 className="fl-auth__title">{title}</h1>
          <p className="fl-auth__description">{description}</p>
        </div>

        {stat && (
          <div className="fl-auth__stat">
            <span className="fl-auth__stat-value fl-mono">{stat}</span>
            <span className="fl-auth__stat-label">{statLabel}</span>
          </div>
        )}
      </aside>

      <main className="fl-auth__content">
        <div className="fl-auth__card">
          {backTo && backLabel && <BackLink to={backTo} label={backLabel} />}
          {children}
        </div>
      </main>
    </div>
  )
}