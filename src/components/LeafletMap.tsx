import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import emojiAvatar4 from '../assets/images/emoji_avatar4.png';

// Importar las imágenes de los iconos
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix para los iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface LeafletMapProps {
  className?: string;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ className = '' }) => {
  useEffect(() => {
    // Crear el mapa sin controles de zoom
    const map = L.map('map-container', {
      zoomControl: false,
      attributionControl: false,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
      scrollWheelZoom: true,
      boxZoom: true,
      keyboard: true
    }).setView([-12.0775, -77.0428], 15); // Jesús María, Lima

    // Agregar capa de tiles sin atribución
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(map);

    // Forzar que el mapa se ajuste al contenedor
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    // Agregar marcador personalizado con tu emoji sin fondo
    const customIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; overflow: hidden; background: transparent;"><img src="${emojiAvatar4}" style="width: 80px; height: 80px; object-fit: cover; background: transparent;" alt="Avatar" /></div>`,
      iconSize: [100, 100],
      iconAnchor: [50, 50]
    });

    L.marker([-12.0775, -77.0428], { icon: customIcon }).addTo(map);

    // Limpiar el mapa cuando el componente se desmonte
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div 
      id="map-container" 
      className={`w-full h-full ${className}`} 
      style={{ 
        overflow: 'hidden', 
        borderRadius: '1.5rem', 
        margin: 0, 
        padding: 0,
        position: 'relative'
      }}
    />
  );
};

export default LeafletMap;
