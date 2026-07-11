import { Link, useNavigate } from 'react-router-dom';
import styles from './DashboardComercioPage.module.css';

export default function DashboardComercioPage() {
  const navigate = useNavigate();
  const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Usuario';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };



  const handleNotificaciones = () => {
    navigate('/dashboard/comercio/notificaciones');
  };

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          <div className={styles.brand}>
            <h2>FoodLink</h2>
            <p>Dignidad y Abundancia</p>
          </div>

          <div className={styles.userProfile}>
            <div className={styles.avatar}></div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{nombreUsuario}</span>
              <span className={styles.userRole}>Administrador de Rescate</span>
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', color: window.location.pathname === '/dashboard' ? '#1F4D3C' : '#4F6359', backgroundColor: window.location.pathname === '/dashboard' ? '#C6E7D2' : 'transparent', textDecoration: 'none', fontSize: '14px', fontWeight: window.location.pathname === '/dashboard' ? 700 : 600 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Panel Control
            </Link>
            <Link to="/dashboard/comercio/mis-lotes" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', color: window.location.pathname === '/dashboard/comercio/mis-lotes' ? '#1F4D3C' : '#4F6359', backgroundColor: window.location.pathname === '/dashboard/comercio/mis-lotes' ? '#C6E7D2' : 'transparent', textDecoration: 'none', fontSize: '14px', fontWeight: window.location.pathname === '/dashboard/comercio/mis-lotes' ? 700 : 600 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
              Mis Lotes
            </Link>
            <Link to="/dashboard/comercio/reservas" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', color: window.location.pathname === '/dashboard/comercio/reservas' ? '#1F4D3C' : '#4F6359', backgroundColor: window.location.pathname === '/dashboard/comercio/reservas' ? '#C6E7D2' : 'transparent', textDecoration: 'none', fontSize: '14px', fontWeight: window.location.pathname === '/dashboard/comercio/reservas' ? 700 : 600 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Reservas
            </Link>
            <Link to="/dashboard/comercio/impacto" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', color: window.location.pathname === '/dashboard/comercio/impacto' ? '#1F4D3C' : '#4F6359', backgroundColor: window.location.pathname === '/dashboard/comercio/impacto' ? '#C6E7D2' : 'transparent', textDecoration: 'none', fontSize: '14px', fontWeight: window.location.pathname === '/dashboard/comercio/impacto' ? 700 : 600 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              Impacto
            </Link>
            <Link to="/dashboard/comercio/configuracion" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', color: window.location.pathname === '/dashboard/comercio/configuracion' ? '#1F4D3C' : '#4F6359', backgroundColor: window.location.pathname === '/dashboard/comercio/configuracion' ? '#C6E7D2' : 'transparent', textDecoration: 'none', fontSize: '14px', fontWeight: window.location.pathname === '/dashboard/comercio/configuracion' ? 700 : 600 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              Configuración
            </Link>
          </nav>
        </div>

        <div className={styles.sidebarBottom}>
          <Link to="#" className={styles.navItem}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            Ayuda
          </Link>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <h1>Panel de Control</h1>
          <div className={styles.headerActions}>
            <button className={styles.iconBtn} onClick={handleNotificaciones} style={{ cursor: 'pointer', background: 'none', border: 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </button>
            <div className={styles.locationBadge}>
              Quito Centro
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
          </div>
        </header>

        <div className={styles.actionRow}>
        </div>

        <section className={styles.bottomCards}>
          <div className={styles.heroCard}>
            <div className={styles.heroIconWrapper}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B5502E" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </div>
            <h3>Héroe del Mes</h3>
            <p>Has ayudado a proveer 3,500 raciones de comida este mes a 12 fundaciones aliadas.</p>
            <button className={styles.reportBtn}>Descargar Reporte</button>
          </div>

          <div className={styles.mapCard}>
            <div className={styles.cardHeaderFlex}>
              <h3>Mapa de Impacto Local</h3>
              <span>QUITO, ECUADOR</span>
            </div>
            <div className={styles.mapPlaceholder}>
              <div className={styles.mapDot1}></div>
              <div className={styles.mapDot2}></div>
              <div className={styles.mapDot3}></div>
            </div>
          </div>
        </section>

        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <span>INVERSIÓN RECUPERADA</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D1CCC1" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <div className={styles.statValue}>$850<span>.50</span></div>
            <div className={styles.statTrend}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
              Aumento de rescate este mes
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <span>REDISTRIBUIDO</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D1CCC1" strokeWidth="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
            </div>
            <div className={styles.statValue}>1,240 <span>kg</span></div>
            <div className={styles.statTrend}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
              Equivale a 500kg de CO2 ahorrados
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <span>RESERVAS PENDIENTES</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D1CCC1" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <div className={styles.statValueBrown}>14</div>
            <div className={styles.statInfo}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
              3 recolecciones en camino
            </div>
          </div>
        </section>

        <section className={styles.tableSection}>
          <div className={styles.tableHeader}>
            <h2>Lotes Recientes</h2>
            <Link to="#" className={styles.linkVerTodos}>Ver todos <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></Link>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>PRODUCTO / LOTE</th>
                  <th>CANTIDAD</th>
                  <th>PUBLICADO</th>
                  <th>ESTADO</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className={styles.productCell}>
                      <div className={styles.productImgPlaceholder1}></div>
                      <div>
                        <strong>Mix Frutas Tropicales</strong>
                        <span>#B-4492-Q</span>
                      </div>
                    </div>
                  </td>
                  <td>45 kg</td>
                  <td>Hace 2 horas</td>
                  <td><span className={`${styles.badge} ${styles.badgeActive}`}>ACTIVO</span></td>
                  <td><button className={styles.actionBtn}>&#8942;</button></td>
                </tr>
                <tr>
                  <td>
                    <div className={styles.productCell}>
                      <div className={styles.productImgPlaceholder2}></div>
                      <div>
                        <strong>Pan Artesanal Variado</strong>
                        <span>#B-4488-Q</span>
                      </div>
                    </div>
                  </td>
                  <td>12 kg</td>
                  <td>Hace 5 horas</td>
                  <td><span className={`${styles.badge} ${styles.badgeReserved}`}>RESERVADO</span></td>
                  <td><button className={styles.actionBtn}>&#8942;</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <footer className={styles.dashboardFooter}>
          <div className={styles.footerLeft}>
            <strong>FoodLink</strong>
            <span>© 2026 FoodLink Quito. Dignidad y Abundancia para todos.</span>
          </div>
          <div className={styles.footerRight}>
            <Link to="#">Privacidad</Link>
            <Link to="#">Términos</Link>
            <Link to="#">Contacto</Link>
            <Link to="#">Alianzas</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}