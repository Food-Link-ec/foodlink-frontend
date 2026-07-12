import { useState } from 'react'
import ComercioLayout from '../components/ComercioLayout'
import styles from './ReservasComercioPage.module.css'

interface Reserva {
  id: string
  org: string
  avatar: string
  producto: string
  detalle: string
  estado: string
  fecha: string
  lugar: string
  contacto: string
  telefono: string
  codigoRetiro: string
  notas: string
}

const RESERVAS: Reserva[] = [
  { id:'#RES-8921', org:'Fundación Quito Solidario', avatar:'FQ', producto:'Canasta Panadería Premium', detalle:'4.5 kg · Pan artesanal', estado:'pendiente', fecha:'Hoy, 18:30', lugar:'Pickup Point A', contacto:'María García', telefono:'+593 99 234 5678', codigoRetiro:'FL-8921-QA', notas:'Llegar puntual. Recoger en la entrada principal.' },
  { id:'#RES-8915', org:'Comedor Dignidad', avatar:'CD', producto:'Caja Vegetales Orgánicos', detalle:'12 kg · Mezcla temporada', estado:'confirmada', fecha:'Mañana, 09:00', lugar:'Zona de Carga', contacto:'Carlos López', telefono:'+593 98 765 4321', codigoRetiro:'FL-8915-QA', notas:'Acceder por el estacionamiento trasero.' },
  { id:'#RES-8890', org:'Albergue El Buen Samaritano', avatar:'AB', producto:'Excedentes Menú del Día', detalle:'15 raciones · Sopas y Guisos', estado:'recogido', fecha:'Ayer, 20:15', lugar:'Finalizado', contacto:'Ana Rodríguez', telefono:'+593 97 111 2222', codigoRetiro:'FL-8890-QA', notas:'Completado sin novedad.' },
  { id:'#RES-8882', org:'Niños del Inga', avatar:'NI', producto:'Pack Frutas Maduras', detalle:'8 kg · Variado', estado:'cancelada', fecha:'—', lugar:'Problema logístico', contacto:'Pedro Vásquez', telefono:'+593 96 333 4444', codigoRetiro:'FL-8882-QA', notas:'Cancelado por falta de transporte. Reprogramar.' },
]

const ESTADO_CFG: Record<string, { label: string; cls: string }> = {
  pendiente:  { label: 'Pendiente',  cls: styles.badgePendiente },
  confirmada: { label: 'Confirmada', cls: styles.badgeConfirmada },
  recogido:   { label: 'Recogido',   cls: styles.badgeRecogido },
  cancelada:  { label: 'Cancelada',  cls: styles.badgeCancelada },
}

const METRICAS = [
  { label: 'Pendientes', val: '12', sub: 'Por confirmar' },
  { label: 'Confirmadas', val: '45', sub: 'Hoy' },
  { label: 'Rescatadas', val: '328', sub: 'Este mes' },
  { label: 'Kg salvados', val: '1.2k', sub: 'Impacto social' },
]

export default function ReservasComercioPage() {
  const [filtro, setFiltro] = useState('Todas')
  const [detalleAbierto, setDetalleAbierto] = useState<string | null>(null)

  const reservasFiltradas = RESERVAS.filter(r =>
    filtro === 'Todas' || r.estado === filtro.toLowerCase()
  )

  const toggleDetalle = (id: string) =>
    setDetalleAbierto(prev => prev === id ? null : id)

  return (
    <ComercioLayout>
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.titulo}>Reservas</h1>
            <p className={styles.subtitulo}>Gestiona las solicitudes de retiro de tus lotes publicados.</p>
          </div>
        </div>

        <div className={styles.metricasRow}>
          {METRICAS.map((m, i) => (
            <div key={i} className={styles.metricaCard}>
              <span className={styles.metricaVal}>{m.val}</span>
              <span className={styles.metricaLabel}>{m.label}</span>
              <span className={styles.metricaSub}>{m.sub}</span>
            </div>
          ))}
        </div>

        <div className={styles.filtros}>
          {['Todas', 'Pendiente', 'Confirmada', 'Recogido', 'Cancelada'].map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`${styles.pill} ${filtro === f ? styles.pillActivo : ''}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className={styles.lista}>
          {reservasFiltradas.map(r => {
            const abierto = detalleAbierto === r.id
            return (
              <div key={r.id} className={`${styles.cardWrap} ${abierto ? styles.cardWrapAbierto : ''}`}>
                {/* Fila principal */}
                <div className={styles.card}>
                  <div className={styles.cardAvatar}>{r.avatar}</div>
                  <div className={styles.cardInfo}>
                    <div className={styles.cardTop}>
                      <div>
                        <span className={styles.cardId}>{r.id}</span>
                        <h3 className={styles.cardOrg}>{r.org}</h3>
                      </div>
                      <span className={`${styles.badge} ${ESTADO_CFG[r.estado].cls}`}>
                        {ESTADO_CFG[r.estado].label}
                      </span>
                    </div>
                    <p className={styles.cardProd}>{r.producto} · <span>{r.detalle}</span></p>
                    <div className={styles.cardMeta}>
                      <span>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {r.fecha}
                      </span>
                      <span>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {r.lugar}
                      </span>
                    </div>
                  </div>
                  <div className={styles.cardAcciones}>
                    {r.estado === 'pendiente' && (
                      <button className={styles.btnConfirmar}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        Confirmar
                      </button>
                    )}
                    <button
                      className={`${styles.btnDetalles} ${abierto ? styles.btnDetallesActivo : ''}`}
                      onClick={() => toggleDetalle(r.id)}
                    >
                      {abierto ? 'Cerrar' : 'Detalles'}
                      <svg
                        width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2"
                        style={{ transition: 'transform 0.2s', transform: abierto ? 'rotate(180deg)' : 'none' }}
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Panel de detalles expandible */}
                {abierto && (
                  <div className={styles.detallePanel}>
                    <div className={styles.detalleCols}>
                      {/* Info de contacto */}
                      <div className={styles.detalleGrupo}>
                        <h4 className={styles.detalleGrupoTitulo}>Contacto de la organización</h4>
                        <div className={styles.detalleItems}>
                          <div className={styles.detalleItem}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            <span>{r.contacto}</span>
                          </div>
                          <div className={styles.detalleItem}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            <span>{r.telefono}</span>
                          </div>
                        </div>
                      </div>

                      {/* Código de retiro */}
                      <div className={styles.detalleGrupo}>
                        <h4 className={styles.detalleGrupoTitulo}>Código de retiro</h4>
                        <div className={styles.codigoRetiro}>
                          <span className={styles.codigoTexto}>{r.codigoRetiro}</span>
                          <button
                            className={styles.copiBtn}
                            onClick={() => navigator.clipboard.writeText(r.codigoRetiro)}
                            title="Copiar código"
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                          </button>
                        </div>
                      </div>

                      {/* Notas */}
                      <div className={styles.detalleGrupo}>
                        <h4 className={styles.detalleGrupoTitulo}>Notas</h4>
                        <p className={styles.detalleNota}>{r.notas}</p>
                      </div>
                    </div>

                    {/* Acciones del panel */}
                    <div className={styles.detallePanelAcciones}>
                      <a
                        href={`https://wa.me/${r.telefono.replace(/\D/g,'')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.detalleAccionWhatsapp}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                        WhatsApp
                      </a>
                      {r.estado === 'recogido' && (
                        <button className={styles.detalleAccionReporte}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                          Descargar reporte
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </ComercioLayout>
  )
}