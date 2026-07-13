import { useEffect, useState } from 'react'
import CompradorLayout from '../components/CompradorLayout'
import { getMisEstadisticas } from '../../perfil/services/perfilService'
import type { EstadisticasCompradorResponse } from '../../perfil/services/perfilService'
import styles from './ConfiguracionPage.module.css'

export default function ConfiguracionPage() {
  const nombre = localStorage.getItem('nombreUsuario') || 'Comprador'
  const email = localStorage.getItem('email') || 'usuario@email.com'
  const inicial = nombre.charAt(0).toUpperCase()
  const [estadisticas, setEstadisticas] = useState<EstadisticasCompradorResponse | null>(null)

  useEffect(() => {
    const tipoUsuario = localStorage.getItem('tipoUsuario')
    if (tipoUsuario !== 'COMPRADOR') return
    getMisEstadisticas().then(setEstadisticas).catch(() => {})
  }, [])

  const [notifPedidos, setNotifPedidos] = useState(true)
  const [notifNuevos, setNotifNuevos] = useState(true)
  const [notifEmail, setNotifEmail] = useState(false)
  const [notifSMS, setNotifSMS] = useState(false)
  const [guardado, setGuardado] = useState(false)

  const handleGuardar = () => {
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2500)
  }

  return (
    <CompradorLayout>
      <div className={styles.page}>

        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.titulo}>Configuración</h1>
            <p className={styles.subtitulo}>Administra tu cuenta y preferencias de FoodLink.</p>
          </div>
        </div>

        {guardado && (
          <div className={styles.toast}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Cambios guardados correctamente
          </div>
        )}

        <div className={styles.grid}>

          {/* Perfil */}
          <section className={styles.seccion}>
            <h2 className={styles.seccionTitulo}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Información personal
            </h2>

            <div className={styles.perfilHeader}>
              <div className={styles.avatar}>{inicial}</div>
              <div>
                <p className={styles.perfilNombre}>{nombre}</p>
                <p className={styles.perfilRol}>Comprador de Rescate</p>
              </div>
              <button className={styles.btnCambiarFoto}>Cambiar foto</button>
            </div>

            <div className={styles.campos}>
              <div className={styles.campoGrupo}>
                <label className={styles.campoLabel}>Nombre completo</label>
                <input type="text" defaultValue={nombre} className={styles.campoInput} />
              </div>
              <div className={styles.campoGrupo}>
                <label className={styles.campoLabel}>Correo electrónico</label>
                <input type="email" defaultValue={email} className={styles.campoInput} />
              </div>
              <div className={styles.campoGrupo}>
                <label className={styles.campoLabel}>Teléfono</label>
                <input type="tel" placeholder="+593 99 000 0000" className={styles.campoInput} />
              </div>
              <div className={styles.campoGrupo}>
                <label className={styles.campoLabel}>Ciudad</label>
                <input type="text" defaultValue="Quito, Ecuador" className={styles.campoInput} />
              </div>
            </div>
          </section>

          {/* Mis compras */}
          {estadisticas && (
            <section className={styles.seccion}>
              <h2 className={styles.seccionTitulo}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                Mis compras
              </h2>
              <div className={styles.campos}>
                <div className={styles.campoGrupo}>
                  <label className={styles.campoLabel}>Lotes comprados</label>
                  <p className={styles.perfilNombre}>{estadisticas.totalLotesComprados}</p>
                </div>
                <div className={styles.campoGrupo}>
                  <label className={styles.campoLabel}>Total pagado</label>
                  <p className={styles.perfilNombre}>${estadisticas.totalPagado.toFixed(2)}</p>
                </div>
                <div className={styles.campoGrupo}>
                  <label className={styles.campoLabel}>Kg adquiridos</label>
                  <p className={styles.perfilNombre}>{estadisticas.totalKgAdquiridos} kg</p>
                </div>
                <div className={styles.campoGrupo}>
                  <label className={styles.campoLabel}>Ahorro estimado</label>
                  <p className={styles.perfilNombre}>${estadisticas.ahorroEstimado.toFixed(2)}</p>
                </div>
              </div>
              <p className={styles.toggleSub}>{estadisticas.mensajeAhorro}</p>
            </section>
          )}

          {/* Notificaciones */}
          <section className={styles.seccion}>
            <h2 className={styles.seccionTitulo}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              Notificaciones
            </h2>

            {[
              { label: 'Estado de mis pedidos', sub: 'Cuando tu lote esté listo para retirar', val: notifPedidos, set: setNotifPedidos },
              { label: 'Nuevos lotes disponibles', sub: 'Alertas de lotes que coinciden con tus preferencias', val: notifNuevos, set: setNotifNuevos },
              { label: 'Notificaciones por email', sub: 'Resumen semanal de tu impacto', val: notifEmail, set: setNotifEmail },
              { label: 'Notificaciones por SMS', sub: 'Mensajes de texto para recordatorios urgentes', val: notifSMS, set: setNotifSMS },
            ].map((item, i) => (
              <div key={i} className={styles.toggleRow}>
                <div>
                  <p className={styles.toggleLabel}>{item.label}</p>
                  <p className={styles.toggleSub}>{item.sub}</p>
                </div>
                <button
                  className={`${styles.toggle} ${item.val ? styles.toggleOn : ''}`}
                  onClick={() => item.set(!item.val)}
                  aria-pressed={item.val}
                >
                  <span className={styles.toggleThumb}/>
                </button>
              </div>
            ))}
          </section>

          {/* Seguridad */}
          <section className={styles.seccion}>
            <h2 className={styles.seccionTitulo}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Seguridad
            </h2>

            <div className={styles.campos}>
              <div className={styles.campoGrupo}>
                <label className={styles.campoLabel}>Contraseña actual</label>
                <input type="password" placeholder="••••••••" className={styles.campoInput} />
              </div>
              <div className={styles.campoGrupo}>
                <label className={styles.campoLabel}>Nueva contraseña</label>
                <input type="password" placeholder="••••••••" className={styles.campoInput} />
              </div>
              <div className={styles.campoGrupo}>
                <label className={styles.campoLabel}>Confirmar contraseña</label>
                <input type="password" placeholder="••••••••" className={styles.campoInput} />
              </div>
            </div>

            <div className={styles.sesionInfo}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Última sesión: hoy a las {new Date().toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' })} desde Quito
            </div>
          </section>

          {/* Preferencias */}
          <section className={styles.seccion}>
            <h2 className={styles.seccionTitulo}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              Preferencias de búsqueda
            </h2>

            <p className={styles.prefDesc}>Selecciona las categorías que más te interesan para recibir alertas personalizadas.</p>

            <div className={styles.categoriasGrid}>
              {['Panadería', 'Frutas y Verduras', 'Lácteos', 'Preparados', 'Carnes', 'Bebidas'].map(cat => (
                <label key={cat} className={styles.catCheck}>
                  <input type="checkbox" defaultChecked={['Panadería', 'Frutas y Verduras'].includes(cat)} className={styles.checkbox} />
                  <span>{cat}</span>
                </label>
              ))}
            </div>

            <div className={styles.campoGrupo} style={{ marginTop: '1rem' }}>
              <label className={styles.campoLabel}>Zona de preferencia en Quito</label>
              <select className={styles.campoInput}>
                {['Toda la ciudad', 'La Mariscal', 'La Floresta', 'González Suárez', 'Cumbayá', 'Cotocollao', 'Iñaquito', 'La Gasca'].map(z => (
                  <option key={z}>{z}</option>
                ))}
              </select>
            </div>
          </section>
        </div>

        {/* Botones de acción */}
        <div className={styles.acciones}>
          <button className={styles.btnGuardar} onClick={handleGuardar}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Guardar cambios
          </button>
          <button className={styles.btnCancelar}>Cancelar</button>
          <button className={styles.btnEliminar}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            Eliminar cuenta
          </button>
        </div>
      </div>
    </CompradorLayout>
  )
}