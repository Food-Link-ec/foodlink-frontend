import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import CompradorLayout from '../components/CompradorLayout'
import styles from './ExplorarLotesPage.module.css'

const CATEGORIAS = ['Todos', 'Panadería', 'Frutas y Verduras', 'Lácteos', 'Preparados']

interface Lote {
  id: string
  nombre: string
  comercio: string
  zona: string
  categoria: string
  modalidad: 'Venta' | 'Donación' | 'Retiro'
  precioNormal: number
  precio: number
  ahorro: number
  cantidad: string
  caduca: string
  tag: string
  tagVariant: 'urgente' | 'verde' | 'dorado'
  img: string
  disponibles: number
}

const LOTES: Lote[] = [
  { id:'1', nombre:'Canasta Frutas Tropicales', comercio:'La Frutería', zona:'La Floresta', categoria:'Frutas y Verduras', modalidad:'Venta', precioNormal:12, precio:4.50, ahorro:62, cantidad:'3 kg aprox.', caduca:'Hoy, 18:00', tag:'Caduca hoy', tagVariant:'urgente', img:'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&q=75', disponibles:5 },
  { id:'2', nombre:'Pack Panadería Artesanal', comercio:'Panadería El Trigo', zona:'La Mariscal', categoria:'Panadería', modalidad:'Venta', precioNormal:8, precio:3, ahorro:62, cantidad:'10 panes', caduca:'Hoy, 20:00', tag:'Recién horneado', tagVariant:'dorado', img:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=75', disponibles:8 },
  { id:'3', nombre:'10 Raciones Gourmet', comercio:'Cocina Contemporánea', zona:'González Suárez', categoria:'Preparados', modalidad:'Venta', precioNormal:45, precio:18, ahorro:60, cantidad:'10 raciones', caduca:'Hoy, 21:30', tag:'Lote gourmet', tagVariant:'verde', img:'https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=75', disponibles:2 },
  { id:'4', nombre:'Lote Lácteos Premium', comercio:'Delilac Quesería', zona:'Cumbayá', categoria:'Lácteos', modalidad:'Venta', precioNormal:15.50, precio:6, ahorro:61, cantidad:'Queso, yogur, leche', caduca:'Mañana, 12:00', tag:'Últimas unidades', tagVariant:'urgente', img:'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=500&q=75', disponibles:3 },
  { id:'5', nombre:'Verduras Orgánicas Mix', comercio:'Mercado El Labrador', zona:'Cotocollao', categoria:'Frutas y Verduras', modalidad:'Donación', precioNormal:6, precio:0, ahorro:100, cantidad:'2 kg variado', caduca:'Mañana, 10:00', tag:'Donación gratuita', tagVariant:'verde', img:'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&q=75', disponibles:10 },
  { id:'6', nombre:'Almuerzos del Día', comercio:'Catering Quito Fresh', zona:'Iñaquito', categoria:'Preparados', modalidad:'Donación', precioNormal:9, precio:0, ahorro:100, cantidad:'5 raciones', caduca:'Hoy, 15:00', tag:'Donación gratuita', tagVariant:'verde', img:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=75', disponibles:5 },
  { id:'7', nombre:'Pan de Masa Madre', comercio:'Panadería El Horno', zona:'La Gasca', categoria:'Panadería', modalidad:'Venta', precioNormal:4, precio:1.50, ahorro:62, cantidad:'4 hogazas', caduca:'Hoy, 19:00', tag:'Recién horneado', tagVariant:'dorado', img:'https://images.unsplash.com/photo-1585478259715-4d3c8a9c1e1e?w=500&q=75', disponibles:6 },
  { id:'8', nombre:'Mix Frutas de Temporada', comercio:'Supermaxi La Gasca', zona:'La Gasca', categoria:'Frutas y Verduras', modalidad:'Venta', precioNormal:10, precio:3.50, ahorro:65, cantidad:'2.5 kg', caduca:'Hoy, 20:00', tag:'Caduca hoy', tagVariant:'urgente', img:'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&q=75', disponibles:4 },
]

export default function ExplorarLotesPage() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
  const navigate = useNavigate()

  const lotesFiltrados = useMemo(() =>
    LOTES.filter(l => {
      const cat = categoriaActiva === 'Todos' || l.categoria === categoriaActiva
      const q = busqueda === '' || l.nombre.toLowerCase().includes(busqueda.toLowerCase()) || l.comercio.toLowerCase().includes(busqueda.toLowerCase())
      return cat && q
    }),
  [categoriaActiva, busqueda])

  return (
    <CompradorLayout>
      <div className={styles.page}>

        {/* HERO STATS */}
        <section className={styles.heroStats}>
          {/* Lado izquierdo — ahorro */}
          <div className={styles.heroMain}>
            <p className={styles.heroEyebrow}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              Tu ahorro total este mes
            </p>
            <div className={styles.heroMonto}>
              <span className={styles.heroCurrency}>$</span>42<span className={styles.heroDecimal}>.50</span>
            </div>
            <p className={styles.heroSub}>
              Dinero conservado en tu economía
              <span className={styles.heroSubDot}>·</span>
              <strong>18 kg de CO₂ evitados</strong> 
            </p>
          </div>

          {/* Divider vertical */}
          <div className={styles.heroDividerV}/>

          {/* Lado derecho — 3 stats */}
          <div className={styles.heroStats3}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>7</span>
              <span className={styles.heroStatLabel}>Pedidos realizados</span>
            </div>
            <div className={styles.heroStatDiv}/>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>63%</span>
              <span className={styles.heroStatLabel}>Descuento Promedio</span>
            </div>
            <div className={styles.heroStatDiv}/>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>45</span>
              <span className={styles.heroStatLabel}>Productos activos hoy</span>
            </div>
          </div>
        </section>

        {/* TOOLBAR */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <div className={styles.toolbarBreadcrumb}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Quito, Ecuador
            </div>
            <h2 className={styles.titulo}>Rescate de Alimentos</h2>
            <p className={styles.subtitulo}>Aprovecha excedentes de calidad y reduce el desperdicio directamente en Quito.</p>
          </div>
          <div className={styles.toolbarRight}>
            <div className={styles.searchWrap}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                type="text"
                placeholder="Buscar producto o comercio..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className={styles.searchInput}
              />
              {busqueda && (
                <button className={styles.clearSearch} onClick={() => setBusqueda('')}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* PILLS */}
        <div className={styles.pills}>
          {CATEGORIAS.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`${styles.pill} ${categoriaActiva === cat ? styles.pillActivo : ''}`}
            >
              {cat}
              {cat !== 'Todos' && (
                <span className={styles.pillCount}>
                  {LOTES.filter(l => l.categoria === cat).length}
                </span>
              )}
            </button>
          ))}
          <span className={styles.pillResultado}>{lotesFiltrados.length} lotes disponibles</span>
        </div>

        {/* GRID */}
        {lotesFiltrados.length === 0 ? (
          <div className={styles.vacio}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <p>No hay lotes para esta búsqueda.</p>
            <button className={styles.vacioBtn} onClick={() => { setCategoriaActiva('Todos'); setBusqueda('') }}>Ver todos</button>
          </div>
        ) : (
          <div className={styles.grid}>
            {lotesFiltrados.map(lote => (
              <article
                key={lote.id}
                className={styles.card}
                onClick={() => navigate(`/dashboard/comprador/lote/${lote.id}`)}
              >
                {/* Imagen */}
                <div className={styles.cardImgWrap}>
                  <img src={lote.img} alt={lote.nombre} className={styles.cardImg} loading="lazy" />
                  <div className={styles.cardImgOverlay}/>
                  <span className={`${styles.tag} ${styles[`tag_${lote.tagVariant}`]}`}>
                    {lote.tagVariant === 'urgente' && <span className={styles.pulse}/>}
                    {lote.tag}
                  </span>
                  {lote.modalidad === 'Donación' ? (
                    <span className={styles.modalidadBadge} data-tipo="donacion">GRATIS</span>
                  ) : (
                    <span className={styles.disponibles}>{lote.disponibles} disp.</span>
                  )}
                </div>

                {/* Contenido */}
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardCat}>{lote.categoria}</span>
                    <span className={`${styles.cardMod} ${styles[`mod_${lote.modalidad.toLowerCase()}`]}`}>{lote.modalidad}</span>
                  </div>

                  <h3 className={styles.cardNombre}>{lote.nombre}</h3>

                  <p className={styles.cardComercio}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {lote.comercio} · {lote.zona}
                  </p>

                  <div className={styles.cardDetalle}>
                    <span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                      {lote.cantidad}
                    </span>
                    <span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {lote.caduca}
                    </span>
                  </div>

                  <div className={styles.cardFooter}>
                    <div>
                      <span className={styles.precioAntes}>${lote.precioNormal.toFixed(2)}</span>
                      <span className={styles.precioOferta}>
                        {lote.precio === 0 ? 'Gratis' : `$${lote.precio.toFixed(2)}`}
                      </span>
                    </div>
                    <span className={styles.badgeAhorro}>-{lote.ahorro}%</span>
                  </div>

                  <button
                    className={styles.btnReservar}
                    onClick={e => { e.stopPropagation(); navigate(`/dashboard/comprador/lote/${lote.id}`) }}
                  >
                    Reservar y Pagar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </CompradorLayout>
  )
}