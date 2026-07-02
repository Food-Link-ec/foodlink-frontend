import { NavLink } from 'react-router-dom'
import './RegisterTypeTabs.css'

const TIPOS = [
  { to: '/registro/comercio', label: 'Comercio', hint: 'Supermercados y restaurantes' },
  { to: '/registro/beneficiario', label: 'Beneficiario', hint: 'Organizaciones verificadas' },
  { to: '/registro/comprador', label: 'Comprador', hint: 'Personas naturales' },
] as const

export default function RegisterTypeTabs() {
  return (
    <nav className="fl-tabs" aria-label="Tipo de cuenta a registrar">
      {TIPOS.map((tipo) => (
        <NavLink
          key={tipo.to}
          to={tipo.to}
          className={({ isActive }) => `fl-tabs__item ${isActive ? 'fl-tabs__item--active' : ''}`}
        >
          <span className="fl-tabs__label">{tipo.label}</span>
          <span className="fl-tabs__hint">{tipo.hint}</span>
        </NavLink>
      ))}
    </nav>
  )
}