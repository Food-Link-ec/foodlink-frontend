import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NuevoLotePage() {
  const navigate = useNavigate();
  localStorage.getItem('nombreUsuario');

  const [tipoAlimento, setTipoAlimento] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fechaExpiracion, setFechaExpiracion] = useState('');
  const [modalidad, setModalidad] = useState('DONACION');
  const [direccion, setDireccion] = useState('');
  const [instrucciones, setInstrucciones] = useState('');
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#FAF7F0', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', color: '#2C3E35' }}>
      <header style={{ maxWidth: '1000px', margin: '0 auto 32px auto' }}>
        <span style={{ fontSize: '13px', color: '#667A70', display: 'block', marginBottom: '8px', fontWeight: 500 }}>Mis Lotes &gt; Nuevo Lote</span>
        <h1 style={{ fontSize: '32px', color: '#1F4D3C', margin: '0 0 8px 0', fontWeight: 800, letterSpacing: '-0.5px' }}>Rescatar Alimento</h1>
        <p style={{ color: '#4F6359', fontSize: '15px', margin: 0, lineHeight: '1.5' }}>Comparte el excedente de tu negocio con dignidad. Cada lote publicado ayuda to reducir el desperdicio en Quito.</p>
      </header>

      <form onSubmit={handleSubmit} style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '24px' }}>
        
        {/* Columna Izquierda: Detalles del Alimento */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '28px', borderRadius: '16px', border: '1px solid #EBE7DF', boxShadow: '0 4px 12px rgba(31, 77, 60, 0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FAF7F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B5502E' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
            </div>
            <h3 style={{ margin: 0, color: '#1F4D3C', fontSize: '18px', fontWeight: 700 }}>Detalles del Alimento</h3>
          </div>
          <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: '#667A70', paddingLeft: '42px' }}>Describe qué estás rescatando hoy.</p>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#2C3E35' }}>Tipo de Alimento</label>
            <select value={tipoAlimento} onChange={(e) => setTipoAlimento(e.target.value)} required style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #D6D0C4', backgroundColor: '#FAF7F0', fontSize: '14px', color: '#2C3E35', outline: 'none', cursor: 'pointer' }}>
              <option value="">Selecciona una categoría</option>
              <option value="panadería">Panadería y bollería</option>
              <option value="frutas">Frutas y verduras</option>
              <option value="preparados">Alimentos preparados</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#2C3E35' }}>Cantidad / Peso Aprox.</label>
            <input type="text" placeholder="Ej: 10 kg o 5 raciones" value={cantidad} onChange={(e) => setCantidad(e.target.value)} required style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #D6D0C4', backgroundColor: '#FAF7F0', fontSize: '14px', color: '#2C3E35', boxSizing: 'border-box', outline: 'none' }} />
          </div>

          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#2C3E35' }}>Fecha de Expiración / Consumo Preferente</label>
            <input type="date" value={fechaExpiracion} onChange={(e) => setFechaExpiracion(e.target.value)} required style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #D6D0C4', backgroundColor: '#FAF7F0', fontSize: '14px', color: '#2C3E35', boxSizing: 'border-box', outline: 'none' }} />
          </div>
        </div>

        {/* Columna Derecha: Foto y Modalidad */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Card Foto con preview funcional */}
          <div style={{ backgroundColor: '#FFFFFF', border: '2px dashed #C8C2B4', borderRadius: '16px', padding: '20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '145px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 2 }} />
            {imagenPreview ? (
              <img src={imagenPreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, borderRadius: '14px' }} />
            ) : (
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#667A70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 6px auto' }}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                <strong style={{ display: 'block', color: '#1F4D3C', fontSize: '14px', marginBottom: '2px' }}>Sube una foto real</strong>
                <small style={{ color: '#667A70', fontSize: '12px' }}>Ayuda to los receptores a ver la calidad del lote.</small>
              </div>
            )}
          </div>

          {/* Card Modalidad */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #EBE7DF', boxShadow: '0 4px 12px rgba(31, 77, 60, 0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FAF7F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B5502E' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
              </div>
              <h3 style={{ margin: 0, color: '#1F4D3C', fontSize: '18px', fontWeight: 700 }}>Modalidad</h3>
            </div>
            <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#667A70', paddingLeft: '42px' }}>¿Cómo quieres entregar este lote?</p>
            
            <label style={{ display: 'flex', gap: '12px', padding: '12px', borderRadius: '10px', border: `1px solid ${modalidad === 'DONACION' ? '#1F4D3C' : '#EBE7DF'}`, backgroundColor: modalidad === 'DONACION' ? '#FAF7F0' : '#FFFFFF', marginBottom: '10px', cursor: 'pointer', alignItems: 'center' }}>
              <input type="radio" name="modalidad" value="DONACION" checked={modalidad === 'DONACION'} onChange={() => setModalidad('DONACION')} style={{ accentColor: '#1F4D3C' }} />
              <div>
                <strong style={{ fontSize: '13px', color: '#1F4D3C', display: 'block' }}>Donación Gratuita</strong>
                <span style={{ fontSize: '11px', color: '#667A70' }}>Impacto social inmediato.</span>
              </div>
            </label>

            <label style={{ display: 'flex', gap: '12px', padding: '12px', borderRadius: '10px', border: `1px solid ${modalidad === 'RESCATE' ? '#1F4D3C' : '#EBE7DF'}`, backgroundColor: modalidad === 'RESCATE' ? '#FAF7F0' : '#FFFFFF', cursor: 'pointer', alignItems: 'center' }}>
              <input type="radio" name="modalidad" value="RESCATE" checked={modalidad === 'RESCATE'} onChange={() => setModalidad('RESCATE')} style={{ accentColor: '#1F4D3C' }} />
              <div>
                <strong style={{ fontSize: '13px', color: '#1F4D3C', display: 'block' }}>Bajo Costo (Rescate)</strong>
                <span style={{ fontSize: '11px', color: '#667A70' }}>Recupera inversión.</span>
              </div>
            </label>
          </div>

        </div>

        {/* Sección Punto de Retiro (Full Width) */}
        <div style={{ gridColumn: '1 / -1', backgroundColor: '#FFFFFF', padding: '28px', borderRadius: '16px', border: '1px solid #EBE7DF', boxShadow: '0 4px 12px rgba(31, 77, 60, 0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FAF7F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B5502E' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <h3 style={{ margin: 0, color: '#1F4D3C', fontSize: '18px', fontWeight: 700 }}>Punto de Retiro</h3>
          </div>
          <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: '#667A70', paddingLeft: '42px' }}>Indica dónde deben recoger el lote en Quito.</p>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#2C3E35' }}>Dirección Exacta</label>
            <input type="text" placeholder="Ej: Av. González Suárez y Muros, Quito" value={direccion} onChange={(e) => setDireccion(e.target.value)} required style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #D6D0C4', backgroundColor: '#FAF7F0', fontSize: '14px', color: '#2C3E35', boxSizing: 'border-box', outline: 'none' }} />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#2C3E35' }}>Instrucciones de Retiro (Opcional)</label>
            <textarea placeholder="Ej: Preguntar por el administrador en la puerta lateral." value={instrucciones} onChange={(e) => setInstrucciones(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #D6D0C4', backgroundColor: '#FAF7F0', fontSize: '14px', color: '#2C3E35', boxSizing: 'border-box', minHeight: '90px', outline: 'none' }} />
          </div>
        </div>

        {/* Botones de Acción Footer */}
        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', gap: '14px', marginTop: '10px' }}>
          <button type="button" onClick={() => navigate('/dashboard')} style={{ padding: '14px 22px', backgroundColor: '#EBE7DF', color: '#4F6359', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'background 0.2s' }}>Guardar Borrador</button>
          <button type="submit" style={{ padding: '14px 28px', backgroundColor: '#B5502E', color: '#FFFFFF', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(181, 80, 46, 0.2)' }}>Publicar Lote Ahora &gt;</button>
        </div>
      </form>
    </div>
  );
}