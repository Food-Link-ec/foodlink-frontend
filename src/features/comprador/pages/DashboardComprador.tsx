import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getMisEstadisticas } from '../../perfil/services/perfilService';
import type { EstadisticasCompradorResponse } from '../../perfil/services/perfilService';

export default function DashboardComprador() {
  const navigate = useNavigate();
  const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Comprador';
  const [filtro, setFiltro] = useState('Todos');
  const [pedidoRealizado, setPedidoRealizado] = useState(false);
  const [ecoStats, setEcoStats] = useState<EstadisticasCompradorResponse | null>(null);

  useEffect(() => {
    getMisEstadisticas().then(setEcoStats).catch(() => {});
  }, []);

  const ofertas = [
    { id: 1, producto: 'Chorizos Artesanales', comercio: 'Supermaxi La Gasca', precioReal: 6.00, precioOferta: 2.00, ahorro: 66, tag: '⏱️ CADUCA HOY', tagColor: '#B5502E', imgBg: '#FAD8D2' },
    { id: 2, producto: 'Canasta de Verduras', comercio: 'Mercado Central', precioReal: 8.50, precioOferta: 3.50, ahorro: 58, tag: 'FRESCAS', tagColor: '#1F4D3C', imgBg: '#C6E7D2' },
    { id: 3, producto: 'Pan de Masa Madre', comercio: 'Panadería El Horno', precioReal: 4.00, precioOferta: 1.50, ahorro: 62, tag: 'RECIÉN HORNEADO', tagColor: '#873e23', imgBg: '#F5DDC3' },
    { id: 4, producto: 'Mix de Lácteos', comercio: 'Tienda La Esquina', precioReal: 12.00, precioOferta: 5.00, ahorro: 58, tag: 'ÚLTIMAS UNIDADES', tagColor: '#B5502E', imgBg: '#EBE7DF' }
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleComprar = () => {
    setPedidoRealizado(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setPedidoRealizado(false), 4000);
  };

  return (
    <div style={{ backgroundColor: '#FAF7F0', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', color: '#2C3E35', display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', borderBottom: '1px dashed #D6D0C4', backgroundColor: '#FAF7F0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <h2 style={{ margin: 0, color: '#1F4D3C', fontSize: '24px', fontWeight: 800 }}>FoodLink</h2>
          <nav style={{ display: 'flex', gap: '24px' }}>
            <span style={{ fontSize: '14px', color: '#1F4D3C', fontWeight: 700, cursor: 'pointer', borderBottom: '2px solid #1F4D3C', paddingBottom: '4px' }}>Explorar</span>
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
              <span style={{ fontSize: '12px', color: '#667A70', fontWeight: 500 }}>Comprador de Rescate</span>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', backgroundColor: '#C6E7D2', color: '#1F4D3C', textDecoration: 'none', fontSize: '14px', fontWeight: 700 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                Explorar Ofertas
              </Link>
              <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', color: '#4F6359', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                Mis Pedidos
              </Link>
              <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', color: '#4F6359', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                Impacto Personal
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
            <h1 style={{ fontSize: '36px', color: '#1F4D3C', margin: '0 0 12px 0', fontWeight: 800, letterSpacing: '-0.5px' }}>Rescate de Alimentos</h1>
            <p style={{ color: '#4F6359', fontSize: '15px', margin: 0 }}>Aprovecha excedentes de calidad y reduce el desperdicio directamente en Quito.</p>
          </header>

          {pedidoRealizado && (
            <div style={{ padding: '16px 20px', backgroundColor: '#C6E7D2', color: '#1F4D3C', borderRadius: '12px', marginBottom: '24px', fontWeight: 700, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              ¡Pedido reservado con éxito! Revisa "Mis Pedidos" para coordinar el retiro en el local.
            </div>
          )}

          <section style={{ backgroundColor: '#1F4D3C', padding: '32px', borderRadius: '16px', marginBottom: '40px', color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#C6E7D2', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>TU AHORRO TOTAL ESTE MES</span>
              <div style={{ fontSize: '48px', fontWeight: 900, lineHeight: '1' }}>
                ${Math.floor(ecoStats?.ahorroEstimado ?? 19.50)}
                <span style={{ fontSize: '24px', color: '#C6E7D2' }}>
                  .{String(Math.round(((ecoStats?.ahorroEstimado ?? 19.50) % 1) * 100)).padStart(2, '0')}
                </span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '14px', color: '#EBE7DF', display: 'block', marginBottom: '4px' }}>Dinero conservado en tu economía</span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#C6E7D2' }}>
                Equivale a {(ecoStats?.co2EvitadoKg ?? 0).toFixed(1)} kg de CO₂ evitados 🌍
              </span>
            </div>
          </section>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            {['Todos', 'Panadería', 'Frutas y Verduras', 'Lácteos', 'Preparados'].map((cat) => (
              <button key={cat} onClick={() => setFiltro(cat)} style={{ padding: '10px 20px', borderRadius: '20px', border: filtro === cat ? 'none' : '1px solid #D6D0C4', backgroundColor: filtro === cat ? '#1F4D3C' : '#FFFFFF', color: filtro === cat ? '#FFFFFF' : '#4F6359', fontWeight: 600, fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s' }}>
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {ofertas.map((oferta) => (
              <div key={oferta.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #EBE7DF', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                
                <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: oferta.tagColor, color: '#FFFFFF', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, zIndex: 2 }}>
                  {oferta.tag}
                </div>

                <div style={{ height: '180px', backgroundColor: oferta.imgBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={oferta.tagColor} strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                </div>

                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#1F4D3C', fontWeight: 800 }}>{oferta.producto}</h3>
                    <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#667A70', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      {oferta.comercio}
                    </p>
                  </div>
                  
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
                      <div>
                        <span style={{ textDecoration: 'line-through', color: '#A0AAB2', fontSize: '12px', display: 'block', fontWeight: 600 }}>Normal: ${oferta.precioReal.toFixed(2)}</span>
                        <span style={{ fontSize: '28px', fontWeight: 900, color: '#1F4D3C', lineHeight: '1' }}>${oferta.precioOferta.toFixed(2)}</span>
                      </div>
                      <div style={{ backgroundColor: '#FAF7F0', color: '#A64322', padding: '6px 10px', borderRadius: '8px', fontWeight: 800, fontSize: '12px' }}>
                        -{oferta.ahorro}%
                      </div>
                    </div>
                    
                    <button onClick={handleComprar} style={{ width: '100%', padding: '14px', backgroundColor: '#A64322', color: '#FFFFFF', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(166, 67, 34, 0.2)', transition: 'transform 0.1s' }}>
                      Reservar y Pagar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}