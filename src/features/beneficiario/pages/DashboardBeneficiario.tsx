import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function DashboardBeneficiarioPage() {
  const navigate = useNavigate();
  const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Organización';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: '#FAF7F0', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', color: '#2C3E35', display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', borderBottom: '1px dashed #D6D0C4', backgroundColor: '#FAF7F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <h2 style={{ margin: 0, color: '#1F4D3C', fontSize: '24px', fontWeight: 800 }}>FoodLink</h2>
          <nav style={{ display: 'flex', gap: '24px' }}>
            <span style={{ fontSize: '14px', color: '#1F4D3C', fontWeight: 700, cursor: 'pointer', borderBottom: '2px solid #1F4D3C', paddingBottom: '4px' }}>Directorio de Lotes</span>
            <span style={{ fontSize: '14px', color: '#4F6359', fontWeight: 500, cursor: 'pointer' }}>Impacto</span>
            <span style={{ fontSize: '14px', color: '#4F6359', fontWeight: 500, cursor: 'pointer' }}>Comunidad</span>
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F6359" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </button>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#EBE7DF', overflow: 'hidden' }}>
            <img src={`https://ui-avatars.com/api/?name=${nombreUsuario}&background=1F4D3C&color=fff`} alt="Perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        <aside style={{ width: '260px', borderRight: '1px dashed #D6D0C4', padding: '32px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#FAF7F0' }}>
          <div>
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ margin: '0 0 4px 0', color: '#1F4D3C', fontSize: '20px', fontWeight: 800 }}>{nombreUsuario}</h2>
              <span style={{ fontSize: '12px', color: '#667A70', fontWeight: 500 }}>Organización Receptora</span>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', backgroundColor: '#C6E7D2', color: '#1F4D3C', textDecoration: 'none', fontSize: '14px', fontWeight: 700 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                Panel Control
              </Link>
              <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', color: '#4F6359', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                Mis Solicitudes
              </Link>
              <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', color: '#4F6359', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                Configuración
              </Link>
            </nav>
          </div>

          <button onClick={handleLogout} style={{ width: '100%', padding: '12px', backgroundColor: 'transparent', border: '1px solid #D6D0C4', borderRadius: '10px', color: '#B5502E', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Cerrar Sesión
          </button>
        </aside>

        <main style={{ flex: 1, padding: '40px 48px' }}>
          <header style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '36px', color: '#1F4D3C', margin: '0 0 12px 0', fontWeight: 800, letterSpacing: '-0.5px' }}>Lotes Disponibles para Donación</h1>
            <p style={{ color: '#4F6359', fontSize: '15px', margin: 0 }}>Encuentra excedentes gratuitos donados por comercios locales para tu fundación.</p>
          </header>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
            <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #EBE7DF' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#667A70', letterSpacing: '0.5px' }}>ALIMENTO RECIBIDO ESTE MES</span>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#1F4D3C', margin: '8px 0' }}>145 <span style={{ fontSize: '18px' }}>kg</span></div>
            </div>
            <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #EBE7DF' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#667A70', letterSpacing: '0.5px' }}>RACIONES EQUIVALENTES</span>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#1F4D3C', margin: '8px 0' }}>480</div>
            </div>
            <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #EBE7DF' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#667A70', letterSpacing: '0.5px' }}>SOLICITUDES EN PROCESO</span>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#873e23', margin: '8px 0' }}>2</div>
            </div>
          </section>

          <section style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #EBE7DF', overflow: 'hidden', padding: '24px' }}>
            <h2 style={{ margin: '0 0 24px 0', fontSize: '20px', color: '#1F4D3C', fontWeight: 800 }}>Donaciones Recientes</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              
              {/* Card Donación 1 */}
              <div style={{ backgroundColor: '#FAF7F0', borderRadius: '12px', border: '1px solid #D6D0C4', overflow: 'hidden' }}>
                <div style={{ height: '140px', backgroundColor: '#C6E7D2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1F4D3C" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'inline-block', backgroundColor: '#1F4D3C', color: '#FFFFFF', padding: '4px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: 700, marginBottom: '12px' }}>DONACIÓN GRATUITA</div>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', color: '#1F4D3C', fontWeight: 800 }}>Pan Artesanal del Día</h3>
                  <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#667A70' }}>Panadería San Juan • 15 kg disponibles</p>
                  <button style={{ width: '100%', padding: '12px', backgroundColor: '#A64322', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Solicitar Rescate</button>
                </div>
              </div>

              {/* Card Donación 2 */}
              <div style={{ backgroundColor: '#FAF7F0', borderRadius: '12px', border: '1px solid #D6D0C4', overflow: 'hidden' }}>
                <div style={{ height: '140px', backgroundColor: '#FAD8D2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#B5502E" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'inline-block', backgroundColor: '#1F4D3C', color: '#FFFFFF', padding: '4px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: 700, marginBottom: '12px' }}>DONACIÓN GRATUITA</div>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', color: '#1F4D3C', fontWeight: 800 }}>Vegetales Variados</h3>
                  <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#667A70' }}>Mercado Mayorista • 25 kg disponibles</p>
                  <button style={{ width: '100%', padding: '12px', backgroundColor: '#A64322', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Solicitar Rescate</button>
                </div>
              </div>

            </div>
          </section>
        </main>
      </div>
    </div>
  );
}