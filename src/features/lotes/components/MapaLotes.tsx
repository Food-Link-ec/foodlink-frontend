import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import type { LoteResponse } from '../types/lote.types'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const MODALIDAD_LABEL: Record<string, string> = {
  VENTA: 'Venta',
  DONACION: 'Donación',
  RETIRO_DIRECTO: 'Retiro',
}

interface MapaLotesProps {
  lotes: LoteResponse[]
  centro?: [number, number]
  onLoteClick?: (loteId: string) => void
}

export const MapaLotes = ({ lotes, centro, onLoteClick }: MapaLotesProps) => {
  const lotesConUbicacion = lotes.filter(
    (l): l is LoteResponse & { latitud: number; longitud: number } => l.latitud !== null && l.longitud !== null
  )

  return (
    <MapContainer
      center={centro ?? [-0.1807, -78.4897]}
      zoom={13}
      style={{ height: '400px', width: '100%', borderRadius: '8px' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {lotesConUbicacion.map((lote) => (
        <Marker
          key={lote.id}
          position={[lote.latitud, lote.longitud]}
          eventHandlers={{ click: () => onLoteClick?.(lote.id) }}
        >
          <Popup>
            <strong>{lote.descripcion}</strong>
            <br />
            {lote.cantidadKg} kg · {MODALIDAD_LABEL[lote.modalidad] ?? lote.modalidad}
            {lote.precioReducido != null ? ` — $${lote.precioReducido.toFixed(2)}` : ' — Donación gratuita'}
            <br />
            <button onClick={() => onLoteClick?.(lote.id)}>Ver detalle</button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
