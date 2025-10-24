import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import emojiAvatar4 from '../assets/images/emoji_avatar4.png';

// Crear icono personalizado con el emoji avatar
const createCustomIcon = () => {
  return L.icon({
    iconUrl: emojiAvatar4,
    iconSize: [96, 96], // Tamaño del icono gigante
    iconAnchor: [48, 48], // Punto de anclaje (centro del emoji)
    popupAnchor: [0, -48], // Posición del popup relativa al icono
    className: 'custom-marker'
  });
};

const MapComponent: React.FC = () => {
  // Coordenadas de Jesús María, Lima, Perú
  const position: [number, number] = [-12.0769, -77.0428];

  return (
    <div className="w-full h-full rounded-xl overflow-hidden">
      <MapContainer
        center={position}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        className="rounded-xl"
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={createCustomIcon()}>
          <Popup>
            <div className="text-center">
              <div className="text-sm font-bold text-gray-800">Jesús María</div>
              <div className="text-xs text-gray-600">Lima, Perú</div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
