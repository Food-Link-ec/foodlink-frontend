import { useState, useMemo } from 'react'
import BeneficiarioLayout from '../components/BeneficiarioLayout'
import styles from './ExplorarLotesBeneficiarioPage.module.css'

const CATEGORIAS = ['Todos', 'Panadería', 'Frutas y Verduras', 'Lácteos', 'Preparados']

const LOTES = [
  { id:'1', nombre:'Pan Artesanal Variado', comercio:'Panadería El Trigo', zona:'La Mariscal', categoria:'Panadería', kg:'12 kg', caduca:'Hoy, 20:00', tag:'Urgente', tagVar:'urgente', img:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=75', desc:'Assortment de panes artesanales horneados hoy.' },
  { id:'2', nombre:'Verduras Orgánicas Mix', comercio:'Mercado El Labrador', zona:'Cotocollao', categoria:'Frutas y Verduras', kg:'20 kg', caduca:'Mañana, 10:00', tag:'Fresco', tagVar:'verde', img:'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=75', desc:'Mix de verduras orgánicas frescas de temporada.' },
  { id:'3', nombre:'Canasta Frutas Tropicales', comercio:'La Frutería', zona:'La Floresta', categoria:'Frutas y Verduras', kg:'15 kg', caduca:'Hoy, 18:00', tag:'Urgente', tagVar:'urgente', img:'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&q=75', desc:'Selección de frutas tropicales en punto óptimo.' },
  { id:'4', nombre:'Almuerzos del Día', comercio:'Catering Quito Fresh', zona:'Iñaquito', categoria:'Preparados', kg:'5 raciones', caduca:'Hoy, 15:00', tag:'Urgente', tagVar:'urgente', img:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=75', desc:'Raciones completas preparadas esta mañana.' },
  { id:'5', nombre:'Lote Lácteos Premium', comercio:'Delilac Quesería', zona:'Cumbayá', categoria:'Lácteos', kg:'8 kg', caduca:'Mañana, 12:00', tag:'Fresco', tagVar:'verde', img:'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&q=75', desc:'Queso fresco, yogur y leche artesanales.' },
  { id:'6', nombre:'Mix Frutas de Temporada', comercio:'Supermaxi La Gasca', zona:'La Gasca', categoria:'Frutas y Verduras', kg:'10 kg', caduca:'Hoy, 20:00', tag:'Urgente', tagVar:'urgente', img:'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=75', desc:'Frutillas, mora y uvilla seleccionadas.' },
]

export default function ExplorarLotesBeneficiarioPage() {
  const [categoria, setCategoria] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
  const [solicitado, setSolicitado] = useState<string | null>(null)

  const lotesFiltrados = useMemo(() =>
    LOTES.filter(l => {
      const cat = categoria === 'Todos' || l.categoria === categoria
      const q = busqueda === '' || l.nombre.toLowerCase().includes(busqueda.toLowerCase()) || l.comercio.toLowerCase().includes(busqueda.toLowerCase())
      return cat && q
    }), [categoria, busqueda])

  return (
    <BeneficiarioLayout>
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.titulo}>Explorar Lotes</h1>
            <p className={styles.subtitulo}>Donaciones disponibles de comercios aliados en Quito.</p>
          </div>
          <div className={styles.searchWrap}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Buscar producto o comercio..." value={busqueda} onChange={e => setBusqueda(e.target.value)} className={styles.searchInput} />
          </div>
        </div>

        {solicitado && (
          <div className={styles.toast}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            ¡Solicitud enviada! El comercio revisará tu pedido y te confirmará el retiro.
          </div>
        )}

        <div className={styles.filtros}>
          {CATEGORIAS.map(c => (
            <button key={c} onClick={() => setCategoria(c)} className={`${styles.pill} ${categoria === c ? styles.pillActivo : ''}`}>
              {c}
              <span className={styles.pillCnt}>{c === 'Todos' ? LOTES.length : LOTES.filter(l => l.categoria === c).length}</span>
            </button>
          ))}
          <span className={styles.pillResultado}>{lotesFiltrados.length} lotes</span>
        </div>

        <div className={styles.grid}>
          {lotesFiltrados.map(l => (
            <article key={l.id} className={styles.card}>
              <div className={styles.cardImgWrap}>
                <img src={l.img} alt={l.nombre} className={styles.cardImg} loading="lazy" />
                <span className={`${styles.tag} ${styles[`tag_${l.tagVar}`]}`}>{l.tag}</span>
                <span className={styles.kgBadge}>{l.kg}</span>
              </div>
              <div className={styles.cardBody}>
                <span className={styles.cardCat}>{l.categoria}</span>
                <h3 className={styles.cardNombre}>{l.nombre}</h3>
                <p className={styles.cardComercio}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {l.comercio} · {l.zona}
                </p>
                <p className={styles.cardDesc}>{l.desc}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.cardCaduca}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {l.caduca}
                  </span>
                  <button
                    className={`${styles.btnSolicitar} ${solicitado === l.id ? styles.btnSolicitarOk : ''}`}
                    onClick={() => setSolicitado(l.id)}
                    disabled={solicitado === l.id}
                  >
                    {solicitado === l.id ? '✓ Solicitado' : 'Solicitar donación'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </BeneficiarioLayout>
  )
}