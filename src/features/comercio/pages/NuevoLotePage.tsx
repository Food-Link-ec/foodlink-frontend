import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ComercioLayout from '../components/ComercioLayout'
import { sugerirPublicacion } from '../../lotes/services/iaService'
import { publicarLote } from '../../lotes/services/loteService'
import styles from './NuevoLotePage.module.css'

const CATEGORIAS = ['Panadería', 'Frutas y Verduras', 'Lácteos', 'Preparados', 'Carnes', 'Bebidas', 'Otros']

const CONFIANZA_LABEL: Record<string, string> = {
  ALTA: 'Alta confianza',
  MEDIA: 'Confianza media',
  BAJA: 'Confianza baja',
  NO_DETECTADA: 'No se detectó fecha',
}

export default function NuevoLotePage() {
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [categoria, setCategoria] = useState('')
  const [modalidad, setModalidad] = useState<'DONACION' | 'VENTA' | 'RETIRO_DIRECTO'>('DONACION')
  const [cantidad, setCantidad] = useState('')
  const [unidad, setUnidad] = useState('kg')
  const [fecha, setFecha] = useState('')
  const [precio, setPrecio] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [direccion, setDireccion] = useState('')
  const [horario, setHorario] = useState('')
  const [imgPreview, setImgPreview] = useState<string | null>(null)
  const [subiendoImagen, setSubiendoImagen] = useState(false)
  const [confianzaIA, setConfianzaIA] = useState<string | null>(null)
  const [publicando, setPublicando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => setImgPreview(reader.result as string)
    reader.readAsDataURL(file)

    setSubiendoImagen(true)
    setConfianzaIA(null)
    try {
      const sugerencia = await sugerirPublicacion(file)
      if (sugerencia.fechaCaducidadSugerida) setFecha(sugerencia.fechaCaducidadSugerida.slice(0, 16))
      if (sugerencia.categoriaProductoSugerida) setCategoria(sugerencia.categoriaProductoSugerida)
      if (sugerencia.descripcionSugerida) setDescripcion(sugerencia.descripcionSugerida)
      setConfianzaIA(sugerencia.confianzaFecha?.toUpperCase() ?? null)
    } catch {
      // Si la IA falla, el comercio completa el formulario manualmente.
    } finally {
      setSubiendoImagen(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!imgPreview) {
      setError('Sube una foto del lote antes de publicar.')
      return
    }

    setPublicando(true)
    try {
      await publicarLote({
        modalidad,
        cantidadKg: parseFloat(cantidad),
        precio: modalidad === 'VENTA' ? parseFloat(precio) : null,
        precioMercado: null,
        fechaCaducidad: fecha.length === 16 ? `${fecha}:00` : fecha,
        descripcion: nombre ? `${nombre}. ${descripcion}` : descripcion,
        fotosUrl: [imgPreview],
        latitud: null,
        longitud: null,
        categoriaProducto: categoria || null,
      })
      navigate('/dashboard/comercio/mis-lotes')
    } catch (err: any) {
      setError(
        err.response?.status === 422
          ? err.response?.data?.mensaje || 'Datos inválidos. Revisa la cantidad, fecha y precio.'
          : 'No se pudo publicar el lote. Intenta de nuevo.'
      )
    } finally {
      setPublicando(false)
    }
  }

  return (
    <ComercioLayout>
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.titulo}>Publicar Nuevo Lote</h1>
            <p className={styles.subtitulo}>Completa la información para publicar tus excedentes en FoodLink.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>

            {/* Columna principal */}
            <div className={styles.colMain}>

              <section className={styles.seccion}>
                <h2 className={styles.seccionTitulo}>Información del lote</h2>
                <div className={styles.campos}>
                  <div className={styles.campo}>
                    <label className={styles.label}>Nombre del producto / lote *</label>
                    <input type="text" placeholder="Ej: Mix Frutas Tropicales" className={styles.input} value={nombre} onChange={e => setNombre(e.target.value)} required />
                  </div>
                  <div className={styles.campo}>
                    <label className={styles.label}>Categoría *</label>
                    <select className={styles.input} value={categoria} onChange={e => setCategoria(e.target.value)} required>
                      <option value="">Selecciona una categoría</option>
                      {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className={styles.campo}>
                    <label className={styles.label}>Descripción</label>
                    <textarea className={`${styles.input} ${styles.textarea}`} rows={3} placeholder="Describe el contenido, calidad y características del lote..." value={descripcion} onChange={e => setDescripcion(e.target.value)}/>
                  </div>
                  <div className={styles.campoRow}>
                    <div className={styles.campo}>
                      <label className={styles.label}>Cantidad (kg) *</label>
                      <input type="number" min="0" step="0.1" placeholder="0" className={styles.input} value={cantidad} onChange={e => setCantidad(e.target.value)} required/>
                    </div>
                    <div className={styles.campo}>
                      <label className={styles.label}>Unidad</label>
                      <select className={styles.input} value={unidad} onChange={e => setUnidad(e.target.value)}>
                        {['kg', 'g', 'litros', 'unidades', 'raciones', 'cajas'].map(u => <option key={u}>{u}</option>)}
                      </select>
                    </div>
                    <div className={styles.campo}>
                      <label className={styles.label}>Fecha de caducidad *</label>
                      <input type="datetime-local" className={styles.input} value={fecha} onChange={e => setFecha(e.target.value)} required/>
                      {confianzaIA && (
                        <span className={styles.imgHint}>Detectado por IA ({CONFIANZA_LABEL[confianzaIA] ?? confianzaIA})</span>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <section className={styles.seccion}>
                <h2 className={styles.seccionTitulo}>Modalidad y precio</h2>
                <div className={styles.modalidades}>
                  {[{val:'DONACION',label:'Donación',sub:'Gratis para beneficiarios'},{val:'VENTA',label:'Venta',sub:'A precio de rescate'},{val:'RETIRO_DIRECTO',label:'Retiro',sub:'Recojo sin costo'}].map(m => (
                    <button type="button" key={m.val} onClick={() => setModalidad(m.val as typeof modalidad)} className={`${styles.modalidadBtn} ${modalidad === m.val ? styles.modalidadActiva : ''}`}>
                      <span className={styles.modalidadLabel}>{m.label}</span>
                      <span className={styles.modalidadSub}>{m.sub}</span>
                    </button>
                  ))}
                </div>
                {modalidad === 'VENTA' && (
                  <div className={styles.campo} style={{marginTop:'1rem'}}>
                    <label className={styles.label}>Precio de rescate ($) *</label>
                    <input type="number" min="0" step="0.01" placeholder="0.00" className={styles.input} value={precio} onChange={e => setPrecio(e.target.value)} required/>
                  </div>
                )}
              </section>

              <section className={styles.seccion}>
                <h2 className={styles.seccionTitulo}>Punto de retiro</h2>
                <div className={styles.campos}>
                  <div className={styles.campo}>
                    <label className={styles.label}>Dirección *</label>
                    <input type="text" placeholder="Av. González Suárez y Muros, Quito" className={styles.input} value={direccion} onChange={e => setDireccion(e.target.value)} required/>
                  </div>
                  <div className={styles.campo}>
                    <label className={styles.label}>Horario de retiro *</label>
                    <input type="text" placeholder="Ej: Hoy, 16:00 – 19:00" className={styles.input} value={horario} onChange={e => setHorario(e.target.value)} required/>
                  </div>
                </div>
              </section>

              {error && (
                <p className={styles.subtitulo} style={{ color: '#B3452C' }}>{error}</p>
              )}
            </div>

            {/* Columna lateral */}
            <div className={styles.colSide}>
              <section className={styles.seccion}>
                <h2 className={styles.seccionTitulo}>Imagen del lote</h2>
                <label className={styles.imgUpload}>
                  {imgPreview
                    ? <img src={imgPreview} alt="Preview" className={styles.imgPreview}/>
                    : <div className={styles.imgPlaceholder}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                        <span>Haz clic para subir una foto</span>
                        <span className={styles.imgHint}>JPG, PNG — máx. 5 MB</span>
                      </div>
                  }
                  <input type="file" accept="image/*" onChange={handleImg} className={styles.imgInput}/>
                </label>
                {subiendoImagen && <p className={styles.imgHint}>Analizando imagen con IA…</p>}
              </section>

              <div className={styles.infoCard}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <div>
                  <p className={styles.infoTitulo}>Consejos para un buen lote</p>
                  <ul className={styles.infoList}>
                    <li>Incluye una foto clara del producto</li>
                    <li>Describe el estado y calidad del alimento</li>
                    <li>Especifica el horario de retiro con precisión</li>
                    <li>Mantén actualizada la cantidad disponible</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.acciones}>
            <button type="submit" className={styles.btnPublicar} disabled={publicando}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              {publicando ? 'Publicando…' : 'Publicar lote'}
            </button>
            <button type="button" className={styles.btnCancelar} onClick={() => navigate(-1)}>Cancelar</button>
          </div>
        </form>
      </div>
    </ComercioLayout>
  )
}
