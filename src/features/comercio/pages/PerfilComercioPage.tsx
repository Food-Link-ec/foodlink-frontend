import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ComercioLayout from '../components/ComercioLayout'
import { getMiPerfil } from '../../perfil/services/perfilService'
import styles from './PerfilComercioPage.module.css'

interface PerfilComercio {
  ruc: string
  nombre: string
  telefono: string
  email: string
  estado: string
}

export default function PerfilComercioPage() {
  const navigate = useNavigate()
  const nombre = localStorage.getItem('nombreUsuario') || 'Mi Negocio'
  const email = localStorage.getItem('email') || 'negocio@email.com'
  const inicial = nombre.charAt(0).toUpperCase()
  const [guardado, setGuardado] = useState(false)
  const [imgPreview, setImgPreview] = useState<string | null>(null)
  const [perfil, setPerfil] = useState<PerfilComercio | null>(null)

  useEffect(() => {
    let cancelado = false
    getMiPerfil()
      .then((data) => { if (!cancelado) setPerfil(data.perfil) })
      .catch(() => {})
    return () => { cancelado = true }
  }, [])

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const r = new FileReader()
      r.onloadend = () => setImgPreview(r.result as string)
      r.readAsDataURL(file)
    }
  }

  const handleGuardar = () => {
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2500)
  }

  return (
    <ComercioLayout>
      <div className={styles.page}>

        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.titulo}>Perfil del Negocio</h1>
            <p className={styles.subtitulo}>Información pública de tu establecimiento en FoodLink.</p>
          </div>
          <button className={styles.btnGuardar} onClick={handleGuardar}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Guardar cambios
          </button>
        </div>

        {guardado && (
          <div className={styles.toast}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Perfil actualizado correctamente
          </div>
        )}

        <div className={styles.grid}>

          {/* Columna izquierda — Avatar + stats */}
          <div className={styles.colLeft}>

            <div className={styles.avatarCard}>
              <label className={styles.avatarWrap}>
                {imgPreview
                  ? <img src={imgPreview} alt={nombre} className={styles.avatarImg} />
                  : <div className={styles.avatarLetra}>{inicial}</div>
                }
                <div className={styles.avatarOverlay}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                  <span>Cambiar foto</span>
                </div>
                <input type="file" accept="image/*" onChange={handleImg} className={styles.inputHidden} />
              </label>

              <div className={styles.avatarInfo}>
                <h2 className={styles.avatarNombre}>{nombre}</h2>
                <p className={styles.avatarEmail}>{email}</p>
                <span className={styles.avatarBadge}>Administrador de Rescate</span>
              </div>
            </div>

            {/* Stats del negocio */}
            <div className={styles.statsCard}>
              <h3 className={styles.statsCardTitulo}>Resumen de actividad</h3>
              {[
                { label: 'Lotes publicados', val: '42', icon: '📦' },
                { label: 'kg rescatados total', val: '1,240', icon: '⚖️' },
                { label: 'Reservas completadas', val: '328', icon: '✅' },
                { label: 'Fundaciones aliadas', val: '12', icon: '🤝' },
                { label: 'Miembro desde', val: 'Ene 2025', icon: '📅' },
              ].map((s, i) => (
                <div key={i} className={styles.statRow}>
                  <span className={styles.statIcon}>{s.icon}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                  <span className={styles.statVal}>{s.val}</span>
                </div>
              ))}
            </div>

            {/* Verificación */}
            <div className={styles.verificadoCard}>
              <div className={styles.verificadoIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div>
                <p className={styles.verificadoTitulo}>
                  {perfil?.estado === 'VERIFICADO' ? 'Negocio verificado' : perfil ? `Estado: ${perfil.estado}` : 'Cargando estado…'}
                </p>
                <p className={styles.verificadoSub}>
                  {perfil?.estado === 'VERIFICADO'
                    ? 'Tu establecimiento cumple con los estándares de calidad de FoodLink.'
                    : 'Tu negocio está pendiente de revisión por el equipo de FoodLink.'}
                </p>
              </div>
            </div>
          </div>

          {/* Columna derecha — Formulario */}
          <div className={styles.colRight}>

            <section className={styles.seccion}>
              <h3 className={styles.seccionTitulo}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Información del negocio
              </h3>
              <div className={styles.campos}>
                <div className={styles.campoRow}>
                  <div className={styles.campo}>
                    <label className={styles.label}>Nombre del negocio</label>
                    <input type="text" defaultValue={nombre} className={styles.input} />
                  </div>
                  <div className={styles.campo}>
                    <label className={styles.label}>Tipo de establecimiento</label>
                    <select className={styles.input}>
                      {['Restaurante', 'Panadería', 'Supermercado', 'Catering', 'Mercado', 'Hotel', 'Otro'].map(t => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={styles.campo}>
                  <label className={styles.label}>Descripción pública</label>
                  <textarea
                    className={`${styles.input} ${styles.textarea}`}
                    rows={3}
                    defaultValue="Establecimiento comprometido con el rescate de alimentos y la reducción del desperdicio en Quito."
                  />
                </div>
                <div className={styles.campoRow}>
                  <div className={styles.campo}>
                    <label className={styles.label}>RUC / NIT</label>
                    <input type="text" value={perfil?.ruc ?? ''} readOnly className={styles.input} />
                  </div>
                  <div className={styles.campo}>
                    <label className={styles.label}>Teléfono</label>
                    <input type="tel" defaultValue={perfil?.telefono ?? ''} className={styles.input} />
                  </div>
                </div>
                <div className={styles.campo}>
                  <label className={styles.label}>Correo electrónico</label>
                  <input type="email" defaultValue={email} className={styles.input} />
                </div>
                <div className={styles.campo}>
                  <label className={styles.label}>Sitio web (opcional)</label>
                  <input type="url" placeholder="https://minegocio.com" className={styles.input} />
                </div>
              </div>
            </section>

            <section className={styles.seccion}>
              <h3 className={styles.seccionTitulo}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Ubicación
              </h3>
              <div className={styles.campos}>
                <div className={styles.campo}>
                  <label className={styles.label}>Dirección principal</label>
                  <input type="text" defaultValue="Av. González Suárez N30-57, Quito" className={styles.input} />
                </div>
                <div className={styles.campoRow}>
                  <div className={styles.campo}>
                    <label className={styles.label}>Sector / Barrio</label>
                    <input type="text" defaultValue="González Suárez" className={styles.input} />
                  </div>
                  <div className={styles.campo}>
                    <label className={styles.label}>Ciudad</label>
                    <input type="text" defaultValue="Quito" className={styles.input} />
                  </div>
                </div>
                <div className={styles.campo}>
                  <label className={styles.label}>Horario habitual de operación</label>
                  <input type="text" defaultValue="Lunes a Viernes, 08:00 – 22:00" className={styles.input} />
                </div>
              </div>
            </section>

            <section className={styles.seccion}>
              <h3 className={styles.seccionTitulo}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Cambiar contraseña
              </h3>
              <div className={styles.campos}>
                <div className={styles.campo}>
                  <label className={styles.label}>Contraseña actual</label>
                  <input type="password" placeholder="••••••••" className={styles.input} />
                </div>
                <div className={styles.campoRow}>
                  <div className={styles.campo}>
                    <label className={styles.label}>Nueva contraseña</label>
                    <input type="password" placeholder="••••••••" className={styles.input} />
                  </div>
                  <div className={styles.campo}>
                    <label className={styles.label}>Confirmar contraseña</label>
                    <input type="password" placeholder="••••••••" className={styles.input} />
                  </div>
                </div>
              </div>
            </section>

            <div className={styles.accionesBottom}>
              <button className={styles.btnGuardarBottom} onClick={handleGuardar}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Guardar cambios
              </button>
              <button className={styles.btnCancelar} onClick={() => navigate(-1)}>Cancelar</button>
              <button className={styles.btnEliminar}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
                Eliminar cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
    </ComercioLayout>
  )
}