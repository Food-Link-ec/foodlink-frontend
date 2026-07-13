import BeneficiarioLayout from '../components/BeneficiarioLayout'
import styles from './ImpactoBeneficiarioPage.module.css'

const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul']
const KG_MESES = [18, 35, 22, 48, 62, 88, 145]
const MAX = Math.max(...KG_MESES)

const HISTORIAL = [
  { lote:'Pan Artesanal Variado', comercio:'Panadería El Trigo', kg:'12 kg', fecha:'Hoy', estado:'recibida' },
  { lote:'Vegetales de Temporada', comercio:'Mercado El Labrador', kg:'20 kg', fecha:'Ayer', estado:'en_camino' },
  { lote:'Frutas Tropicales Mix', comercio:'La Frutería', kg:'15 kg', fecha:'10 Jul', estado:'recibida' },
]

export default function ImpactoBeneficiarioPage() {
  return (
    <BeneficiarioLayout>
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <h1 className={styles.titulo}>Impacto Social</h1>
          <p className={styles.subtitulo}>Tu contribución a la seguridad alimentaria de Quito.</p>
        </div>

        <div className={styles.statsGrid}>
          {[
            { num:'418', unit:'kg', label:'Alimentos recibidos', sub:'Desde que te uniste', verde: true },
            { num:'1,393', unit:'raciones', label:'Personas alimentadas', sub:'Impacto directo', verde: false },
            { num:'12', unit:'comercios', label:'Aliados activos', sub:'Donantes frecuentes', verde: false },
            { num:'48 kg', unit:'CO₂', label:'Emisiones evitadas', sub:'= 4 árboles plantados', verde: true },
          ].map((s,i) => (
            <div key={i} className={`${styles.statCard} ${s.verde ? styles.statVerde : ''}`}>
              <span className={styles.statNum}>{s.num}</span>
              <span className={styles.statUnit}>{s.unit}</span>
              <span className={styles.statLabel}>{s.label}</span>
              <span className={styles.statSub}>{s.sub}</span>
            </div>
          ))}
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.graficoCard}>
            <h3 className={styles.cardTitulo}>Alimentos recibidos por mes (kg)</h3>
            <div className={styles.barChart}>
              {KG_MESES.map((val, i) => (
                <div key={i} className={styles.barCol}>
                  <span className={styles.barVal}>{val}</span>
                  <div className={styles.barWrap}>
                    <div className={`${styles.bar} ${i === KG_MESES.length-1 ? styles.barActual : ''}`} style={{ height:`${(val/MAX)*100}%` }}/>
                  </div>
                  <span className={styles.barLabel}>{MESES[i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.historialCard}>
            <h3 className={styles.cardTitulo}>Donaciones recibidas</h3>
            {HISTORIAL.map((h,i) => (
              <div key={i} className={styles.histItem}>
                <div className={styles.histAvatar}>{h.comercio.charAt(0)}</div>
                <div className={styles.histInfo}>
                  <p className={styles.histLote}>{h.lote}</p>
                  <p className={styles.histComercio}>{h.comercio} · {h.kg}</p>
                </div>
                <div className={styles.histRight}>
                  <span className={`${styles.histEst} ${h.estado === 'recibida' ? styles.estRecibida : styles.estCamino}`}>{h.estado === 'recibida' ? 'Recibida' : 'En camino'}</span>
                  <span className={styles.histFecha}>{h.fecha}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.co2Card}>
          <div className={styles.co2Left}>
            <p className={styles.co2Eyebrow}>HUELLA AMBIENTAL EVITADA</p>
            <div className={styles.co2Num}>48 kg <span>CO₂</span></div>
            <p className={styles.co2Sub}>Equivale a no conducir un auto por 240 km, o plantar 4 árboles que absorben carbono durante un año.</p>
          </div>
          <div className={styles.co2Stats}>
            <div className={styles.co2Stat}><span className={styles.co2StatNum}>240</span><span className={styles.co2StatLabel}>km sin conducir</span></div>
            <div className={styles.co2Div}/>
            <div className={styles.co2Stat}><span className={styles.co2StatNum}>4</span><span className={styles.co2StatLabel}>árboles equivalentes</span></div>
            <div className={styles.co2Div}/>
            <div className={styles.co2Stat}><span className={styles.co2StatNum}>418 kg</span><span className={styles.co2StatLabel}>alimentos rescatados</span></div>
          </div>
        </div>
      </div>
    </BeneficiarioLayout>
  )
}