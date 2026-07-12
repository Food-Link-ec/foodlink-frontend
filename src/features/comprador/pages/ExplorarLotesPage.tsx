import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import CompradorLayout from '../components/CompradorLayout'
import { LOTES } from '../data/lotes'
import type { Lote } from '../data/lotes'
import styles from './ExplorarLotesPage.module.css'

const CATEGORIAS = ['Todos', 'Panadería', 'Frutas y Verduras', 'Lácteos', 'Preparados']

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
              <span className={styles.heroStatLabel}>Descuento promedio</span>
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