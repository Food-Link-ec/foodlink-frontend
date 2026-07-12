import { Link, useNavigate } from 'react-router-dom'
import ComercioLayout from '../components/ComercioLayout'
import styles from './DashboardComercioPage.module.css'

const LOTES_RECIENTES = [
  { id: '#B-4492-Q', nombre: 'Mix Frutas Tropicales', cantidad: '45 kg', hace: 'Hace 2 h', estado: 'activo',    img: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=80&q=70' },
  { id: '#B-4488-Q', nombre: 'Pan Artesanal Variado', cantidad: '12 kg', hace: 'Hace 5 h', estado: 'reservado', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=80&q=70' },
  { id: '#B-4470-Q', nombre: 'Vegetales de Temporada', cantidad: '20 kg', hace: '10 Jul',   estado: 'entregado', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=80&q=70' },
  { id: '#B-4465-Q', nombre: 'Lácteos Premium',       cantidad: '15 kg', hace: '8 Jul',    estado: 'borrador',  img: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=80&q=70' },
]

const ESTADO_CFG: Record<string, { label: string; cls: string }> = {
  activo:    { label: 'Activo',    cls: styles.badgeActivo },
  reservado: { label: 'Reservado', cls: styles.badgeReservado },
  entregado: { label: 'Entregado', cls: styles.badgeEntregado },
  borrador:  { label: 'Borrador',  cls: styles.badgeBorrador },
}

export default function DashboardComercioPage() {
  return (
    <ComercioLayout>
      <div className={styles.page}>

        {/* HERO OSCURO */}
        <section className={styles.hero}>
          <div className={styles.heroLeft}>
            <p className={styles.heroEyebrow}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              Inversión recuperada este mes
            </p>
            <div className={styles.heroMonto}>$850<span>.50</span></div>
            <p className={styles.heroSub}>Aumento sostenido · <strong>+12%</strong> vs mes anterior</p>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>1,240</span>
              <span className={styles.heroStatLabel}>kg rescatados</span>
            </div>
            <div className={styles.heroStatDiv}/>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>14</span>
              <span className={styles.heroStatLabel}>reservas pendientes</span>
            </div>
            <div className={styles.heroStatDiv}/>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>128</span>
              <span className={styles.heroStatLabel}>comercios aliados</span>
            </div>
          </div>
        </section>

        <div className={styles.body}>

          {/* COLUMNA PRINCIPAL */}
          <div className={styles.colMain}>

            {/* Stats rápidos */}
            <div className={styles.statsRow}>
              {[
                { label: 'Lotes activos hoy', val: '6', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>, color: styles.iconVerde },
                { label: 'Reservas pendientes', val: '14', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, color: styles.iconDorado },
                { label: 'CO₂ evitado (kg)', val: '500', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/></svg>, color: styles.iconVerde },
                { label: 'Beneficiarios este mes', val: '3.5k', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, color: styles.iconCoral },
              ].map((s, i) => (
                <div key={i} className={styles.statCard}>
                  <div className={`${styles.statIcon} ${s.color}`}>{s.icon}</div>
                  <div>
                    <span className={styles.statVal}>{s.val}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabla lotes recientes */}
            <div className={styles.tableCard}>
              <div className={styles.tableCardHeader}>
                <h2 className={styles.tableCardTitulo}>Lotes Recientes</h2>
                <Link to="/dashboard/comercio/mis-lotes" className={styles.linkVerTodos}>
                  Ver todos
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
              </div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Producto / Lote</th>
                    <th>Cantidad</th>
                    <th>Publicado</th>
                    <th>Estado</th>
                    <th/>
                  </tr>
                </thead>
                <tbody>
                  {LOTES_RECIENTES.map(l => (
                    <tr key={l.id}>
                      <td>
                        <div className={styles.prodCell}>
                          <img src={l.img} alt={l.nombre} className={styles.prodImg} />
                          <div>
                            <strong>{l.nombre}</strong>
                            <span>{l.id}</span>
                          </div>
                        </div>
                      </td>
                      <td>{l.cantidad}</td>
                      <td>{l.hace}</td>
                      <td><span className={`${styles.badge} ${ESTADO_CFG[l.estado].cls}`}>{ESTADO_CFG[l.estado].label}</span></td>
                      <td><button className={styles.actionBtn}>•••</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* COLUMNA LATERAL */}
          <div className={styles.colSide}>

            {/* Hero del mes */}
            <div className={styles.heroMesCard}>
              <div className={styles.heroMesIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <h3 className={styles.heroMesTitulo}>Héroe del Mes</h3>
              <p className={styles.heroMesSub}>Has ayudado a proveer <strong>3,500 raciones</strong> a 12 fundaciones aliadas en Quito.</p>
              <button className={styles.heroMesBtn}>Descargar reporte</button>
            </div>

            {/* Acción rápida */}
            <div className={styles.accionCard}>
              <h3 className={styles.accionTitulo}>Publicar nuevo lote</h3>
              <p className={styles.accionSub}>¿Tienes excedentes hoy? Publícalos en menos de 2 minutos.</p>
              <Link to="/dashboard/comercio/nuevo-lote" className={styles.accionBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Publicar lote
              </Link>
            </div>

            {/* Reservas urgentes */}
            <div className={styles.urgentesCard}>
              <div className={styles.urgentesHeader}>
                <h3 className={styles.urgentesTitulo}>Reservas urgentes</h3>
                <span className={styles.urgentesBadge}>3 hoy</span>
              </div>
              {[
                { org: 'Fundación Quito Solidario', hora: 'Hoy, 18:30', prod: 'Canasta Panadería' },
                { org: 'Comedor Dignidad', hora: 'Hoy, 20:00', prod: 'Caja Vegetales' },
                { org: 'Albergue El Buen Samaritano', hora: 'Mañana, 09:00', prod: 'Excedentes Menú' },
              ].map((r, i) => (
                <div key={i} className={styles.urgenteItem}>
                  <div className={styles.urgenteAvatar}>{r.org.charAt(0)}</div>
                  <div className={styles.urgenteInfo}>
                    <p className={styles.urgenteOrg}>{r.org}</p>
                    <p className={styles.urgenteProd}>{r.prod} · {r.hora}</p>
                  </div>
                  <Link to="/dashboard/comercio/reservas" className={styles.urgenteBtn}>Ver</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ComercioLayout>
  )
}