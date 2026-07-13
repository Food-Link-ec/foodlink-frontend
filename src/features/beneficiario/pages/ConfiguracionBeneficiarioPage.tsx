import { useState } from 'react'
import BeneficiarioLayout from '../components/BeneficiarioLayout'
import styles from './ConfiguracionBeneficiarioPage.module.css'

export default function ConfiguracionBeneficiarioPage() {
  const nombre = localStorage.getItem('nombreUsuario') || 'Mi Organización'
  const email = localStorage.getItem('email') || 'org@email.com'
  const [notifNuevos, setNotifNuevos] = useState(true)
  const [notifConfirm, setNotifConfirm] = useState(true)
  const [notifEmail, setNotifEmail] = useState(false)
  const [guardado, setGuardado] = useState(false)

  const handleGuardar = () => { setGuardado(true); setTimeout(() => setGuardado(false), 2500) }

  return (
    <BeneficiarioLayout>
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <h1 className={styles.titulo}>Configuración</h1>
          <p className={styles.subtitulo}>Administra la información y preferencias de tu organización.</p>
        </div>

        {guardado && <div className={styles.toast}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>Cambios guardados correctamente</div>}

        <div className={styles.grid}>
          <section className={styles.seccion}>
            <h2 className={styles.seccionTitulo}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Información de la organización</h2>
            <div className={styles.campos}>
              {[['Nombre de la organización', nombre, 'text'], ['Tipo de organización', 'Fundación', 'text'], ['RUC / NIT', '1790987654001', 'text'], ['Teléfono', '+593 99 111 2222', 'tel'], ['Correo electrónico', email, 'email'], ['Dirección', 'Av. Amazonas N39-61, Iñaquito, Quito', 'text']].map(([label, val, type]) => (
                <div key={label} className={styles.campo}><label className={styles.label}>{label}</label><input type={type} defaultValue={val} className={styles.input} /></div>
              ))}
              <div className={styles.campo}>
                <label className={styles.label}>Descripción de la organización</label>
                <textarea className={`${styles.input} ${styles.textarea}`} rows={3} defaultValue="Fundación comprometida con la seguridad alimentaria de familias vulnerables en Quito." />
              </div>
            </div>
          </section>

          <section className={styles.seccion}>
            <h2 className={styles.seccionTitulo}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>Notificaciones</h2>
            {[
              {label:'Nuevos lotes disponibles', sub:'Alertas de donaciones que coinciden con tus necesidades', val:notifNuevos, set:setNotifNuevos},
              {label:'Confirmación de solicitudes', sub:'Cuando el comercio confirme o rechace tu pedido', val:notifConfirm, set:setNotifConfirm},
              {label:'Resumen semanal por email', sub:'Reporte de donaciones y estadísticas semanales', val:notifEmail, set:setNotifEmail},
            ].map((item,i) => (
              <div key={i} className={styles.toggleRow}>
                <div><p className={styles.toggleLabel}>{item.label}</p><p className={styles.toggleSub}>{item.sub}</p></div>
                <button className={`${styles.toggle} ${item.val ? styles.toggleOn : ''}`} onClick={() => item.set(!item.val)}><span className={styles.toggleThumb}/></button>
              </div>
            ))}

            <h2 className={styles.seccionTitulo} style={{marginTop:'1.25rem'}}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Seguridad</h2>
            <div className={styles.campos}>
              {[['Contraseña actual','password'],['Nueva contraseña','password'],['Confirmar contraseña','password']].map(([label,type]) => (
                <div key={label} className={styles.campo}><label className={styles.label}>{label}</label><input type={type} placeholder="••••••••" className={styles.input} /></div>
              ))}
            </div>

            <h2 className={styles.seccionTitulo} style={{marginTop:'1.25rem'}}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>Preferencias de búsqueda</h2>
            <p className={styles.prefDesc}>Categorías de alimentos que necesita tu organización:</p>
            <div className={styles.categoriasGrid}>
              {['Panadería','Frutas y Verduras','Lácteos','Preparados','Carnes','Bebidas'].map(c => (
                <label key={c} className={styles.catCheck}>
                  <input type="checkbox" defaultChecked={['Panadería','Frutas y Verduras','Preparados'].includes(c)} className={styles.checkbox} />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <div className={styles.acciones}>
          <button className={styles.btnGuardar} onClick={handleGuardar}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>Guardar cambios</button>
          <button className={styles.btnCancelar}>Cancelar</button>
        </div>
      </div>
    </BeneficiarioLayout>
  )
}