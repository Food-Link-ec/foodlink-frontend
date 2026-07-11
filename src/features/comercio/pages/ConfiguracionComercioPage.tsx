import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function ConfiguracionComercioPage() {
  const navigate = useNavigate();
  const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Usuario';

  const [nombreNegocio, setNombreNegocio] = useState(nombreUsuario);
  const [telefono, setTelefono] = useState('0987654321');
  const [direccion, setDireccion] = useState('Av. González Suárez y Muros, Quito');
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setGuardadoExitoso(true);
    setTimeout(() => setGuardadoExitoso(false), 3000);
  };

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
            <img src={`https://ui-avatars.com/api/?name=${nombreUsuario}&background=1F4D3C&color=fff`} alt="Perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        <aside style={{ width: '260px', borderRight: '1px dashed #D6D0C4', padding: '32px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#FAF7F0' }}>
          <div>
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ margin: '0 0 4px 0', color: '#1F4D3C', fontSize: '20px', fontWeight: 800 }}>{nombreUsuario}</h2>
              <span style={{ fontSize: '12px', color: '#667A70', fontWeight: 500 }}>Administrador de Rescate</span>
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
              <Link to="/dashboard/comercio/reservas" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', color: '#4F6359', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Reservas
              </Link>
              <Link to="/dashboard/comercio/impacto" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', color: '#4F6359', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                Impacto
              </Link>
              <Link to="/dashboard/comercio/configuracion" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', backgroundColor: '#C6E7D2', color: '#1F4D3C', textDecoration: 'none', fontSize: '14px', fontWeight: 700 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
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
            <h1 style={{ fontSize: '36px', color: '#1F4D3C', margin: '0 0 12px 0', fontWeight: 800, letterSpacing: '-0.5px' }}>Configuración del Comercio</h1>
            <p style={{ color: '#4F6359', fontSize: '15px', margin: 0 }}>Actualice los datos de su establecimiento y preferencias de notificación.</p>
          </header>

          {guardadoExitoso && (
            <div style={{ padding: '14px', backgroundColor: '#C6E7D2', color: '#1F4D3C', borderRadius: '10px', marginBottom: '24px', fontWeight: 700, fontSize: '14px' }}>
              ¡Configuración actualizada correctamente!
            </div>
          )}

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '750px' }}>
            <div style={{ backgroundColor: '#FFFFFF', padding: '28px', borderRadius: '16px', border: '1px solid #EBE7DF' }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#1F4D3C', fontWeight: 700 }}>Datos del Establecimiento</h3>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#2C3E35' }}>Nombre Comercial</label>
                <input type="text" value={nombreNegocio} onChange={(e) => setNombreNegocio(e.target.value)} required style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #D6D0C4', backgroundColor: '#FAF7F0', fontSize: '14px', outline: 'none' }} />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#2C3E35' }}>Teléfono de Contacto</label>
                <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #D6D0C4', backgroundColor: '#FAF7F0', fontSize: '14px', outline: 'none' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: '#2C3E35' }}>Dirección Principal</label>
                <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #D6D0C4', backgroundColor: '#FAF7F0', fontSize: '14px', outline: 'none' }} />
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '28px', borderRadius: '16px', border: '1px solid #EBE7DF' }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#1F4D3C', fontWeight: 700 }}>Preferencias de Alertas</h3>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', cursor: 'pointer' }}>
                <input type="checkbox" checked={notifEmail} onChange={() => setNotifEmail(!notifEmail)} style={{ width: '18px', height: '18px', accentColor: '#1F4D3C' }} />
                <span style={{ fontSize: '14px', color: '#2C3E35', fontWeight: 500 }}>Recibir notificaciones por correo electrónico al haber reservas nuevas</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input type="checkbox" checked={notifPush} onChange={() => setNotifPush(!notifPush)} style={{ width: '18px', height: '18px', accentColor: '#1F4D3C' }} />
                <span style={{ fontSize: '14px', color: '#2C3E35', fontWeight: 500 }}>Habilitar alertas emergentes (Push) en el panel de control</span>
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" style={{ padding: '14px 28px', backgroundColor: '#A64322', color: '#FFFFFF', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(166, 67, 34, 0.2)' }}>Guardar Cambios</button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}