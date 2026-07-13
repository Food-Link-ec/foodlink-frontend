import { useEffect, useState } from 'react'
import ComercioLayout from '../components/ComercioLayout'
import { getMiImpacto, descargarReportePDF } from '../../impacto/services/impactoService'
import type { ImpactoComercioResponse } from '../../impacto/services/impactoService'
import styles from './ImpactoComercioPage.module.css'

const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul']
const KG_MESES = [320, 480, 290, 650, 820, 940, 1240]
const MAX = Math.max(...KG_MESES)

const HISTORIAL = [
  { negocio:'Restaurante La Pradera', lote:'Frutas y Verduras Mixtas', modalidad:'Donación', peso:'45.5 kg', estado:'completado' },
  { negocio:'Panadería Quito Sur', lote:'Lote de Pan Artesanal', modalidad:'Venta', peso:'12.0 kg', estado:'pendiente' },
  { negocio:'Supermaxi Carolina', lote:'Productos Lácteos', modalidad:'Donación', peso:'88.2 kg', estado:'en_camino' },
]

const EST_CFG: Record<string, { label: string; cls: string }> = {
  completado: { label: 'Completado', cls: styles.estCompletado },
  pendiente:  { label: 'Pendiente',  cls: styles.estPendiente },
  en_camino:  { label: 'En camino',  cls: styles.estCamino },
}

export default function ImpactoComercioPage() {
  const [impacto, setImpacto] = useState<ImpactoComercioResponse | null>(null)
  const [descargando, setDescargando] = useState(false)
  const [errorPdf, setErrorPdf] = useState<string | null>(null)

  useEffect(() => {
    let cancelado = false
    getMiImpacto().then((data) => { if (!cancelado) setImpacto(data) }).catch(() => {})
    return () => { cancelado = true }
  }, [])

  const handleDescargarPdf = async () => {
    setErrorPdf(null)
    setDescargando(true)
    try {
      await descargarReportePDF()
    } catch {
      setErrorPdf('Error al descargar el reporte')
    } finally {
      setDescargando(false)
    }
  }

  const stats = impacto ? [
    { num: impacto.totalKgRescatados.toLocaleString('es-EC'), unit: 'kg', label: 'Total rescatado', sub: `${impacto.kgRescatadosMesActual.toFixed(1)} kg este mes`, color: styles.statVerde },
    { num: impacto.totalPersonasBeneficiadas.toLocaleString('es-EC'), unit: 'personas', label: 'Beneficiarios', sub: impacto.tituloLogro, color: styles.statDorado },
    { num: impacto.totalLotesEntregados.toLocaleString('es-EC'), unit: 'lotes', label: 'Lotes entregados', sub: impacto.descripcionLogro, color: styles.statCoral },
    { num: impacto.totalCo2EvitadoKg.toLocaleString('es-EC'), unit: 'kg CO₂', label: 'Emisiones evitadas', sub: impacto.mensajeImpacto, color: styles.statVerde },
  ] : [
    { num:'—', unit:'kg', label:'Total rescatado', sub:'Cargando…', color: styles.statVerde },
    { num:'—', unit:'personas', label:'Beneficiarios', sub:'Cargando…', color: styles.statDorado },
    { num:'—', unit:'lotes', label:'Lotes entregados', sub:'Cargando…', color: styles.statCoral },
    { num:'—', unit:'kg CO₂', label:'Emisiones evitadas', sub:'Cargando…', color: styles.statVerde },
  ]

  return (
    <ComercioLayout>
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.titulo}>Impacto Social</h1>
            <p className={styles.subtitulo}>Tu huella positiva en la comunidad de Quito.</p>
          </div>
          <button onClick={handleDescargarPdf} disabled={descargando} className={styles.statCard} style={{ cursor: 'pointer', flexDirection: 'row', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--fl-verde-musgo)' }}>
            📄 {descargando ? 'Generando…' : 'Descargar Certificado PDF'}
          </button>
        </div>
        {errorPdf && <p className={styles.subtitulo} style={{ color: '#B3452C' }}>{errorPdf}</p>}

        <div className={styles.statsGrid}>
          {stats.map((s,i) => (
            <div key={i} className={`${styles.statCard} ${s.color}`}>
              <span className={styles.statNum}>{s.num}</span>
              <span className={styles.statUnit}>{s.unit}</span>
              <span className={styles.statLabel}>{s.label}</span>
              <span className={styles.statSub}>{s.sub}</span>
            </div>
          ))}
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.graficoCard}>
            <h3 className={styles.cardTitulo}>Kg rescatados por mes</h3>
            <div className={styles.barChart}>
              {KG_MESES.map((val, i) => (
                <div key={i} className={styles.barCol}>
                  <span className={styles.barVal}>{val >= 1000 ? `${(val/1000).toFixed(1)}k` : val}</span>
                  <div className={styles.barWrap}>
                    <div className={`${styles.bar} ${i === KG_MESES.length-1 ? styles.barActual : ''}`} style={{ height:`${(val/MAX)*100}%` }}/>
                  </div>
                  <span className={styles.barLabel}>{MESES[i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.historialCard}>
            <h3 className={styles.cardTitulo}>Historial reciente</h3>
            <div className={styles.histLista}>
              {HISTORIAL.map((h,i) => (
                <div key={i} className={styles.histItem}>
                  <div className={styles.histAvatar}>{h.negocio.charAt(0)}</div>
                  <div className={styles.histInfo}>
                    <p className={styles.histNegocio}>{h.negocio}</p>
                    <p className={styles.histLote}>{h.lote} · {h.peso}</p>
                  </div>
                  <div className={styles.histRight}>
                    <span className={`${styles.histEst} ${EST_CFG[h.estado].cls}`}>{EST_CFG[h.estado].label}</span>
                    <span className={styles.histMod}>{h.modalidad}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ComercioLayout>
  )
}