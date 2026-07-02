import { useState, type InputHTMLAttributes } from 'react'
import './PasswordInput.css'

export default function PasswordInput({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="fl-password">
      <input
        {...rest}
        type={visible ? 'text' : 'password'}
        className={`fl-input fl-password__input ${className ?? ''}`}
      />
      <button
        type="button"
        className="fl-password__toggle"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        tabIndex={-1}
      >
        {visible ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 3l18 18M10.6 10.6a3 3 0 004.24 4.24M9.9 5.1A10.9 10.9 0 0112 5c5.5 0 9.5 4 11 7-0.6 1.2-1.6 2.6-3 3.9M6.2 6.6C4 8.1 2.5 10.1 1 12c1.5 3 5.5 7 11 7 1.3 0 2.5-.2 3.7-.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
          </svg>
        )}
      </button>
    </div>
  )
}