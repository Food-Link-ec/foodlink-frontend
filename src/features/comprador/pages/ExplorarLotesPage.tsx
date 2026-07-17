import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CompradorLayout from '../components/CompradorLayout'
import { getLotes, buscarLotes } from '../../lotes/services/loteService'
import { MapaLotes } from '../../lotes/components/MapaLotes'
import type { LoteResponse } from '../../lotes/types/lote.types'
import { getMisEstadisticas } from '../../perfil/services/perfilService'
import type { EstadisticasCompradorResponse } from '../../perfil/services/perfilService'
import { calcularDescuento, fechaRelativa } from '../../../utils/loteUtils'
import styles from './ExplorarLotesPage.module.css'

const MODALIDAD_LABEL: Record<string, string> = {
  VENTA: 'Venta',
  DONACION: 'Donación',
  RETIRO_DIRECTO: 'Retiro',
}

const CATEGORIA_LABELS: Record<string, string> = {
  FRUTAS_VERDURAS: 'Frutas y Verduras',
  LACTEOS: 'Lácteos',
  PANADERIA: 'Panadería',
  CARNES: 'Carnes',
  ABARROTES: 'Abarrotes',
  COMIDA_PREPARADA: 'Comida Preparada',
  BEBIDAS: 'Bebidas',
}

const TAMANIO_PAGINA = 10

const formatModalidad = (modalidad: string) => MODALIDAD_LABEL[modalidad] ?? modalidad
const formatCategoria = (categoria: string) => CATEGORIA_LABELS[categoria] ?? categoria

export default function ExplorarLotesPage() {
  const [lotes, setLotes] = useState<LoteResponse[]>([])
  const [pagina, setPagina] = useState(0)
  const [totalPaginas, setTotalPaginas] = useState(0)
  const [totalElementos, setTotalElementos] = useState(0)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [categorias, setCategorias] = useState<string[]>([])
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
  const [busquedaAplicada, setBusquedaAplicada] = useState('')
  const [vista, setVista] = useState<'lista' | 'mapa'>('lista')
  const [ubicacion, setUbicacion] = useState<{ lat: number; lng: number } | null>(null)
  const [buscandoUbicacion, setBuscandoUbicacion] = useState(false)
  const [estadisticas, setEstadisticas] = useState<EstadisticasCompradorResponse | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    getLotes()
      .then((data) => {
        const unicas = Array.from(new Set(data.map((l) => l.categoriaProducto).filter(Boolean))) as string[]
        setCategorias(unicas)
      })
      .catch(() => {})
    getMisEstadisticas()
      .then(setEstadisticas)
      .catch(() => { /* el comprador puede no tener estadísticas aún */ })
  }, [])

  useEffect(() => {
    let cancelado = false
    setCargando(true)
    setError(null)
    buscarLotes({
      q: busquedaAplicada || undefined,
      categoria: categoriaActiva === 'Todos' ? undefined : categoriaActiva,
      lat: ubicacion?.lat,
      lng: ubicacion?.lng,
      radioKm: ubicacion ? 5 : undefined,
      page: pagina,
      size: TAMANIO_PAGINA,
    })
      .then((res) => {
        if (cancelado) return
        setLotes(res.contenido)
        setTotalPaginas(res.totalPaginas)
        setTotalElementos(res.totalElementos)
      })
      .catch(() => { if (!cancelado) setError('No se pudo cargar el catálogo de lotes.') })
      .finally(() => { if (!cancelado) setCargando(false) })
    return () => { cancelado = true }
  }, [busquedaAplicada, categoriaActiva, ubicacion, pagina])

  const buscarCercanos = () => {
    setError(null)
    setBuscandoUbicacion(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUbicacion({ lat: position.coords.latitude, lng: position.coords.longitude })
        setVista('lista')
        setPagina(0)
        setBuscandoUbicacion(false)
      },
      () => {
        setError('No se pudo obtener tu ubicación.')
        setBuscandoUbicacion(false)
      }
    )
  }

  const limpiarUbicacion = () => {
    setUbicacion(null)
    setPagina(0)
  }

  const handleBuscar = () => {
    setBusquedaAplicada(busqueda)
    setPagina(0)
  }

  const centroMapa = useMemo<[number, number] | undefined>(
    () => (ubicacion ? [ubicacion.lat, ubicacion.lng] : undefined),
    [ubicacion]
  )

  return (
    <CompradorLayout>
      <div className={styles.page}>

        {/* HERO STATS */}
        {estadisticas && (
          <section className={styles.heroStats}>
            <div className={styles.heroMain}>
              <p className={styles.heroEyebrow}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                Tu ahorro total acumulado
              </p>
              <div className={styles.heroMonto}>
                <span className={styles.heroCurrency}>$</span>
                {(estadisticas.ahorroEstimado).toFixed(2)}
              </div>
              <p className={styles.heroSub}>{estadisticas.mensajeAhorro}</p>
            </div>

            <div className={styles.heroDividerV}/>

            <div className={styles.heroStats3}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNum}>{estadisticas.totalLotesComprados}</span>
                <span className={styles.heroStatLabel}>Lotes rescatados</span>
              </div>
              <div className={styles.heroStatDiv}/>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNum}>{(estadisticas.totalKgAdquiridos).toFixed(1)} kg</span>
                <span className={styles.heroStatLabel}>Alimento rescatado</span>
              </div>
              <div className={styles.heroStatDiv}/>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNum}>{totalElementos}</span>
                <span className={styles.heroStatLabel}>Lotes disponibles hoy</span>
              </div>
            </div>
          </section>
        )}

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
                placeholder="Buscar por descripción..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleBuscar()}
                className={styles.searchInput}
              />
              {busqueda && (
                <button className={styles.clearSearch} onClick={() => { setBusqueda(''); setBusquedaAplicada(''); setPagina(0) }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* PILLS */}
        <div className={styles.pills}>
          {['Todos', ...categorias].map(cat => (
            <button
              key={cat}
              onClick={() => { setCategoriaActiva(cat); setPagina(0) }}
              className={`${styles.pill} ${categoriaActiva === cat ? styles.pillActivo : ''}`}
            >
              {cat === 'Todos' ? cat : formatCategoria(cat)}
            </button>
          ))}
          <span className={styles.pillResultado}>{totalElementos} lotes disponibles</span>
        </div>

        {/* ACCIONES: cerca de mí + vista lista/mapa */}
        <div className={styles.pills} style={{ marginTop: '-0.5rem' }}>
          <button
            className={`${styles.pill} ${ubicacion ? styles.pillActivo : ''}`}
            onClick={ubicacion ? limpiarUbicacion : buscarCercanos}
            disabled={buscandoUbicacion}
          >
            📍 {buscandoUbicacion ? 'Buscando ubicación…' : ubicacion ? '✓ Cerca de mí (5 km)' : 'Lotes cerca de mí'}
          </button>
          <button className={`${styles.pill} ${vista === 'lista' ? styles.pillActivo : ''}`} onClick={() => setVista('lista')}>Lista</button>
          <button className={`${styles.pill} ${vista === 'mapa' ? styles.pillActivo : ''}`} onClick={() => setVista('mapa')}>Mapa</button>
        </div>

        {/* ESTADOS DE CARGA */}
        {cargando && <p className={styles.subtitulo}>Cargando catálogo…</p>}
        {error && <p className={styles.subtitulo} style={{ color: '#B3452C' }}>{error}</p>}

        {vista === 'mapa' && !cargando && !error && (
          <MapaLotes
            lotes={lotes}
            centro={centroMapa}
            onLoteClick={(id) => navigate(`/dashboard/comprador/lote/${id}`)}
            ubicacionUsuario={centroMapa}
          />
        )}

        {/* GRID */}
        {vista === 'lista' && !cargando && !error && (
          lotes.length === 0 ? (
            <div className={styles.vacio}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <p>No hay lotes para esta búsqueda.</p>
              <button className={styles.vacioBtn} onClick={() => { setCategoriaActiva('Todos'); setBusqueda(''); setBusquedaAplicada(''); limpiarUbicacion() }}>Ver todos</button>
            </div>
          ) : (
            <>
              <div className={styles.grid}>
                {lotes.map(lote => {
                  const gratis = lote.modalidad === 'DONACION' || !lote.precioReducido
                  const ahorro = lote.precioNormal && lote.precioReducido
                    ? calcularDescuento(lote.precioNormal, lote.precioReducido)
                    : 0
                  return (
                    <article
                      key={lote.id}
                      className={styles.card}
                      onClick={() => navigate(`/dashboard/comprador/lote/${lote.id}`)}
                    >
                      <div className={styles.cardImgWrap}>
                        {lote.fotosUrl?.[0] && (
                          <img src={lote.fotosUrl[0]} alt={lote.descripcion} className={styles.cardImg} loading="lazy" />
                        )}
                        <div className={styles.cardImgOverlay}/>
                        {gratis && (
                          <span className={styles.modalidadBadge} data-tipo="donacion">GRATIS</span>
                        )}
                      </div>

                      <div className={styles.cardBody}>
                        <div className={styles.cardMeta}>
                          {lote.categoriaProducto && <span className={styles.cardCat}>{formatCategoria(lote.categoriaProducto)}</span>}
                          <span className={`${styles.cardMod} ${styles[`mod_${formatModalidad(lote.modalidad).toLowerCase()}`] ?? ''}`}>
                            {formatModalidad(lote.modalidad)}
                          </span>
                        </div>

                        <h3 className={styles.cardNombre}>{lote.descripcion}</h3>

                        <div className={styles.cardDetalle}>
                          <span>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                            {lote.cantidadKg} kg
                          </span>
                          <span>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            {fechaRelativa(lote.fechaCaducidad)}
                          </span>
                          <span>{lote.estado}</span>
                        </div>

                        <div className={styles.cardFooter}>
                          <div>
                            {lote.precioNormal != null && (
                              <span className={styles.precioAntes}>${lote.precioNormal.toFixed(2)}</span>
                            )}
                            <span className={styles.precioOferta}>
                              {gratis ? 'Gratis' : `$${lote.precioReducido!.toFixed(2)}`}
                            </span>
                          </div>
                          {!gratis && ahorro > 0 && (
                            <span className={styles.badgeAhorro}>-{ahorro}%</span>
                          )}
                        </div>

                        <button
                          className={styles.btnReservar}
                          onClick={e => { e.stopPropagation(); navigate(`/dashboard/comprador/lote/${lote.id}`) }}
                        >
                          Ver detalle y reservar
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>

              {totalPaginas > 1 && (
                <div className={styles.pills} style={{ justifyContent: 'center' }}>
                  <button className={styles.pill} disabled={pagina === 0} onClick={() => setPagina(p => p - 1)}>Anterior</button>
                  <span className={styles.pillResultado}>Página {pagina + 1} de {totalPaginas}</span>
                  <button className={styles.pill} disabled={pagina >= totalPaginas - 1} onClick={() => setPagina(p => p + 1)}>Siguiente</button>
                </div>
              )}
            </>
          )
        )}
      </div>
    </CompradorLayout>
  )
}
