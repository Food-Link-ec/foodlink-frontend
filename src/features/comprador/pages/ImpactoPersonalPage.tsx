import { useEffect, useState } from 'react'
import CompradorLayout from '../components/CompradorLayout'
import { getMisEstadisticas } from '../../perfil/services/perfilService'
import type { EstadisticasCompradorResponse } from '../../perfil/services/perfilService'
import styles from './ImpactoPersonalPage.module.css'

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul']
const AHORRO_MESES = [0, 0, 0, 0, 2.50, 5.00, 12.00]
const MAX = Math.max(...AHORRO_MESES)

const LOGROS = [
  { icon: '🌱', titulo: 'Primer Rescate', desc: 'Reservaste tu primer lote', obtenido: true },
  { icon: '🔥', titulo: 'Racha de 7 días', desc: 'Reservas consecutivas una semana', obtenido: true },
  { icon: '🌍', titulo: '10 kg CO₂ evitados', desc: 'Impacto ambiental significativo', obtenido: true },
  { icon: '🏆', titulo: 'Comprador Élite', desc: '20 lotes rescatados', obtenido: false },
  { icon: '💚', titulo: 'Embajador Verde', desc: 'Refiere 3 amigos a FoodLink', obtenido: false },
  { icon: '⭐', titulo: 'Rescatador del Mes', desc: 'Top 10% de compradores', obtenido: false },
]

export default function ImpactoPersonalPage() {
  const [stats, setStats] = useState<EstadisticasCompradorResponse | null>(null)

  useEffect(() => {
    let cancelado = false
    getMisEstadisticas().then((data) => { if (!cancelado) setStats(data) }).catch(() => {})
    return () => { cancelado = true }
  }, [])

  return (
    <CompradorLayout>
      <div className={styles.page}>

        {/* Header */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.titulo}>Mi Impacto Personal</h1>
            <p className={styles.subtitulo}>Tu huella positiva en Quito desde que te uniste a FoodLink.</p>
          </div>
          <div className={styles.nivelBadge}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            Nivel Rescatador Activo
          </div>
        </div>

        {/* Stats principales — ahorro y lotes son datos reales de /compradores/mis-estadisticas */}
        <div className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.statDestacado}`}>
            <div className={styles.statIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div>
              <span className={styles.statNum}>${(19.50).toFixed(2)}</span>
              <span className={styles.statLabel}>Ahorro acumulado</span>
              <span className={styles.statSub}>{stats?.mensajeAhorro ?? 'Desde que te uniste'}</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
            </div>
            <div>
              <span className={styles.statNum}>{(5.0).toFixed(1)} kg</span>
              <span className={styles.statLabel}>Alimento rescatado</span>
              <span className={styles.statSub}>Peso total adquirido</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <div>
              <span className={styles.statNum}>3</span>
              <span className={styles.statLabel}>Lotes rescatados</span>
              <span className={styles.statSub}>Total de compras</span>
            </div>
          </div>
        </div>

        <div className={styles.contentGrid}>
          {/* Gráfica de ahorro */}
          <div className={styles.graficoCard}>
            <h3 className={styles.cardTitulo}>Ahorro mensual</h3>
            <p className={styles.cardSub}>Últimos 7 meses en dólares</p>
            <div className={styles.barChart}>
              {AHORRO_MESES.map((val, i) => (
                <div key={i} className={styles.barCol}>
                  <span className={styles.barVal}>${val}</span>
                  <div className={styles.barWrap}>
                    <div
                      className={`${styles.bar} ${i === AHORRO_MESES.length - 1 ? styles.barActual : ''}`}
                      style={{ height: `${(val / MAX) * 100}%` }}
                    />
                  </div>
                  <span className={styles.barLabel}>{MESES[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progreso hacia siguiente nivel */}
          <div className={styles.nivelCard}>
            <h3 className={styles.cardTitulo}>Progreso de nivel</h3>
            <div className={styles.nivelActual}>
              <div className={styles.nivelIcono}>🌿</div>
              <div>
                <span className={styles.nivelNombre}>Rescatador Activo</span>
                <span className={styles.nivelDesc}>7 de 20 lotes para el siguiente nivel</span>
              </div>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: '35%' }}/>
            </div>
            <div className={styles.progressLabels}>
              <span>7 lotes</span>
              <span className={styles.progressMeta}>Meta: 20 lotes</span>
            </div>
            <div className={styles.siguienteNivel}>
              <div className={styles.nivelIcono} style={{ opacity: 0.5 }}>🏆</div>
              <div>
                <span className={styles.nivelNombre}>Rescatador Élite</span>
                <span className={styles.nivelDesc}>Accede a lotes exclusivos y descuentos extra</span>
              </div>
            </div>
          </div>
        </div>

        {/* CO2 visual */}
        <div className={styles.co2Card}>
          <div className={styles.co2Left}>
            <p className={styles.co2Eyebrow}>HUELLA AMBIENTAL EVITADA</p>
            <div className={styles.co2Num}>18 kg <span>CO₂</span></div>
            <p className={styles.co2Sub}>Equivale a no conducir un auto por 90 km, o cargar un celular durante 2,200 horas.</p>
          </div>
          <div className={styles.co2Stats}>
            <div className={styles.co2Stat}>
              <span className={styles.co2StatNum}>90</span>
              <span className={styles.co2StatLabel}>km sin conducir</span>
            </div>
            <div className={styles.co2Div}/>
            <div className={styles.co2Stat}>
              <span className={styles.co2StatNum}>3</span>
              <span className={styles.co2StatLabel}>árboles equivalentes</span>
            </div>
            <div className={styles.co2Div}/>
            <div className={styles.co2Stat}>
              <span className={styles.co2StatNum}>12 kg</span>
              <span className={styles.co2StatLabel}>comida rescatada</span>
            </div>
          </div>
        </div>

        {/* Logros */}
        <div className={styles.logrosSection}>
          <h3 className={styles.cardTitulo}>Mis Logros</h3>
          <p className={styles.cardSub}>Desbloquea insignias completando desafíos de rescate.</p>
          <div className={styles.logrosGrid}>
            {LOGROS.map((l, i) => (
              <div key={i} className={`${styles.logroCard} ${!l.obtenido ? styles.logroLocked : ''}`}>
                <span className={styles.logroIcon}>{l.icon}</span>
                <div>
                  <p className={styles.logroTitulo}>{l.titulo}</p>
                  <p className={styles.logroDesc}>{l.desc}</p>
                </div>
                {l.obtenido
                  ? <svg className={styles.logroCheck} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  : <svg className={styles.logroLock} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </CompradorLayout>
  )
}