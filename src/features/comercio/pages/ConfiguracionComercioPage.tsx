import { useState } from 'react'
import ComercioLayout from '../components/ComercioLayout'
import styles from './ConfiguracionComercioPage.module.css'

export default function ConfiguracionComercioPage() {
  const nombre = localStorage.getItem('nombreUsuario') || 'Mi Negocio'
  const [notifEmail, setNotifEmail] = useState(true)
  const [notifPush, setNotifPush] = useState(true)
  const [notifSMS, setNotifSMS] = useState(false)
  const [guardado, setGuardado] = useState(false)

  const handleGuardar = () => { setGuardado(true); setTimeout(() => setGuardado(false), 2500) }

  return (
    <ComercioLayout>
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <h1 className={styles.titulo}>Configuración</h1>
          <p className={styles.subtitulo}>Administra la información y preferencias de tu negocio.</p>
        </div>

        {guardado && <div className={styles.toast}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>Cambios guardados correctamente</div>}

        <div className={styles.grid}>
          <section className={styles.seccion}>
            <h2 className={styles.seccionTitulo}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Información del negocio</h2>
            <div className={styles.perfilHeader}>
              <div className={styles.avatar}>{nombre.charAt(0)}</div>
              <div><p className={styles.perfilNombre}>{nombre}</p><p className={styles.perfilRol}>Administrador de Rescate</p></div>
            </div>
            <div className={styles.campos}>
              {[['Nombre del negocio', nombre, 'text'], ['RUC / NIT', '1790123456001', 'text'], ['Teléfono', '+593 98 765 4321', 'tel'], ['Dirección', 'Av. González Suárez, Quito', 'text'], ['Correo electrónico', 'negocio@email.com', 'email']].map(([label, val, type]) => (
                <div key={label} className={styles.campoGrupo}>
                  <label className={styles.campoLabel}>{label}</label>
                  <input type={type} defaultValue={val} className={styles.campoInput} />
                </div>
              ))}
            </div>
          </section>

          <section className={styles.seccion}>
            <h2 className={styles.seccionTitulo}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>Notificaciones</h2>
            {[{label:'Nuevas reservas', sub:'Cuando alguien reserve tu lote', val:notifEmail, set:setNotifEmail},{label:'Recordatorios de vencimiento', sub:'Alertas de lotes próximos a caducar', val:notifPush, set:setNotifPush},{label:'Notificaciones por SMS', sub:'Mensajes de texto para reservas urgentes', val:notifSMS, set:setNotifSMS}].map((item, i) => (
              <div key={i} className={styles.toggleRow}>
                <div><p className={styles.toggleLabel}>{item.label}</p><p className={styles.toggleSub}>{item.sub}</p></div>
                <button className={`${styles.toggle} ${item.val ? styles.toggleOn : ''}`} onClick={() => item.set(!item.val)}><span className={styles.toggleThumb}/></button>
              </div>
            ))}
            <h2 className={styles.seccionTitulo} style={{marginTop:'1.25rem'}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Seguridad</h2>
            <div className={styles.campos}>
              {[['Contraseña actual','password'],['Nueva contraseña','password'],['Confirmar contraseña','password']].map(([label, type]) => (
                <div key={label} className={styles.campoGrupo}><label className={styles.campoLabel}>{label}</label><input type={type} placeholder="••••••••" className={styles.campoInput} /></div>
              ))}
            </div>
          </section>
        </div>

        <div className={styles.acciones}>
          <button className={styles.btnGuardar} onClick={handleGuardar}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>Guardar cambios</button>
          <button className={styles.btnCancelar}>Cancelar</button>
        </div>
      </div>
    </ComercioLayout>
  )
}