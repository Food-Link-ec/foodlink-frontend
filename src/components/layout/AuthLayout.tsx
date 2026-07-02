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
        <Link to="/" className="fl-auth__logo"><Logo light /></Link>

        <div className="fl-auth__panel-body">
          <p className="fl-eyebrow" style={{ color: 'var(--fl-dorado)' }}>{eyebrow}</p>
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