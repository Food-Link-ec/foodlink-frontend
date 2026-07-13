import { Link } from 'react-router-dom'
import BeneficiarioLayout from '../components/BeneficiarioLayout'
import styles from './DashboardBeneficiario.module.css'

const LOTES_DESTACADOS = [
  { id:'1', nombre:'Pan Artesanal Variado', comercio:'Panadería El Trigo', zona:'La Mariscal', kg:'12 kg', caduca:'Hoy, 20:00', img:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=70', tag:'Urgente', tagVar:'urgente' },
  { id:'2', nombre:'Verduras Orgánicas Mix', comercio:'Mercado El Labrador', zona:'Cotocollao', kg:'20 kg', caduca:'Mañana, 10:00', img:'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&q=70', tag:'Fresco', tagVar:'verde' },
  { id:'3', nombre:'Canasta Frutas Tropicales', comercio:'La Frutería', zona:'La Floresta', kg:'15 kg', caduca:'Hoy, 18:00', img:'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300&q=70', tag:'Urgente', tagVar:'urgente' },
]

const SOLICITUDES_RECIENTES = [
  { id:'#SOL-445', lote:'Pan Artesanal Variado', estado:'pendiente', fecha:'Hoy, 09:15' },
  { id:'#SOL-442', lote:'Vegetales de Temporada', estado:'confirmada', fecha:'Ayer, 14:30' },
  { id:'#SOL-438', lote:'Frutas Tropicales Mix', estado:'retirada', fecha:'10 Jul' },
]

const EST_CFG: Record<string, { label: string; cls: string }> = {
  pendiente:  { label: 'Pendiente',  cls: styles.estPendiente },
  confirmada: { label: 'Confirmada', cls: styles.estConfirmada },
  retirada:   { label: 'Retirada',   cls: styles.estRetirada },
}

export default function DashboardBeneficiario() {
  return (
    <BeneficiarioLayout>
      <div className={styles.page}>

        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroLeft}>
            <p className={styles.heroEyebrow}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              Impacto acumulado este mes
            </p>
            <div className={styles.heroMonto}>145<span> kg</span></div>
            <p className={styles.heroSub}>recibidos de <strong>8 comercios aliados</strong> · equivale a <strong>480 raciones</strong></p>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}><span className={styles.heroStatNum}>12</span><span className={styles.heroStatLabel}>solicitudes este mes</span></div>
            <div className={styles.heroStatDiv}/>
            <div className={styles.heroStat}><span className={styles.heroStatNum}>2</span><span className={styles.heroStatLabel}>en proceso ahora</span></div>
            <div className={styles.heroStatDiv}/>
            <div className={styles.heroStat}><span className={styles.heroStatNum}>18 kg</span><span className={styles.heroStatLabel}>CO₂ evitado</span></div>
          </div>
        </section>

        <div className={styles.body}>
          <div className={styles.colMain}>

            {/* Stats rápidos */}
            <div className={styles.statsRow}>
              {[
                { label: 'Alimentos recibidos', val: '145 kg', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>, cls: styles.iconVerde },
                { label: 'Raciones equivalentes', val: '480', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, cls: styles.iconDorado },
                { label: 'Solicitudes en proceso', val: '2', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, cls: styles.iconCoral },
                { label: 'Lotes disponibles hoy', val: '8', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>, cls: styles.iconVerde },
              ].map((s, i) => (
                <div key={i} className={styles.statCard}>
                  <div className={`${styles.statIcon} ${s.cls}`}>{s.icon}</div>
                  <div>
                    <span className={styles.statVal}>{s.val}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Lotes disponibles ahora */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitulo}>Lotes disponibles ahora</h2>
                <Link to="/dashboard/beneficiario/lotes" className={styles.linkVerTodos}>
                  Ver todos
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
              </div>
              <div className={styles.lotesGrid}>
                {LOTES_DESTACADOS.map(l => (
                  <div key={l.id} className={styles.loteCard}>
                    <div className={styles.loteImgWrap}>
                      <img src={l.img} alt={l.nombre} className={styles.loteImg} />
                      <span className={`${styles.loteTag} ${styles[`tag_${l.tagVar}`]}`}>{l.tag}</span>
                    </div>
                    <div className={styles.loteBody}>
                      <h3 className={styles.loteNombre}>{l.nombre}</h3>
                      <p className={styles.loteComercio}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {l.comercio} · {l.zona}
                      </p>
                      <div className={styles.loteMeta}>
                        <span>{l.kg}</span>
                        <span>Caduca: {l.caduca}</span>
                      </div>
                      <Link to="/dashboard/beneficiario/lotes" className={styles.btnSolicitar}>
                        Solicitar donación
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMNA LATERAL */}
          <div className={styles.colSide}>

            {/* Solicitudes recientes */}
            <div className={styles.solicitudesCard}>
              <div className={styles.solicitudesHeader}>
                <h3 className={styles.solicitudesTitulo}>Mis últimas solicitudes</h3>
                <Link to="/dashboard/beneficiario/solicitudes" className={styles.solicitudesVerTodas}>Ver todas</Link>
              </div>
              {SOLICITUDES_RECIENTES.map(s => (
                <div key={s.id} className={styles.solicitudItem}>
                  <div className={styles.solicitudInfo}>
                    <p className={styles.solicitudId}>{s.id}</p>
                    <p className={styles.solicitudLote}>{s.lote}</p>
                    <span className={styles.solicitudFecha}>{s.fecha}</span>
                  </div>
                  <span className={`${styles.solicitudEst} ${EST_CFG[s.estado].cls}`}>
                    {EST_CFG[s.estado].label}
                  </span>
                </div>
              ))}
            </div>

            {/* Card de ayuda */}
            <div className={styles.ayudaCard}>
              <div className={styles.ayudaIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <h3 className={styles.ayudaTitulo}>¿Cómo funciona?</h3>
              <p className={styles.ayudaSub}>Explora los lotes disponibles, solicita donaciones y coordina el retiro con el comercio.</p>
              <Link to="/dashboard/beneficiario/lotes" className={styles.ayudaBtn}>
                Explorar lotes
              </Link>
            </div>

            {/* Próximo retiro */}
            <div className={styles.retiroCard}>
              <div className={styles.retiroHeader}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>Próximo retiro</span>
              </div>
              <p className={styles.retiroLote}>Vegetales de Temporada</p>
              <p className={styles.retiroDetalle}>Mercado El Labrador · Mañana, 10:00</p>
              <div className={styles.retiroCodigo}>
                <span>Código:</span>
                <span className={styles.retiroCodigoVal}>FL-442-QA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BeneficiarioLayout>
  )
}