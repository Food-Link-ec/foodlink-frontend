import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ComercioLayout from '../components/ComercioLayout'
import { sugerirPublicacion, analizarImagen } from '../../lotes/services/iaService'
import { publicarLote } from '../../lotes/services/loteService'
import { subirImagenCloudinary } from '../../../utils/cloudinaryUpload'
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
  const [modalidad, setModalidad] = useState<'DONACION' | 'VENTA'>('DONACION')
  const [cantidad, setCantidad] = useState('')
  const [unidad, setUnidad] = useState('kg')
  const [fecha, setFecha] = useState('')
  const [precio, setPrecio] = useState('')
  const [precioOriginal, setPrecioOriginal] = useState('')
  const [descuentoPct, setDescuentoPct] = useState<number | null>(null)
  const [descripcion, setDescripcion] = useState('')
  const [direccion, setDireccion] = useState('')
  const [horario, setHorario] = useState('')
  const [imgPreview, setImgPreview] = useState<string | null>(null)
  const [subiendoImagen, setSubiendoImagen] = useState(false)
  const [confianzaIA, setConfianzaIA] = useState<string | null>(null)
  const [fechaVerificada, setFechaVerificada] = useState(false)
  const [verificandoFecha, setVerificandoFecha] = useState(false)
  const [fuenteVerificacion, setFuenteVerificacion] = useState<string | null>(null)
  const [modalVerificar, setModalVerificar] = useState(false)
  const [imgVerificacion, setImgVerificacion] = useState<string | null>(null)
  const [fileVerificacion, setFileVerificacion] = useState<File | null>(null)
  const [verificacionResultado, setVerificacionResultado] = useState<{
    ocr: { fecha: string | null; confianza: string; fuente: string } | null
    gemini: { fecha: string | null; confianza: string; fuente: string } | null
    fechaFinal: string | null
  } | null>(null)
  const [publicando, setPublicando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const calcularDescuento = (original: string, rebajado: string) => {
    const o = parseFloat(original)
    const r = parseFloat(rebajado)
    if (o > 0 && r > 0 && r < o) {
      setDescuentoPct(Math.round(((o - r) / o) * 100))
    } else {
      setDescuentoPct(null)
    }
  }

  const handleImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSubiendoImagen(true)
    setConfianzaIA(null)
    setFechaVerificada(false)

    try {
      // Subir a Cloudinary (o base64 si no está configurado)
      const url = await subirImagenCloudinary(file)
      setImgPreview(url)

      // Análisis IA con el archivo original
      const sugerencia = await sugerirPublicacion(file)
      if (sugerencia.fechaCaducidadSugerida) setFecha(sugerencia.fechaCaducidadSugerida.slice(0, 16))
      if (sugerencia.categoriaProductoSugerida) setCategoria(sugerencia.categoriaProductoSugerida)
      if (sugerencia.descripcionSugerida) setDescripcion(sugerencia.descripcionSugerida)
      setConfianzaIA(sugerencia.confianzaFecha?.toUpperCase() ?? null)
    } catch {
      setError('No se pudo subir la imagen. Intenta de nuevo.')
    } finally {
      setSubiendoImagen(false)
    }
  }

  const handleImgVerificacion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileVerificacion(file)
    setVerificacionResultado(null)
    const reader = new FileReader()
    reader.onloadend = () => setImgVerificacion(reader.result as string)
    reader.readAsDataURL(file)
  }

  const ejecutarVerificacionDoble = async () => {
    if (!fileVerificacion) return
    setVerificandoFecha(true)
    setVerificacionResultado(null)
    setError(null)

    try {
      // PASO 1 — OCR (Tesseract via /ia/analizar-imagen)
      const resultadoOcr = await analizarImagen(fileVerificacion)
      const ocrFecha = resultadoOcr.fechaDetectada ?? null
      const ocrConfianza = resultadoOcr.confianzaFecha?.toUpperCase() ?? 'NO_DETECTADA'
      const ocrFuente = resultadoOcr.fuenteOcr?.toUpperCase() ?? 'NINGUNO'

      // PASO 2 — Gemini via /ia/sugerir-publicacion (siempre corre aunque OCR haya detectado)
      const resultadoGemini = await sugerirPublicacion(fileVerificacion)
      const geminiFecha = resultadoGemini.fechaCaducidadSugerida ?? null
      const geminiConfianza = resultadoGemini.confianzaFecha?.toUpperCase() ?? 'NO_DETECTADA'
      const geminiFuente = resultadoGemini.fuenteOcr?.toUpperCase() ?? 'NINGUNO'

      // Elegir la mejor fecha: prioridad OCR alta > Gemini alta > OCR media > Gemini media > cualquiera
      let fechaFinal: string | null = null
      if (ocrConfianza === 'ALTA' && ocrFecha) fechaFinal = ocrFecha
      else if (geminiConfianza === 'ALTA' && geminiFecha) fechaFinal = geminiFecha
      else if (ocrConfianza === 'MEDIA' && ocrFecha) fechaFinal = ocrFecha
      else if (geminiConfianza === 'MEDIA' && geminiFecha) fechaFinal = geminiFecha
      else if (ocrFecha) fechaFinal = ocrFecha
      else if (geminiFecha) fechaFinal = geminiFecha

      setVerificacionResultado({
        ocr: { fecha: ocrFecha, confianza: ocrConfianza, fuente: ocrFuente },
        gemini: { fecha: geminiFecha, confianza: geminiConfianza, fuente: geminiFuente },
        fechaFinal,
      })
    } catch {
      setError('Error al verificar la fecha. Intenta de nuevo.')
    } finally {
      setVerificandoFecha(false)
    }
  }

  const confirmarFechaVerificada = () => {
    if (!verificacionResultado?.fechaFinal) return
    // Convertir DD/MM/AAAA a datetime-local si viene en ese formato
    const raw = verificacionResultado.fechaFinal
    let fechaISO = raw
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
      const [d, m, y] = raw.split('/')
      fechaISO = `${y}-${m}-${d}T23:59`
    } else if (raw.length >= 10) {
      fechaISO = raw.slice(0, 16)
    }
    setFecha(fechaISO)
    setFechaVerificada(true)
    setFuenteVerificacion('OCR + GEMINI')
    setConfianzaIA(verificacionResultado.ocr?.confianza ?? verificacionResultado.gemini?.confianza ?? 'MEDIA')
    setModalVerificar(false)
    setImgVerificacion(null)
    setFileVerificacion(null)
    setVerificacionResultado(null)
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
      if (modalidad === 'VENTA' && !fechaVerificada) {
        const continuar = window.confirm(
          '⚠️ La fecha de caducidad no fue verificada con IA.\n\n' +
          '¿Deseas continuar sin verificarla? Asegúrate de que la fecha ingresada sea correcta.'
        )
        if (!continuar) { setPublicando(false); return }
      }

      await publicarLote({
        modalidad,
        cantidadKg: parseFloat(cantidad),
        precio: modalidad === 'VENTA' ? parseFloat(precio) : null,
        precioMercado: modalidad === 'VENTA' && precioOriginal ? parseFloat(precioOriginal) : null,
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
                      <div style={{display:'flex', gap:'0.5rem', alignItems:'center'}}>
                        <input
                          type="datetime-local"
                          className={styles.input}
                          value={fecha}
                          onChange={e => { setFecha(e.target.value); setFechaVerificada(false); setFuenteVerificacion(null) }}
                          required
                          style={{flex:1}}
                        />
                        <button
                          type="button"
                          onClick={() => { setModalVerificar(true); setVerificacionResultado(null); setImgVerificacion(null); setFileVerificacion(null) }}
                          style={{
                            padding: '0 12px',
                            height: '42px',
                            borderRadius: '8px',
                            border: fechaVerificada ? '2px solid #1F4D3C' : '1.5px solid #D6D0C4',
                            backgroundColor: fechaVerificada ? '#C6E7D2' : '#FAF7F0',
                            color: fechaVerificada ? '#1F4D3C' : '#4F6359',
                            fontWeight: 600,
                            fontSize: '12px',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          {fechaVerificada ? <>✅ Verificada</> : <>🔍 Verificar con IA</>}
                        </button>
                      </div>
                      {fechaVerificada && fuenteVerificacion && (
                        <span className={styles.imgHint} style={{color:'#1F4D3C'}}>
                          ✓ Doble verificación: OCR + Gemini — Fuente: {fuenteVerificacion} · Confianza: {CONFIANZA_LABEL[confianzaIA ?? ''] ?? confianzaIA}
                        </span>
                      )}
                      {!fechaVerificada && confianzaIA && (
                        <span className={styles.imgHint}>
                          Detectado por IA ({CONFIANZA_LABEL[confianzaIA] ?? confianzaIA}) — sin verificar
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <section className={styles.seccion}>
                <h2 className={styles.seccionTitulo}>Modalidad y precio</h2>
                <div className={styles.modalidades}>
                  {[{val:'DONACION',label:'Donación',sub:'Gratis para beneficiarios'},{val:'VENTA',label:'Venta',sub:'A precio de rescate'}].map(m => (
                    <button type="button" key={m.val} onClick={() => setModalidad(m.val as typeof modalidad)} className={`${styles.modalidadBtn} ${modalidad === m.val ? styles.modalidadActiva : ''}`}>
                      <span className={styles.modalidadLabel}>{m.label}</span>
                      <span className={styles.modalidadSub}>{m.sub}</span>
                    </button>
                  ))}
                </div>
                {modalidad === 'VENTA' && (
                  <div style={{marginTop:'1rem', display:'flex', flexDirection:'column', gap:'0.75rem'}}>
                    <div className={styles.campoRow}>
                      <div className={styles.campo}>
                        <label className={styles.label}>Precio de mercado ($) *</label>
                        <input
                          type="number" min="0" step="0.01" placeholder="0.00"
                          className={styles.input}
                          value={precioOriginal}
                          onChange={e => { setPrecioOriginal(e.target.value); calcularDescuento(e.target.value, precio) }}
                          required
                        />
                        <span className={styles.imgHint}>Precio normal sin descuento</span>
                      </div>
                      <div className={styles.campo}>
                        <label className={styles.label}>Precio de rescate ($) *</label>
                        <input
                          type="number" min="0" step="0.01" placeholder="0.00"
                          className={styles.input}
                          value={precio}
                          onChange={e => { setPrecio(e.target.value); calcularDescuento(precioOriginal, e.target.value) }}
                          required
                        />
                        <span className={styles.imgHint}>Precio rebajado para el comprador</span>
                      </div>
                      <div className={styles.campo}>
                        <label className={styles.label}>Descuento</label>
                        <div className={styles.input} style={{
                          display:'flex', alignItems:'center', justifyContent:'center',
                          fontWeight: 700, fontSize:'1.25rem',
                          color: descuentoPct ? '#1F4D3C' : '#A0AAB2',
                          backgroundColor: descuentoPct ? '#C6E7D2' : '#F5F5F5',
                          cursor: 'default'
                        }}>
                          {descuentoPct ? `-${descuentoPct}%` : '—'}
                        </div>
                        <span className={styles.imgHint}>Calculado automáticamente</span>
                      </div>
                    </div>
                    {descuentoPct !== null && descuentoPct < 20 && (
                      <p style={{fontSize:'12px', color:'#B3452C', margin:0}}>
                        ⚠️ El descuento es menor al 20%. FoodLink recomienda al menos 30% para atraer compradores.
                      </p>
                    )}
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

        {/* Modal verificación de fecha con doble check OCR + Gemini */}
        {modalVerificar && (
          <div style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, padding: '1rem'
          }} onClick={() => setModalVerificar(false)}>
            <div style={{
              backgroundColor: '#FAF7F0', borderRadius: '16px', padding: '2rem',
              width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '1.25rem'
            }} onClick={e => e.stopPropagation()}>

              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <h3 style={{margin:0, color:'#1F4D3C', fontSize:'1.1rem', fontWeight:800}}>
                  🔍 Verificar fecha de caducidad
                </h3>
                <button type="button" onClick={() => setModalVerificar(false)}
                  style={{background:'none', border:'none', cursor:'pointer', fontSize:'1.2rem', color:'#667A70'}}>✕</button>
              </div>

              <p style={{margin:0, fontSize:'13px', color:'#4F6359'}}>
                Sube una foto clara de la etiqueta o fecha de caducidad del producto.
                Se verificará con <strong>OCR (Tesseract)</strong> y luego con <strong>Gemini AI</strong>.
              </p>

              {/* Upload / cámara */}
              <label style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                border: '2px dashed #D6D0C4', borderRadius: '12px', padding: '1.5rem',
                cursor: 'pointer', backgroundColor: '#FFF', gap: '0.5rem', minHeight: '140px'
              }}>
                {imgVerificacion ? (
                  <img src={imgVerificacion} alt="Etiqueta" style={{maxHeight:'120px', borderRadius:'8px', objectFit:'contain'}}/>
                ) : (
                  <>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4F6359" strokeWidth="1.5">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                    <span style={{fontSize:'13px', color:'#667A70', fontWeight:600}}>Subir foto o usar cámara</span>
                    <span style={{fontSize:'11px', color:'#A0AAB2'}}>JPG, PNG — máx. 5 MB</span>
                  </>
                )}
                <input type="file" accept="image/*" capture="environment" onChange={handleImgVerificacion}
                  style={{display:'none'}}/>
              </label>

              {/* Botón verificar */}
              {fileVerificacion && !verificacionResultado && (
                <button type="button" onClick={ejecutarVerificacionDoble} disabled={verificandoFecha}
                  style={{
                    padding: '12px', borderRadius: '10px', border: 'none',
                    backgroundColor: '#1F4D3C', color: '#FFF',
                    fontWeight: 700, fontSize: '14px', cursor: 'pointer'
                  }}>
                  {verificandoFecha ? '⏳ Analizando con OCR + Gemini…' : '🔍 Verificar fecha'}
                </button>
              )}

              {/* Resultado doble verificación */}
              {verificacionResultado && (
                <div style={{display:'flex', flexDirection:'column', gap:'0.75rem'}}>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.5rem'}}>
                    {/* OCR */}
                    <div style={{
                      padding:'0.75rem', borderRadius:'10px',
                      backgroundColor: verificacionResultado.ocr?.fecha ? '#DCFCE7' : '#FEE2E2',
                      border: `1px solid ${verificacionResultado.ocr?.fecha ? '#86EFAC' : '#FCA5A5'}`
                    }}>
                      <p style={{margin:'0 0 4px 0', fontSize:'11px', fontWeight:700, color:'#374151'}}>
                        PASO 1 — OCR (Tesseract)
                      </p>
                      <p style={{margin:'0 0 2px 0', fontSize:'13px', fontWeight:600, color:'#1F2937'}}>
                        {verificacionResultado.ocr?.fecha ?? 'No detectada'}
                      </p>
                      <p style={{margin:0, fontSize:'11px', color:'#6B7280'}}>
                        Confianza: {verificacionResultado.ocr?.confianza ?? '—'}
                      </p>
                    </div>
                    {/* Gemini */}
                    <div style={{
                      padding:'0.75rem', borderRadius:'10px',
                      backgroundColor: verificacionResultado.gemini?.fecha ? '#DCFCE7' : '#FEE2E2',
                      border: `1px solid ${verificacionResultado.gemini?.fecha ? '#86EFAC' : '#FCA5A5'}`
                    }}>
                      <p style={{margin:'0 0 4px 0', fontSize:'11px', fontWeight:700, color:'#374151'}}>
                        PASO 2 — Gemini AI
                      </p>
                      <p style={{margin:'0 0 2px 0', fontSize:'13px', fontWeight:600, color:'#1F2937'}}>
                        {verificacionResultado.gemini?.fecha ?? 'No detectada'}
                      </p>
                      <p style={{margin:0, fontSize:'11px', color:'#6B7280'}}>
                        Confianza: {verificacionResultado.gemini?.confianza ?? '—'}
                      </p>
                    </div>
                  </div>

                  {/* Fecha final seleccionada */}
                  {verificacionResultado.fechaFinal ? (
                    <div style={{
                      padding:'1rem', borderRadius:'10px',
                      backgroundColor:'#C6E7D2', border:'2px solid #1F4D3C',
                      display:'flex', justifyContent:'space-between', alignItems:'center'
                    }}>
                      <div>
                        <p style={{margin:'0 0 2px 0', fontSize:'11px', fontWeight:700, color:'#1F4D3C'}}>
                          ✅ FECHA VERIFICADA
                        </p>
                        <p style={{margin:0, fontSize:'16px', fontWeight:800, color:'#1F4D3C'}}>
                          {verificacionResultado.fechaFinal}
                        </p>
                      </div>
                      <button type="button" onClick={confirmarFechaVerificada}
                        style={{
                          padding:'10px 16px', borderRadius:'8px', border:'none',
                          backgroundColor:'#1F4D3C', color:'#FFF',
                          fontWeight:700, fontSize:'13px', cursor:'pointer'
                        }}>
                        Usar esta fecha
                      </button>
                    </div>
                  ) : (
                    <div style={{
                      padding:'1rem', borderRadius:'10px',
                      backgroundColor:'#FEE2E2', border:'1px solid #FCA5A5'
                    }}>
                      <p style={{margin:'0 0 4px 0', fontSize:'12px', fontWeight:700, color:'#991B1B'}}>
                        ⚠️ No se pudo detectar la fecha
                      </p>
                      <p style={{margin:0, fontSize:'12px', color:'#7F1D1D'}}>
                        Intenta con una foto más clara de la etiqueta, o ingresa la fecha manualmente.
                      </p>
                    </div>
                  )}

                  <button type="button" onClick={() => { setVerificacionResultado(null); setImgVerificacion(null); setFileVerificacion(null) }}
                    style={{
                      padding:'8px', borderRadius:'8px', border:'1px solid #D6D0C4',
                      backgroundColor:'transparent', color:'#4F6359',
                      fontSize:'12px', fontWeight:600, cursor:'pointer'
                    }}>
                    Intentar con otra imagen
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </ComercioLayout>
  )
}
