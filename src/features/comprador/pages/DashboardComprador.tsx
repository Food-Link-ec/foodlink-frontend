import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardComprador() {
  const navigate = useNavigate();
  const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Comprador';

  const [pedidoRealizado, setPedidoRealizado] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleComprar = () => {
    setPedidoRealizado(true);
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#FAF7F0', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', color: '#2C3E35' }}>
      
      {/* Sidebar / Layout Header interno */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px' }}>
        
        {/* Panel lateral simplificado de Comprador */}
        <aside style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #EBE7DF', height: 'fit-content', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '500px' }}>
          <div>
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ margin: '0 0 2px 0', color: '#1F4D3C', fontSize: '20px', fontWeight: 800 }}>FoodLink</h2>
              <p style={{ margin: 0, fontSize: '11px', color: '#667A70', fontWeight: 600, textTransform: 'uppercase' }}>Impacto Individual</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#FAF7F0', borderRadius: '12px', marginBottom: '24px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#1F4D3C' }}></div>
              <div>
                <strong style={{ display: 'block', fontSize: '13px', color: '#1F4D3C' }}>{nombreUsuario}</strong>
                <span style={{ fontSize: '11px', color: '#667A70' }}>Comprador</span>
              </div>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <a href="#" style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: '#1F4D3C', color: '#FFFFFF', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>Ofertas Flash</a>
              <a href="#" style={{ padding: '10px 12px', borderRadius: '8px', color: '#4F6359', textDecoration: 'none', fontSize: '13px', fontWeight: 500 }}>Mis Pedidos</a>
              <a href="#" style={{ padding: '10px 12px', borderRadius: '8px', color: '#4F6359', textDecoration: 'none', fontSize: '13px', fontWeight: 500 }}>Configuración</a>
            </nav>
          </div>

          <button onClick={handleLogout} style={{ padding: '10px 12px', backgroundColor: 'transparent', border: '1px solid #EBE7DF', borderRadius: '8px', color: '#B5502E', fontWeight: 600, fontSize: '13px', cursor: 'pointer', textAlign: 'left' }}>Cerrar Sesión</button>
        </aside>

        {/* Contenido Principal de Comprador */}
        <main>
          <header style={{ marginBottom: '24px' }}>
            <h1 style={{ fontSize: '28px', color: '#1F4D3C', margin: '0 0 6px 0', fontWeight: 800 }}>Rescate de Alimentos</h1>
            <p style={{ margin: 0, color: '#4F6359', fontSize: '14px' }}>Aprovecha excedentes de calidad y reduce el desperdicio directamente en Quito.</p>
          </header>

          {/* Estadísticas de Ahorro */}
          <section style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginBottom: '32px' }}>
            <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #EBE7DF', boxShadow: '0 4px 12px rgba(31, 77, 60, 0.03)' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#667A70', letterSpacing: '0.5px' }}>AHORRO TOTAL ESTE MES</span>
              <div style={{ fontSize: '36px', fontWeight: 900, color: '#1F4D3C', margin: '8px 0 4px 0' }}>$42<span style={{ fontSize: '20px' }}>.50</span></div>
              <span style={{ fontSize: '12px', color: '#4F6359' }}>Dinero conservado en tu economía familiar</span>
            </div>
          </section>

          {/* Catálogo de Ofertas con Urgencia */}
          <section>
            <h2 style={{ fontSize: '20px', color: '#1F4D3C', marginBottom: '16px', fontWeight: 700 }}>Ofertas con Urgencia</h2>
            
            {pedidoRealizado && (
              <div style={{ padding: '14px', backgroundColor: '#C6F6D5', color: '#22543d', borderRadius: '10px', marginBottom: '16px', fontWeight: 600, fontSize: '13px' }}>
                ¡Pedido reservado con éxito! Revisa "Mis Pedidos" para coordinar el retiro.
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #EBE7DF', borderRadius: '16px', padding: '20px', position: 'relative', boxShadow: '0 4px 12px rgba(31, 77, 60, 0.04)' }}>
                
                <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: '#B5502E', color: '#FFFFFF', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, zIndex: 2 }}>
                  ⏱️ ¡CADUCA EN 1 DÍA!
                </div>

                <div style={{ height: '150px', backgroundColor: '#FAF7F0', borderRadius: '10px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#667A70', fontSize: '12px' }}>
                  [Imagen de Chorizos Artesanales frescos]
                </div>

                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#1F4D3C', fontWeight: 700 }}>Chorizos Artesanales</h3>
                <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#667A70' }}>Supermaxi La Gasca</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
                  <div>
                    <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '12px', display: 'block' }}>Precio real: $6.00</span>
                    <span style={{ fontSize: '26px', fontWeight: 900, color: '#1F4D3C' }}>$2.00</span>
                  </div>
                  <div style={{ backgroundColor: '#C6F6D5', color: '#22543d', padding: '6px 10px', borderRadius: '8px', fontWeight: 700, fontSize: '12px' }}>
                    Ahorro del 66% ($4.00)
                  </div>
                </div>
                
                <button onClick={handleComprar} style={{ width: '100%', padding: '12px', backgroundColor: '#1F4D3C', color: '#FFFFFF', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
                  Comprar ahora
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}