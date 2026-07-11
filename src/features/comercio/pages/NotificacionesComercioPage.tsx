import  { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function NotificacionesComercioPage() {
  const navigate = useNavigate();
  const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Usuario';
  const [notis, setNotis] = useState([
    { id: 1, tipo: 'urgente', titulo: 'New batch available near you', desc: 'Un lote de 15kg de productos gourmet de "La Panadería" acaba de ser liberado en Cumbayá. Disponible para recolección inmediata.', tiempo: 'HACE 5 MIN', leida: false },
    { id: 2, tipo: 'recordatorio', titulo: 'Pickup reminder', desc: 'Tienes una recolección programada en "Mercado Central" en 30 minutos. Por favor, confirma tu llegada al punto de encuentro.', tiempo: 'HOY 14:30', leida: false },
    { id: 3, tipo: 'confirmacion', titulo: 'Reservation confirmed', desc: 'Tu reserva para el lote de vegetales orgánicos en "Quito Tenis" ha sido confirmada exitosamente. El código de retiro es FL-9921.', tiempo: 'AYER', leida: true }
  ]);

  const marcarTodas = () => {
    setNotis(notis.map(n => ({ ...n, leida: true })));
  };

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
            <span style={{ fontSize: '14px', color: '#4F6359', fontWeight: 500, cursor: 'pointer' }}>Explorar</span>
            <span style={{ fontSize: '14px', color: '#4F6359', fontWeight: 500, cursor: 'pointer' }}>Impacto</span>
            <span style={{ fontSize: '14px', color: '#4F6359', fontWeight: 500, cursor: 'pointer' }}>Nosotros</span>
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A64322" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
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
              <span style={{ fontSize: '12px', color: '#667A70', fontWeight: 500 }}>Food Quality Manager</span>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', color: '#4F6359', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                Panel Control
              </Link>
              <Link to="/dashboard/comercio/mis-lotes" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', color: '#4F6359', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                Mis Lotes
              </Link>
              <Link to="/dashboard/comercio/configuracion" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', color: '#4F6359', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
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
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontSize: '36px', color: '#1F4D3C', margin: '0 0 12px 0', fontWeight: 800, letterSpacing: '-0.5px' }}>Centro de Notificaciones</h1>
              <p style={{ color: '#4F6359', fontSize: '15px', margin: 0 }}>Mantente al tanto de tus rescates y reservas en Quito.</p>
            </div>
            <button onClick={marcarTodas} style={{ fontSize: '13px', fontWeight: 600, color: '#A64322', background: 'none', border: 'none', cursor: 'pointer' }}>Marcar todas como leídas</button>
          </header>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '850px' }}>
            {notis.map((n) => (
              <div key={n.id} style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #EBE7DF', position: 'relative', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#FAF7F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A64322', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <strong style={{ fontSize: '16px', color: '#1F4D3C', fontWeight: 700 }}>{n.titulo}</strong>
                    <span style={{ fontSize: '11px', color: '#667A70', fontWeight: 700 }}>{n.tiempo}</span>
                  </div>
                  <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#4F6359', lineHeight: '1.5' }}>{n.desc}</p>
                  
                  {n.tipo === 'urgente' && (
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button style={{ padding: '8px 16px', backgroundColor: '#A64322', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}>Ver Lote</button>
                      <button style={{ padding: '8px 16px', backgroundColor: 'transparent', color: '#667A70', border: '1px solid #D6D0C4', borderRadius: '8px', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}>Ignorar</button>
                    </div>
                  )}
                  {n.tipo === 'recordatorio' && (
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#1F4D3C', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>Ver ubicación en mapa &gt;</span>
                  )}
                </div>
                {!n.leida && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#A64322', position: 'absolute', top: '24px', right: '24px' }}></div>}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}