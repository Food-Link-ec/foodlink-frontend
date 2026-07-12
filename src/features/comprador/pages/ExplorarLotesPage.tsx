import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CompradorLayout from '../components/CompradorLayout'
import styles from './ExplorarLotesPage.module.css'

const CATEGORIAS = ['Todos', 'Panadería', 'Frutas y Verduras', 'Lácteos', 'Preparados']

const LOTES = [
  {
    id: '1',
    nombre: 'Chorizos Artesanales',
    comercio: 'Supermaxi La Gasca',
    categoria: 'Preparados',
    precioNormal: 6.00,
    precio: 2.00,
    ahorro: 66,
    tag: 'Caduca hoy',
    tagVariant: 'urgente',
    imgColor: '#FAD8D2',
  },
  {
    id: '2',
    nombre: 'Canasta de Verduras',
    comercio: 'Mercado Central',
    categoria: 'Frutas y Verduras',
    precioNormal: 8.50,
    precio: 3.50,
    ahorro: 58,
    tag: 'Frescas',
    tagVariant: 'verde',
    imgColor: '#C6E7D2',
  },
  {
    id: '3',
    nombre: 'Pan de Masa Madre',
    comercio: 'Panadería El Horno',
    categoria: 'Panadería',
    precioNormal: 4.00,
    precio: 1.50,
    ahorro: 62,
    tag: 'Recién horneado',
    tagVariant: 'dorado',
    imgColor: '#F5DDC3',
  },
  {
    id: '4',
    nombre: 'Mix de Lácteos',
    comercio: 'Tienda La Esquina',
    categoria: 'Lácteos',
    precioNormal: 12.00,
    precio: 5.00,
    ahorro: 58,
    tag: 'Últimas unidades',
    tagVariant: 'urgente',
    imgColor: '#EBE7DF',
  },
  {
    id: '5',
    nombre: 'Frutas Tropicales Mix',
    comercio: 'Mercado San Francisco',
    categoria: 'Frutas y Verduras',
    precioNormal: 5.00,
    precio: 2.00,
    ahorro: 60,
    tag: 'Frescas',
    tagVariant: 'verde',
    imgColor: '#FCEACB',
  },
  {
    id: '6',
    nombre: 'Pan Artesanal Variado',
    comercio: 'Panadería El Trigo',
    categoria: 'Panadería',
    precioNormal: 7.00,
    precio: 3.00,
    ahorro: 57,
    tag: 'Recién horneado',
    tagVariant: 'dorado',
    imgColor: '#F5DDC3',
  },
]

export default function ExplorarLotesPage() {
  const [filtro, setFiltro] = useState('Todos')
  const [reservado, setReservado] = useState<string | null>(null)
  const navigate = useNavigate()

  const lotesFiltrados = filtro === 'Todos'
    ? LOTES
    : LOTES.filter((l) => l.categoria === filtro)

  const handleReservar = (id: string) => {
    navigate(`/dashboard/comprador/lote/${id}`)
  }

  return (
    <CompradorLayout>
      <div className={styles.page}>

        {/* Banner ahorro */}
        <section className={styles.ahorroBanner}>
          <div className={styles.ahorroLeft}>
            <span className={styles.ahorroLabel}>Tu ahorro total este mes</span>
            <div className={styles.ahorroMonto}>
              $42<span className={styles.ahorroDecimal}>.50</span>
            </div>
          </div>
          <div className={styles.ahorroRight}>
            <span>Dinero conservado en tu economía</span>
            <strong>Equivale a 18 kg de CO₂ evitados 🌍</strong>
          </div>
        </section>

        {/* Encabezado */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.titulo}>Rescate de Alimentos</h1>
            <p className={styles.subtitulo}>Aprovecha excedentes de calidad y reduce el desperdicio en Quito.</p>
          </div>
        </div>

        {/* Toast de confirmación */}
        {reservado && (
          <div className={styles.toast}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            ¡Reserva enviada! Revisa <strong>Mis Pedidos</strong> para coordinar el retiro.
          </div>
        )}

        {/* Filtros */}
        <div className={styles.filtros}>
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              className={`${styles.filtroPill} ${filtro === cat ? styles.filtroActivo : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de lotes */}
        <div className={styles.grid}>
          {lotesFiltrados.map((lote) => (
            <article key={lote.id} className={styles.card}>
              {/* Imagen placeholder con color */}
              <div className={styles.cardImg} style={{ backgroundColor: lote.imgColor }}>
                <span className={`${styles.tag} ${styles[`tag_${lote.tagVariant}`]}`}>
                  {lote.tagVariant === 'urgente' && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                  )}
                  {lote.tag}
                </span>
                <svg className={styles.imgIcon} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>

              {/* Info */}
              <div className={styles.cardBody}>
                <h3 className={styles.cardNombre}>{lote.nombre}</h3>
                <p className={styles.cardComercio}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  {lote.comercio}
                </p>

                <div className={styles.cardPrecio}>
                  <div>
                    <span className={styles.precioNormal}>Normal: ${lote.precioNormal.toFixed(2)}</span>
                    <span className={styles.precioOferta}>${lote.precio.toFixed(2)}</span>
                  </div>
                  <span className={styles.badge}>-{lote.ahorro}%</span>
                </div>

                <button
                  className={styles.btnReservar}
                  onClick={() => handleReservar(lote.id)}
                >
                  Ver y Reservar
                </button>
              </div>
            </article>
          ))}
        </div>

        {lotesFiltrados.length === 0 && (
          <div className={styles.vacio}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <p>No hay lotes disponibles en esta categoría por ahora.</p>
          </div>
        )}
      </div>
    </CompradorLayout>
  )
}