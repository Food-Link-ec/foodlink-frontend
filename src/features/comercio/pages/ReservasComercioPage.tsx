import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function ReservasComercioPage() {
  const navigate = useNavigate();
  const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Jonathan Plaza';
  const [tabActiva, setTabActiva] = useState('Todas');

  const metricas = [
    { id: 1, titulo: 'PENDIENTES', valor: '12', pill: 'Por Confirmar', colorPill: '#F5DDC3', textPill: '#873e23' },
    { id: 2, titulo: 'CONFIRMADAS', valor: '45', pill: 'Hoy', colorPill: '#C6E7D2', textPill: '#1F4D3C' },
    { id: 3, titulo: 'RESCATADAS', valor: '328', pill: 'Este Mes', colorPill: '#FAD8D2', textPill: '#B5502E' },
    { id: 4, titulo: 'KG SALVADOS', valor: '1,2k', pill: 'Impacto Social', colorPill: '#F5DDC3', textPill: '#873e23' }
  ];

  const reservas = [
    { id: '#RES-8921', org: 'Fundación Quito Solidario', img: 'FQ', producto: 'Canasta Panadería Premium', detalle: '4.5 kg • Pan artesanal', estado: 'Pendiente', badgeBg: '#F5DDC3', badgeColor: '#873e23', fecha: 'Hoy, 18:30', lugar: 'Pickup Point A', accion: 'Confirmar' },
    { id: '#RES-8915', org: 'Comedor Dignidad', img: 'CD', producto: 'Caja Vegetales Orgánicos', detalle: '12 kg • Mezcla temporada', estado: 'Confirmada', badgeBg: '#C6E7D2', badgeColor: '#1F4D3C', fecha: 'Mañana, 09:00', lugar: 'Zona de Carga', accion: 'Detalles' },
    { id: '#RES-8890', org: 'Albergue El Buen Samaritano', img: 'AB', producto: 'Excedentes Menú del Día', detalle: '15 raciones • Sopas y Guisos', estado: 'Recogido', badgeBg: '#E8E6E1', badgeColor: '#667A70', fecha: 'Ayer, 20:15', lugar: 'Finalizado', accion: 'Icono' },
    { id: '#RES-8882', org: 'Niños del Inga', img: 'NI', producto: 'Pack Frutas Maduras', detalle: '8 kg • Variado', estado: 'Cancelada', badgeBg: '#FAD8D2', badgeColor: '#B5502E', fecha: '—', lugar: 'Problema logístico', accion: 'Refresh' }
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
            <span style={{ fontSize: '14px', color: '#4F6359', fontWeight: 500, cursor: 'pointer' }}>Impacto</span>
            <span style={{ fontSize: '14px', color: '#4F6359', fontWeight: 500, cursor: 'pointer' }}>Nosotros</span>
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={handleNotificaciones} style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F6359" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </button>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#EBE7DF', overflow: 'hidden' }}>
            <img src="https://ui-avatars.com/api/?name=Jonathan+Plaza&background=1F4D3C&color=fff" alt="Perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                Configuración
              </Link>
            </nav>

            <button onClick={() => navigate('/dashboard/comercio/nuevo-lote')} style={{ width: '100%', marginTop: '32px', padding: '14px', backgroundColor: '#A64322', color: '#FFFFFF', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 10px rgba(166, 67, 34, 0.2)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Nuevo Lote
            </button>
          </div>

          <div>
            <button onClick={handleLogout} style={{ width: '100%', padding: '12px', backgroundColor: 'transparent', border: '1px solid #D6D0C4', borderRadius: '10px', color: '#B5502E', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              Cerrar Sesión
            </button>
          </div>
        </aside>

        <main style={{ flex: 1, padding: '40px 48px' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontSize: '36px', color: '#1F4D3C', margin: '0 0 12px 0', fontWeight: 800, letterSpacing: '-0.5px' }}>Gestión de Reservas</h1>
              <p style={{ color: '#4F6359', fontSize: '15px', margin: 0 }}>Administre las solicitudes entrantes de organizaciones sociales y coordine el rescate digno de sus excedentes.</p>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', backgroundColor: '#EBE7DF', color: '#2C3E35', border: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              Filtrar
            </button>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
            {metricas.map((item) => (
              <div key={item.id} style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #EBE7DF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#4F6359', letterSpacing: '0.5px', marginBottom: '12px' }}>{item.titulo}</span>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '42px', fontWeight: 800, color: '#873e23', lineHeight: '1' }}>{item.valor}</span>
                  <div style={{ backgroundColor: item.colorPill, color: item.textPill, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>
                    {item.pill}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <section style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #EBE7DF', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #EBE7DF' }}>
              <div style={{ display: 'flex', gap: '32px' }}>
                <span onClick={() => setTabActiva('Todas')} style={{ fontSize: '14px', fontWeight: 700, color: tabActiva === 'Todas' ? '#A64322' : '#667A70', cursor: 'pointer', borderBottom: tabActiva === 'Todas' ? '2px solid #A64322' : 'none', paddingBottom: '4px' }}>Todas las reservas</span>
                <span onClick={() => setTabActiva('Hoy')} style={{ fontSize: '14px', fontWeight: 600, color: tabActiva === 'Hoy' ? '#A64322' : '#667A70', cursor: 'pointer' }}>Hoy</span>
                <span onClick={() => setTabActiva('Programadas')} style={{ fontSize: '14px', fontWeight: 600, color: tabActiva === 'Programadas' ? '#A64322' : '#667A70', cursor: 'pointer' }}>Programadas</span>
              </div>
              <div style={{ position: 'relative' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#667A70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '12px', top: '10px' }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="text" placeholder="Buscar por ONG o ID..." style={{ padding: '10px 10px 10px 36px', borderRadius: '10px', border: 'none', backgroundColor: '#FAF7F0', fontSize: '13px', width: '250px', outline: 'none' }} />
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #EBE7DF', backgroundColor: '#FAF7F0' }}>
                  <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 700, color: '#667A70', letterSpacing: '0.5px' }}>ORGANIZACIÓN</th>
                  <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 700, color: '#667A70', letterSpacing: '0.5px' }}>LOTE / PRODUCTO</th>
                  <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 700, color: '#667A70', letterSpacing: '0.5px' }}>ESTADO</th>
                  <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 700, color: '#667A70', letterSpacing: '0.5px' }}>RECOGIDA ESTIMADA</th>
                  <th style={{ padding: '16px 24px', fontSize: '12px', fontWeight: 700, color: '#667A70', letterSpacing: '0.5px', textAlign: 'right' }}>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((res, index) => (
                  <tr key={index} style={{ borderBottom: index === reservas.length - 1 ? 'none' : '1px solid #EBE7DF' }}>
                    <td style={{ padding: '20px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#EBE7DF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1F4D3C', fontWeight: 700, fontSize: '14px' }}>{res.img}</div>
                        <div>
                          <strong style={{ display: 'block', fontSize: '14px', color: '#1F4D3C', marginBottom: '4px' }}>{res.org}</strong>
                          <span style={{ fontSize: '12px', color: '#667A70' }}>ID: {res.id}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '20px 24px' }}>
                      <strong style={{ display: 'block', fontSize: '14px', color: '#2C3E35', marginBottom: '4px' }}>{res.producto}</strong>
                      <span style={{ fontSize: '12px', color: '#667A70' }}>{res.detalle}</span>
                    </td>
                    <td style={{ padding: '20px 24px' }}>
                      <span style={{ backgroundColor: res.badgeBg, color: res.badgeColor, padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: res.badgeColor }}></div>
                        {res.estado}
                      </span>
                    </td>
                    <td style={{ padding: '20px 24px' }}>
                      <strong style={{ display: 'block', fontSize: '14px', color: '#2C3E35', marginBottom: '4px' }}>{res.fecha}</strong>
                      <span style={{ fontSize: '12px', color: '#667A70' }}>{res.lugar}</span>
                    </td>
                    <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                      {res.accion === 'Confirmar' && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
                          <button style={{ padding: '10px 20px', backgroundColor: '#A64322', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>Confirmar</button>
                          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4F6359' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </button>
                        </div>
                      )}
                      {res.accion === 'Detalles' && (
                        <button style={{ padding: '10px 20px', backgroundColor: '#FFFFFF', color: '#667A70', border: '1px solid #D6D0C4', borderRadius: '8px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>Detalles</button>
                      )}
                      {res.accion === 'Icono' && (
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4F6359' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                        </button>
                      )}
                      {res.accion === 'Refresh' && (
                        <button style={{ background: 'none', height: 'fit-content', border: 'none', cursor: 'pointer', color: '#667A70' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline></svg>
                        </button>
                      )}
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