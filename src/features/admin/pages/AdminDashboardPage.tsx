import { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import styles from './AdminDashboardPage.module.css'

/* ── Tipos e imports del service real (si existe) ── */
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

/* Carga dinámica del service real para no romper si aún no existe */
async function loadService() {
  try {
    return await import('../services/adminService')
  } catch {
    return null
  }
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

  const totalPendientes = comerciosPendientes.length + beneficiariosPendientes.length

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
            {totalPendientes > 0 && (
              <div className={styles.alertaBanner}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {totalPendientes} pendiente{totalPendientes > 1 ? 's' : ''} de verificación
              </div>
            )}
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === 'comercios' ? styles.tabActivo : ''}`}
            onClick={() => setTab('comercios')}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Comercios
            {comerciosPendientes.length > 0 && (
              <span className={styles.tabBadge}>{comerciosPendientes.length}</span>
            )}
          </button>
          <button
            className={`${styles.tab} ${tab === 'beneficiarios' ? styles.tabActivo : ''}`}
            onClick={() => setTab('beneficiarios')}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Beneficiarios
            {beneficiariosPendientes.length > 0 && (
              <span className={styles.tabBadge}>{beneficiariosPendientes.length}</span>
            )}
          </button>
          <button
            className={`${styles.tab} ${tab === 'analytics' ? styles.tabActivo : ''}`}
            onClick={() => setTab('analytics')}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
            Analytics
          </button>
        </div>

        {/* ── Estado de carga ── */}
        {cargando && (
          <div className={styles.cargando}>
            <div className={styles.spinner}/>
            <span>Cargando datos del servidor…</span>
          </div>
        )}

        {/* ── Tab: Comercios ── */}
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
            ) : (
              comerciosPendientes.map(comercio => (
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
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
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
              ))
            )}
          </div>
        )}

        {/* ── Tab: Beneficiarios ── */}
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
            ) : (
              beneficiariosPendientes.map(beneficiario => (
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
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
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
              ))
            )}
          </div>
        )}

        {/* ── Tab: Analytics ── */}
        {!cargando && tab === 'analytics' && (
          analytics ? (
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <h3 className={styles.statCardTitulo}>Comercios</h3>
                <p className={styles.statCardDato}><span>Registrados</span><strong>{analytics.totalComerciosRegistrados}</strong></p>
                <p className={styles.statCardDato}><span>Verificados</span><strong>{analytics.totalComerciosVerificados}</strong></p>
              </div>
              <div className={styles.statCard}>
                <h3 className={styles.statCardTitulo}>Usuarios</h3>
                <p className={styles.statCardDato}><span>Beneficiarios</span><strong>{analytics.totalBeneficiariosVerificados}</strong></p>
                <p className={styles.statCardDato}><span>Compradores activos</span><strong>{analytics.totalCompradoresActivos}</strong></p>
              </div>
              <div className={styles.statCard}>
                <h3 className={styles.statCardTitulo}>Lotes</h3>
                <p className={styles.statCardDato}><span>Disponibles</span><strong>{analytics.totalLotesDisponibles}</strong></p>
                <p className={styles.statCardDato}><span>Entregados</span><strong>{analytics.totalLotesEntregados}</strong></p>
                <p className={styles.statCardDato}><span>Expirados</span><strong>{analytics.totalLotesExpirados}</strong></p>
              </div>
              <div className={`${styles.statCard} ${styles.statCardImpacto}`}>
                <h3 className={styles.statCardTitulo}>Impacto Total</h3>
                <p className={styles.statCardDato}><span>Kg rescatados</span><strong>{analytics.totalKgRescatados} kg</strong></p>
                <p className={styles.statCardDato}><span>CO₂ evitado</span><strong>{analytics.totalCo2EvitadoKg} kg</strong></p>
                <p className={styles.statCardDato}><span>Personas beneficiadas</span><strong>{analytics.totalPersonasBeneficiadas}</strong></p>
              </div>
              <div className={`${styles.statCard} ${styles.statCardImpacto} ${styles.topComercios}`}>
                <h3 className={styles.statCardTitulo}>Top 5 Comercios por Impacto</h3>
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