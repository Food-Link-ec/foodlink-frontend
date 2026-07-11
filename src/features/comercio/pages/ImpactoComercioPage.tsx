import { useNavigate, Link } from 'react-router-dom';

export default function ImpactoComercioPage() {
  const navigate = useNavigate();
  const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Usuario';

  const metricas = [
    { titulo: 'TOTAL RESCATADO (KG)', valor: '12,480', unidad: 'kg', trend: '+12% vs mes anterior', iconBg: '#F5DDC3', iconColor: '#873e23', path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
    { titulo: 'BENEFICIARIOS', valor: '4,250', unidad: 'personas', trend: '8 nuevas fundaciones', iconBg: '#C6E7D2', iconColor: '#1F4D3C', path: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 12v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
    { titulo: 'EMPRESAS ACTIVAS', valor: '128', unidad: 'locales', trend: '45% Restaurantes', iconBg: '#FAD8D2', iconColor: '#B5502E', path: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10' }
  ];

  const historial = [
    { negocio: 'Restaurante La Pradera', lote: 'Frutas y Verduras Mixtas', modalidad: 'Donación', peso: '45.5 kg', estado: 'Completado', colorBg: '#C6E7D2', colorText: '#1F4D3C', icon: 'M5 12l5 5L20 7' },
    { negocio: 'Panadería Quito Sur', lote: 'Lote de Pan Artesanal', modalidad: 'Venta', peso: '12.0 kg', estado: 'Pendiente', colorBg: '#F5DDC3', colorText: '#873e23', icon: 'M12 2v10l4.5 4.5' },
    { negocio: 'Supermaxi Carolina', lote: 'Productos Lácteos', modalidad: 'Donación', peso: '88.2 kg', estado: 'En Camino', colorBg: '#FAD8D2', colorText: '#B5502E', icon: 'M5 12h14M12 5l7 7-7 7' }
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleNotificaciones = () => {
    navigate('/dashboard/comercio/notificaciones');
  };

  return (
    <div style={{ backgroundColor: '#FAF7F0', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', color: '#2C3E35', display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', borderBottom: '1px dashed #D6D0C4', backgroundColor: '#FAF7F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <h2 style={{ margin: 0, color: '#1F4D3C', fontSize: '24px', fontWeight: 800 }}>FoodLink</h2>
          <nav style={{ display: 'flex', gap: '24px' }}>
            <span style={{ fontSize: '14px', color: '#4F6359', fontWeight: 500, cursor: 'pointer' }}>Explorar</span>
            <span style={{ fontSize: '14px', color: '#A64322', fontWeight: 700, cursor: 'pointer', borderBottom: '2px solid #A64322', paddingBottom: '4px' }}>Impacto</span>
            <span style={{ fontSize: '14px', color: '#4F6359', fontWeight: 500, cursor: 'pointer' }}>Nosotros</span>
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={handleNotificaciones} style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F6359" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </button>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#EBE7DF', overflow: 'hidden' }}>
            <img src={`https://ui-avatars.com/api/?name=${nombreUsuario}&background=1F4D3C&color=fff`} alt="Perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <button style={{ padding: '8px 16px', backgroundColor: '#A64322', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Donar Alimento</button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        <aside style={{ width: '260px', borderRight: '1px dashed #D6D0C4', padding: '32px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#FAF7F0' }}>
          <div>
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ margin: '0 0 4px 0', color: '#1F4D3C', fontSize: '20px', fontWeight: 800 }}>FoodLink Quito</h2>
              <span style={{ fontSize: '12px', color: '#667A70', fontWeight: 500 }}>Administrador de Rescate</span>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', color: '#4F6359', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                Panel Control
              </Link>
              <Link to="/dashboard/comercio/mis-lotes" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', color: '#4F6359', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                Mis Lotes
              </Link>
              <Link to="/dashboard/comercio/reservas" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', color: '#4F6359', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Reservas
              </Link>
              <Link to="/dashboard/comercio/impacto" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', backgroundColor: '#C6E7D2', color: '#1F4D3C', textDecoration: 'none', fontSize: '14px', fontWeight: 700 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                Impacto
              </Link>
              <Link to="/dashboard/comercio/configuracion" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', color: window.location.pathname === '/dashboard/comercio/configuracion' ? '#1F4D3C' : '#4F6359', backgroundColor: window.location.pathname === '/dashboard/comercio/configuracion' ? '#C6E7D2' : 'transparent', textDecoration: 'none', fontSize: '14px', fontWeight: window.location.pathname === '/dashboard/comercio/configuracion' ? 700 : 600 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                Configuración
              </Link>
            </nav>
          </div>

          <button onClick={handleLogout} style={{ width: '100%', padding: '12px', backgroundColor: 'transparent', border: '1px solid #D6D0C4', borderRadius: '10px', color: '#B5502E', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Cerrar Sesión
          </button>
        </aside>

        <main style={{ flex: 1, padding: '40px 48px' }}>
          <header style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '36px', color: '#1F4D3C', margin: '0 0 12px 0', fontWeight: 800, letterSpacing: '-0.5px' }}>Panel de Impacto Social</h1>
            <p style={{ color: '#4F6359', fontSize: '15px', margin: 0, maxWidth: '600px', lineHeight: '1.5' }}>Visualización en tiempo real del ecosistema de abundancia en Quito. Monitoreo de rescate, distribución y ahorro de carbono.</p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
            {metricas.map((m, i) => (
              <div key={i} style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #EBE7DF' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: m.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={m.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={m.path}></path></svg>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: m.iconColor }}>{m.trend}</span>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#667A70', letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>{m.titulo}</span>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#1F4D3C' }}>{m.valor} <span style={{ fontSize: '14px', fontWeight: 600, color: '#667A70' }}>{m.unidad}</span></div>
              </div>
            ))}
          </div>

          <section style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: '24px', marginBottom: '32px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '32px', border: '1px solid #EBE7DF', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', color: '#1F4D3C', fontSize: '20px', fontWeight: 800 }}>Redistribución Mensual</h3>
                  <span style={{ fontSize: '13px', color: '#667A70' }}>Kg de comida rescatados por mes durante el 2026</span>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#667A70', display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#873e23' }}></div>Meta</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#667A70', display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1F4D3C' }}></div>Real</span>
                </div>
              </div>
              <div style={{ flex: 1, minHeight: '200px', display: 'flex', alignItems: 'flex-end', borderBottom: '1px solid #EBE7DF', paddingBottom: '16px' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 20px', color: '#667A70', fontSize: '11px', fontWeight: 600 }}>
                  <span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#2A5C43', borderRadius: '16px', padding: '32px', color: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ margin: '0 0 32px 0', fontSize: '20px', fontWeight: 800, lineHeight: '1.3' }}>Distribución por Modalidad</h3>
                
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', fontWeight: 500 }}><span>Donación (Impacto Social)</span><span>65%</span></div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '65%', height: '100%', backgroundColor: '#B5502E' }}></div>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', fontWeight: 500 }}><span>Venta (Rescate Comercial)</span><span>25%</span></div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '25%', height: '100%', backgroundColor: '#F5DDC3' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', fontWeight: 500 }}><span>Recogida Directa</span><span>10%</span></div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '10%', height: '100%', backgroundColor: '#EBE7DF' }}></div>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '12px', fontSize: '13px', fontStyle: 'italic', lineHeight: '1.5', marginTop: '32px' }}>
                "La modalidad de donación creció un 15% este mes gracias a la alianza con el sector hotelero."
              </div>
            </div>
          </section>

          <section style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #EBE7DF', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', borderBottom: '1px solid #EBE7DF' }}>
              <h2 style={{ margin: 0, fontSize: '20px', color: '#1F4D3C', fontWeight: 800 }}>Lotes Recientes</h2>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#A64322', cursor: 'pointer' }}>Ver todo el historial</span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #EBE7DF', backgroundColor: '#FAF7F0' }}>
                  <th style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 700, color: '#667A70', letterSpacing: '0.5px' }}>NEGOCIO</th>
                  <th style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 700, color: '#667A70', letterSpacing: '0.5px' }}>LOTE</th>
                  <th style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 700, color: '#667A70', letterSpacing: '0.5px' }}>MODALIDAD</th>
                  <th style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 700, color: '#667A70', letterSpacing: '0.5px' }}>PESO</th>
                  <th style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 700, color: '#667A70', letterSpacing: '0.5px' }}>ESTADO</th>
                </tr>
              </thead>
              <tbody>
                {historial.map((item, index) => (
                  <tr key={index} style={{ borderBottom: index === historial.length - 1 ? 'none' : '1px solid #EBE7DF' }}>
                    <td style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: item.colorBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={item.colorText} strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                      </div>
                      <span style={{ fontSize: '14px', color: '#2C3E35', fontWeight: 500 }}>{item.negocio}</span>
                    </td>
                    <td style={{ padding: '20px 24px', fontSize: '14px', color: '#4F6359' }}>{item.lote}</td>
                    <td style={{ padding: '20px 24px' }}>
                      <span style={{ backgroundColor: '#C6E7D2', color: '#1F4D3C', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>{item.modalidad}</span>
                    </td>
                    <td style={{ padding: '20px 24px', fontSize: '14px', fontWeight: 700, color: '#1F4D3C' }}>{item.peso}</td>
                    <td style={{ padding: '20px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: item.colorText, fontSize: '13px', fontWeight: 600 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={item.icon}></path></svg>
                        {item.estado}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
}