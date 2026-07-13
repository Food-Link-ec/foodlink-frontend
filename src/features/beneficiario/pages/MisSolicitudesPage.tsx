import { useState } from 'react'
import BeneficiarioLayout from '../components/BeneficiarioLayout'
import styles from './MisSolicitudesPage.module.css'

const SOLICITUDES = [
  { id:'#SOL-445', lote:'Pan Artesanal Variado', comercio:'Panadería El Trigo', kg:'12 kg', estado:'pendiente', fecha:'Hoy, 09:15', horario:'Hoy, 18:00 – 20:00', codigo:'FL-445-QA', notas:'Preguntar por María en la entrada.' },
  { id:'#SOL-442', lote:'Vegetales de Temporada', comercio:'Mercado El Labrador', kg:'20 kg', estado:'confirmada', fecha:'Ayer, 14:30', horario:'Mañana, 10:00 – 12:00', codigo:'FL-442-QA', notas:'Acceder por el estacionamiento trasero.' },
  { id:'#SOL-438', lote:'Frutas Tropicales Mix', comercio:'La Frutería', kg:'15 kg', estado:'retirada', fecha:'10 Jul', horario:'10 Jul, 16:00 – 18:00', codigo:'FL-438-QA', notas:'Completado sin novedad.' },
  { id:'#SOL-431', lote:'Almuerzos del Día', comercio:'Catering Quito Fresh', kg:'5 raciones', estado:'cancelada', fecha:'8 Jul', horario:'—', codigo:'FL-431-QA', notas:'Cancelado por capacidad completa.' },
]

const EST_CFG: Record<string, { label: string; cls: string; dot: string }> = {
  pendiente:  { label: 'Pendiente',  cls: styles.estPendiente,  dot: '#C98418' },
  confirmada: { label: 'Confirmada', cls: styles.estConfirmada, dot: '#22C55E' },
  retirada:   { label: 'Retirada',   cls: styles.estRetirada,   dot: '#94A3B8' },
  cancelada:  { label: 'Cancelada',  cls: styles.estCancelada,  dot: '#EF4444' },
}

export default function MisSolicitudesPage() {
  const [filtro, setFiltro] = useState('Todas')
  const [expandido, setExpandido] = useState<string | null>(null)
  const [copiado, setCopiado] = useState<string | null>(null)

  const solicitudesFiltradas = SOLICITUDES.filter(s =>
    filtro === 'Todas' || s.estado === filtro.toLowerCase()
  )

  const copiar = (codigo: string) => {
    navigator.clipboard.writeText(codigo)
    setCopiado(codigo)
    setTimeout(() => setCopiado(null), 1800)
  }

  return (
    <BeneficiarioLayout>
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.titulo}>Mis Solicitudes</h1>
            <p className={styles.subtitulo}>Historial de donaciones solicitadas y su estado actual.</p>
          </div>
        </div>

        <div className={styles.statsRow}>
          {[ { label:'Pendientes', val:'1', bg:'#FCEACB', color:'#C98418' }, { label:'Confirmadas', val:'1', bg:'#DCFCE7', color:'#166534' }, { label:'Retiradas', val:'1', bg: 'var(--fl-bg)', color:'var(--fl-ink-soft)' }, { label:'Total', val:`${SOLICITUDES.length}`, bg: 'var(--fl-verde-suave)', color:'var(--fl-verde-bosque)' } ].map((s,i) => (
            <div key={i} className={styles.statCard} style={{ borderLeft: `3px solid ${s.color}` }}>
              <span className={styles.statVal} style={{ color: s.color }}>{s.val}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.filtros}>
          {['Todas','Pendiente','Confirmada','Retirada','Cancelada'].map(f => (
            <button key={f} onClick={() => setFiltro(f)} className={`${styles.pill} ${filtro === f ? styles.pillActivo : ''}`}>{f}</button>
          ))}
        </div>

        <div className={styles.lista}>
          {solicitudesFiltradas.map(s => {
            const cfg = EST_CFG[s.estado]
            const abierto = expandido === s.id
            return (
              <div key={s.id} className={`${styles.cardWrap} ${abierto ? styles.cardWrapAbierto : ''}`}>
                <div className={styles.card} onClick={() => setExpandido(abierto ? null : s.id)}>
                  <div className={styles.cardLeft}>
                    <span className={styles.cardId}>{s.id}</span>
                    <h3 className={styles.cardLote}>{s.lote}</h3>
                    <p className={styles.cardComercio}>{s.comercio} · {s.kg}</p>
                  </div>
                  <div className={styles.cardRight}>
                    <span className={`${styles.cardEst} ${cfg.cls}`}>
                      <span className={styles.estDot} style={{ background: cfg.dot }}/>
                      {cfg.label}
                    </span>
                    <span className={styles.cardFecha}>{s.fecha}</span>
                    <svg className={`${styles.chevron} ${abierto ? styles.chevronUp : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>

                {abierto && (
                  <div className={styles.detalle}>
                    <div className={styles.detalleGrid}>
                      <div className={styles.detalleDato}>
                        <span className={styles.detalleLabel}>Horario de retiro</span>
                        <span className={styles.detalleVal}>{s.horario}</span>
                      </div>
                      <div className={styles.detalleDato}>
                        <span className={styles.detalleLabel}>Código de retiro</span>
                        <div className={styles.codigoWrap}>
                          <span className={styles.codigoTexto}>{s.codigo}</span>
                          <button className={styles.copiBtn} onClick={() => copiar(s.codigo)}>
                            {copiado === s.codigo
                              ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                              : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                            }
                          </button>
                        </div>
                      </div>
                      <div className={styles.detalleDato}>
                        <span className={styles.detalleLabel}>Notas del comercio</span>
                        <span className={styles.detalleVal}>{s.notas}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </BeneficiarioLayout>
  )
}