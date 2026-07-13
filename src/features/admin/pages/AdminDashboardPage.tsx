import { useEffect, useState } from 'react'
import {
  getComerciosPendientes,
  getBeneficiariosPendientes,
  verificarComercio,
  rechazarComercio,
  verificarBeneficiario,
  getAnalytics,
} from '../services/adminService'
import type { ComercioResponse, BeneficiarioResponse, AnalyticsDashboardResponse } from '../services/adminService'
import styles from './AdminDashboardPage.module.css'

type Tab = 'comercios' | 'beneficiarios' | 'analytics'

export default function AdminDashboardPage() {
  const [comerciosPendientes, setComerciosPendientes] = useState<ComercioResponse[]>([])
  const [beneficiariosPendientes, setBeneficiariosPendientes] = useState<BeneficiarioResponse[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsDashboardResponse | null>(null)
  const [tab, setTab] = useState<Tab>('comercios')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    Promise.all([
      getComerciosPendientes().catch(() => []),
      getBeneficiariosPendientes().catch(() => []),
      getAnalytics().catch(() => null),
    ]).then(([comercios, beneficiarios, analyticsData]) => {
      setComerciosPendientes(comercios)
      setBeneficiariosPendientes(beneficiarios)
      setAnalytics(analyticsData)
      setCargando(false)
    })
  }, [])

  const handleVerificarComercio = async (id: string) => {
    await verificarComercio(id)
    setComerciosPendientes((prev) => prev.filter((c) => c.id !== id))
  }

  const handleRechazarComercio = async (id: string) => {
    await rechazarComercio(id)
    setComerciosPendientes((prev) => prev.filter((c) => c.id !== id))
  }

  const handleVerificarBeneficiario = async (id: string) => {
    await verificarBeneficiario(id)
    setBeneficiariosPendientes((prev) => prev.filter((b) => b.id !== id))
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.titulo}>Panel de Administración</h1>
        <p className={styles.subtitulo}>Verifica actores y monitorea la plataforma FoodLink.</p>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${tab === 'comercios' ? styles.tabActivo : ''}`} onClick={() => setTab('comercios')}>
          Comercios ({comerciosPendientes.length} pendientes)
        </button>
        <button className={`${styles.tab} ${tab === 'beneficiarios' ? styles.tabActivo : ''}`} onClick={() => setTab('beneficiarios')}>
          Beneficiarios ({beneficiariosPendientes.length} pendientes)
        </button>
        <button className={`${styles.tab} ${tab === 'analytics' ? styles.tabActivo : ''}`} onClick={() => setTab('analytics')}>
          Analytics
        </button>
      </div>

      {cargando && <p className={styles.subtitulo}>Cargando…</p>}

      {!cargando && tab === 'comercios' && (
        <div className={styles.lista}>
          {comerciosPendientes.length === 0 ? (
            <p className={styles.subtitulo}>No hay comercios pendientes.</p>
          ) : (
            comerciosPendientes.map((comercio) => (
              <div key={comercio.id} className={styles.card}>
                <h3 className={styles.cardNombre}>{comercio.nombre}</h3>
                <p className={styles.cardDato}>RUC: {comercio.ruc}</p>
                <p className={styles.cardDato}>Email: {comercio.email}</p>
                <p className={styles.cardDato}>Teléfono: {comercio.telefono}</p>
                <div className={styles.acciones}>
                  <button className={styles.btnVerificar} onClick={() => handleVerificarComercio(comercio.id)}>✅ Verificar</button>
                  <button className={styles.btnRechazar} onClick={() => handleRechazarComercio(comercio.id)}>❌ Rechazar</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {!cargando && tab === 'beneficiarios' && (
        <div className={styles.lista}>
          {beneficiariosPendientes.length === 0 ? (
            <p className={styles.subtitulo}>No hay beneficiarios pendientes.</p>
          ) : (
            beneficiariosPendientes.map((beneficiario) => (
              <div key={beneficiario.id} className={styles.card}>
                <h3 className={styles.cardNombre}>{beneficiario.nombre}</h3>
                <p className={styles.cardDato}>RUC: {beneficiario.ruc}</p>
                <p className={styles.cardDato}>Email: {beneficiario.email}</p>
                <div className={styles.acciones}>
                  <button className={styles.btnVerificar} onClick={() => handleVerificarBeneficiario(beneficiario.id)}>✅ Verificar</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {!cargando && tab === 'analytics' && (
        analytics ? (
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3 className={styles.statCardTitulo}>Comercios</h3>
              <p className={styles.statCardDato}>Total: {analytics.totalComerciosRegistrados}</p>
              <p className={styles.statCardDato}>Verificados: {analytics.totalComerciosVerificados}</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statCardTitulo}>Usuarios</h3>
              <p className={styles.statCardDato}>Beneficiarios: {analytics.totalBeneficiariosVerificados}</p>
              <p className={styles.statCardDato}>Compradores: {analytics.totalCompradoresActivos}</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statCardTitulo}>Lotes</h3>
              <p className={styles.statCardDato}>Disponibles: {analytics.totalLotesDisponibles}</p>
              <p className={styles.statCardDato}>Entregados: {analytics.totalLotesEntregados}</p>
              <p className={styles.statCardDato}>Expirados: {analytics.totalLotesExpirados}</p>
            </div>
            <div className={`${styles.statCard} ${styles.statCardImpacto}`}>
              <h3 className={styles.statCardTitulo}>Impacto Total</h3>
              <p className={styles.statCardDato}>Kg rescatados: {analytics.totalKgRescatados}</p>
              <p className={styles.statCardDato}>CO₂ evitado: {analytics.totalCo2EvitadoKg} kg</p>
              <p className={styles.statCardDato}>Personas: {analytics.totalPersonasBeneficiadas}</p>
            </div>
            <div className={`${styles.statCard} ${styles.statCardImpacto} ${styles.topComercios}`}>
              <h3 className={styles.statCardTitulo}>Top 5 Comercios por Impacto</h3>
              {analytics.top5Comercios?.length ? analytics.top5Comercios.map((c, i) => (
                <div key={c.comercioId} className={styles.topRow}>
                  <span>#{i + 1} {c.nombreComercio}</span>
                  <span>{c.kgRescatados} kg — {c.lotesEntregados} lotes</span>
                </div>
              )) : <p className={styles.cardDato}>Sin datos todavía.</p>}
            </div>
          </div>
        ) : (
          <p className={styles.subtitulo}>No se pudo cargar el analytics.</p>
        )
      )}
    </div>
  )
}
