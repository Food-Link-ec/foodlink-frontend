import { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import styles from './AdminDashboardPage.module.css'

type ComercioResponse = { id: string; nombre: string; ruc: string; email: string; telefono: string }
type BeneficiarioResponse = { id: string; nombre: string; ruc: string; email: string }
type AnalyticsDashboardResponse = {
  totalComerciosRegistrados: number
  totalComerciosVerificados: number
  totalBeneficiariosVerificados: number
  totalCompradoresActivos: number
  totalLotesDisponibles: number
  totalLotesEntregados: number
  totalLotesExpirados: number
  totalKgRescatados: number
  totalCo2EvitadoKg: number
  totalPersonasBeneficiadas: number
  top5Comercios: { comercioId: string; nombreComercio: string; kgRescatados: number; lotesEntregados: number }[]
}

async function loadService() {
  try { return await import('../services/adminService') } catch { return null }
}

type Tab = 'comercios' | 'beneficiarios' | 'analytics'

export default function AdminDashboardPage() {
  const [comerciosPendientes, setComerciosPendientes] = useState<ComercioResponse[]>([])
  const [beneficiariosPendientes, setBeneficiariosPendientes] = useState<BeneficiarioResponse[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsDashboardResponse | null>(null)
  const [tab, setTab] = useState<Tab>('comercios')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    loadService().then(async svc => {
      if (!svc) { setCargando(false); return }
      const [comercios, beneficiarios, analyticsData] = await Promise.all([
        svc.getComerciosPendientes().catch(() => []),
        svc.getBeneficiariosPendientes().catch(() => []),
        svc.getAnalytics().catch(() => null),
      ])
      setComerciosPendientes(comercios)
      setBeneficiariosPendientes(beneficiarios)
      setAnalytics(analyticsData)
      setCargando(false)
    })
  }, [])

  const handleVerificarComercio = async (id: string) => {
    const svc = await loadService()
    if (svc) await svc.verificarComercio(id)
    setComerciosPendientes(prev => prev.filter(c => c.id !== id))
  }

  const handleRechazarComercio = async (id: string) => {
    const svc = await loadService()
    if (svc) await svc.rechazarComercio(id)
    setComerciosPendientes(prev => prev.filter(c => c.id !== id))
  }

  const handleVerificarBeneficiario = async (id: string) => {
    const svc = await loadService()
    if (svc) await svc.verificarBeneficiario(id)
    setBeneficiariosPendientes(prev => prev.filter(b => b.id !== id))
  }

  const badges = {
    comercios: comerciosPendientes.length,
    beneficiarios: beneficiariosPendientes.length,
  }

  return (
    <AdminLayout activeTab={tab} onTabChange={setTab} badges={badges}>
      <div className={styles.page}>

        {/* ── Header ── */}
        <div className={styles.pageHeader}>
          <div className={styles.headerTop}>
            <div>
              <h1 className={styles.titulo}>Panel de Administración</h1>
              <p className={styles.subtitulo}>Verifica actores y monitorea la plataforma FoodLink.</p>
            </div>
            {(comerciosPendientes.length + beneficiariosPendientes.length) > 0 && (
              <div className={styles.alertaBanner}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {comerciosPendientes.length + beneficiariosPendientes.length} pendiente(s) de verificación
              </div>
            )}
          </div>
        </div>

        {/* ── Cargando ── */}
        {cargando && (
          <div className={styles.cargando}>
            <div className={styles.spinner}/>
            <span>Cargando datos del servidor…</span>
          </div>
        )}

        {/* ══════════════ TAB COMERCIOS ══════════════ */}
        {!cargando && tab === 'comercios' && (
          <div className={styles.lista}>
            {comerciosPendientes.length === 0 ? (
              <div className={styles.vacio}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <p>No hay comercios pendientes de verificación.</p>
                <span>Todos los comercios han sido revisados.</span>
              </div>
            ) : comerciosPendientes.map(comercio => (
              <div key={comercio.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.cardAvatar}>{comercio.nombre.charAt(0)}</div>
                  <div className={styles.cardHeaderInfo}>
                    <h3 className={styles.cardNombre}>{comercio.nombre}</h3>
                    <span className={styles.cardTipoBadge}>Comercio</span>
                  </div>
                  <span className={styles.cardPendienteBadge}>Pendiente</span>
                </div>
                <div className={styles.cardDatos}>
                  <p className={styles.cardDato}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    RUC: <strong>{comercio.ruc}</strong>
                  </p>
                  <p className={styles.cardDato}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    {comercio.email}
                  </p>
                  <p className={styles.cardDato}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    {comercio.telefono}
                  </p>
                </div>
                <div className={styles.acciones}>
                  <button className={styles.btnVerificar} onClick={() => handleVerificarComercio(comercio.id)}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Verificar
                  </button>
                  <button className={styles.btnRechazar} onClick={() => handleRechazarComercio(comercio.id)}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══════════════ TAB BENEFICIARIOS ══════════════ */}
        {!cargando && tab === 'beneficiarios' && (
          <div className={styles.lista}>
            {beneficiariosPendientes.length === 0 ? (
              <div className={styles.vacio}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <p>No hay beneficiarios pendientes de verificación.</p>
                <span>Todas las organizaciones han sido revisadas.</span>
              </div>
            ) : beneficiariosPendientes.map(beneficiario => (
              <div key={beneficiario.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={`${styles.cardAvatar} ${styles.cardAvatarVerde}`}>{beneficiario.nombre.charAt(0)}</div>
                  <div className={styles.cardHeaderInfo}>
                    <h3 className={styles.cardNombre}>{beneficiario.nombre}</h3>
                    <span className={`${styles.cardTipoBadge} ${styles.cardTipoBadgeVerde}`}>Beneficiario</span>
                  </div>
                  <span className={styles.cardPendienteBadge}>Pendiente</span>
                </div>
                <div className={styles.cardDatos}>
                  <p className={styles.cardDato}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    RUC: <strong>{beneficiario.ruc}</strong>
                  </p>
                  <p className={styles.cardDato}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    {beneficiario.email}
                  </p>
                </div>
                <div className={styles.acciones}>
                  <button className={styles.btnVerificar} onClick={() => handleVerificarBeneficiario(beneficiario.id)}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Verificar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══════════════ TAB ANALYTICS ══════════════ */}
        {!cargando && tab === 'analytics' && (
          analytics ? (
            <div className={styles.analyticsWrap}>

              {/* Hero impacto */}
              <div className={styles.analyticsHero}>
                <div className={styles.analyticsHeroLeft}>
                  <p className={styles.analyticsEyebrow}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    Impacto total de la plataforma
                  </p>
                  <div className={styles.analyticsHeroNum}>
                    {analytics.totalKgRescatados}<span> kg</span>
                  </div>
                  <p className={styles.analyticsHeroSub}>
                    rescatados · <strong>{analytics.totalPersonasBeneficiadas} personas</strong> beneficiadas · <strong>{analytics.totalCo2EvitadoKg} kg CO₂</strong> evitado
                  </p>
                </div>
                <div className={styles.analyticsHeroStats}>
                  <div className={styles.analyticsHeroStat}>
                    <span className={styles.analyticsHeroStatNum}>{analytics.totalLotesEntregados}</span>
                    <span className={styles.analyticsHeroStatLabel}>lotes entregados</span>
                  </div>
                  <div className={styles.analyticsHeroDiv}/>
                  <div className={styles.analyticsHeroStat}>
                    <span className={styles.analyticsHeroStatNum}>{analytics.totalComerciosVerificados}</span>
                    <span className={styles.analyticsHeroStatLabel}>comercios activos</span>
                  </div>
                  <div className={styles.analyticsHeroDiv}/>
                  <div className={styles.analyticsHeroStat}>
                    <span className={styles.analyticsHeroStatNum}>{analytics.totalBeneficiariosVerificados}</span>
                    <span className={styles.analyticsHeroStatLabel}>beneficiarios</span>
                  </div>
                </div>
              </div>

              {/* Grid de métricas */}
              <div className={styles.statsGrid}>
                {/* Comercios */}
                <div className={styles.statCard}>
                  <div className={styles.statCardIcon} style={{ background: '#E8EFF7', color: '#1E3A5F' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  </div>
                  <h3 className={styles.statCardTitulo}>Comercios</h3>
                  <p className={styles.statCardDato}><span>Registrados</span><strong>{analytics.totalComerciosRegistrados}</strong></p>
                  <p className={styles.statCardDato}><span>Verificados</span><strong>{analytics.totalComerciosVerificados}</strong></p>
                  <div className={styles.statCardBar}>
                    <div className={styles.statCardBarFill} style={{ width: analytics.totalComerciosRegistrados ? `${(analytics.totalComerciosVerificados / analytics.totalComerciosRegistrados) * 100}%` : '0%', background: '#1E3A5F' }}/>
                  </div>
                </div>

                {/* Usuarios */}
                <div className={styles.statCard}>
                  <div className={styles.statCardIcon} style={{ background: 'var(--fl-verde-suave)', color: 'var(--fl-verde-bosque)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <h3 className={styles.statCardTitulo}>Usuarios</h3>
                  <p className={styles.statCardDato}><span>Beneficiarios</span><strong>{analytics.totalBeneficiariosVerificados}</strong></p>
                  <p className={styles.statCardDato}><span>Compradores activos</span><strong>{analytics.totalCompradoresActivos}</strong></p>
                  <div className={styles.statCardBar}>
                    <div className={styles.statCardBarFill} style={{ width: '72%', background: 'var(--fl-verde-bosque)' }}/>
                  </div>
                </div>

                {/* Lotes */}
                <div className={styles.statCard}>
                  <div className={styles.statCardIcon} style={{ background: '#FCEACB', color: '#C98418' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                  </div>
                  <h3 className={styles.statCardTitulo}>Lotes</h3>
                  <p className={styles.statCardDato}><span>Disponibles</span><strong>{analytics.totalLotesDisponibles}</strong></p>
                  <p className={styles.statCardDato}><span>Entregados</span><strong>{analytics.totalLotesEntregados}</strong></p>
                  <p className={styles.statCardDato}><span>Expirados</span><strong>{analytics.totalLotesExpirados}</strong></p>
                  <div className={styles.statCardBar}>
                    <div className={styles.statCardBarFill} style={{ width: analytics.totalLotesEntregados ? `${(analytics.totalLotesEntregados / (analytics.totalLotesEntregados + analytics.totalLotesExpirados + analytics.totalLotesDisponibles)) * 100}%` : '0%', background: '#C98418' }}/>
                  </div>
                </div>

                {/* Top 5 Comercios */}
                <div className={`${styles.statCard} ${styles.topComercios}`}>
                  <div className={styles.topComerciosHeader}>
                    <div className={styles.statCardIcon} style={{ background: 'var(--fl-coral-suave)', color: 'var(--fl-coral)' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                    </div>
                    <h3 className={styles.statCardTitulo}>Top 5 Comercios por Impacto</h3>
                  </div>
                  {analytics.top5Comercios?.length ? (
                    analytics.top5Comercios.map((c, i) => (
                      <div key={c.comercioId} className={styles.topRow}>
                        <span className={styles.topRowNombre}>
                          <span className={styles.topRank}>#{i + 1}</span>
                          {c.nombreComercio}
                        </span>
                        <span className={styles.topRowStats}>{c.kgRescatados} kg · {c.lotesEntregados} lotes</span>
                      </div>
                    ))
                  ) : (
                    <p className={styles.subtitulo}>Sin datos todavía.</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.vacio}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
              <p>No se pudo cargar el analytics.</p>
              <span>Verifica que el servidor esté disponible.</span>
            </div>
          )
        )}
      </div>
    </AdminLayout>
  )
}