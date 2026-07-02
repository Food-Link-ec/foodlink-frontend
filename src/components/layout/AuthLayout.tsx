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
  children: ReactNode
}

export default function AuthLayout({ eyebrow, title, description, stat, statLabel, children }: AuthLayoutProps) {
  return (
    <div className="fl-auth">
      <aside className="fl-auth__panel fl-ticket-edge">
        <div className="fl-auth__texture" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice">
            <circle cx="360" cy="60" r="140" fill="url(#g1)" />
            <circle cx="10" cy="640" r="180" fill="url(#g2)" />
            <path d="M40 340C60 300 110 290 140 320C170 350 160 400 120 415C80 430 20 390 40 340Z" fill="rgba(250,247,240,0.045)" />
            <defs>
              <radialGradient id="g1"><stop offset="0%" stopColor="#F0A93A" stopOpacity="0.22" /><stop offset="100%" stopColor="#F0A93A" stopOpacity="0" /></radialGradient>
              <radialGradient id="g2"><stop offset="0%" stopColor="#E8543E" stopOpacity="0.20" /><stop offset="100%" stopColor="#E8543E" stopOpacity="0" /></radialGradient>
            </defs>
          </svg>
        </div>

        <Link to="/" className="fl-auth__logo"><Logo light /></Link>

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
        <div className="fl-auth__card">{children}</div>
      </main>
    </div>
  )
}