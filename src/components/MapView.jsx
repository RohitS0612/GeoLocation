import React, { useMemo, useEffect, forwardRef, useImperativeHandle } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const getIcon = (status, selected) => {
  const color = { 'Active': '#4caf50', 'Pending': '#ff9800', 'Completed': '#2196f3', 'On Hold': '#f44336' }[status] || '#9e9e9e';
  const size = selected ? 35 : 25;
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: ${size}px; height: ${size}px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.3);"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
};

function MapControl({ selectedId, data }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedId) return;
    const item = data.find(d => d.id === selectedId);
    if (item) {
      map.setView([item.latitude, item.longitude], 10, { animate: true });
      
      // Open popup
      setTimeout(() => {
        map.eachLayer(l => {
          if (l.options?.id === selectedId) l.openPopup();
        });
      }, 500);
    }
  }, [selectedId, data, map]);

  return null;
}

const MapView = forwardRef(({ data, selectedId, onMarkerClick }, ref) => {
  const markers = useMemo(() => data.map(item => (
    <Marker
      key={item.id}
      id={item.id}
      position={[item.latitude, item.longitude]}
      icon={getIcon(item.status, item.id === selectedId)}
      eventHandlers={{ click: () => onMarkerClick(item.id) }}
    >
      <Popup>
        <div style={{ textAlign: 'center' }}>
          <h3>{item.projectName}</h3>
          <p>Status: <b>{item.status}</b></p>
          <small>{item.region}</small>
        </div>
      </Popup>
    </Marker>
  )), [data, selectedId, onMarkerClick]);

  return (
    <MapContainer
      center={[-25, 133]}
      zoom={4}
      style={{ height: '100%', width: '100%', borderRadius: '8px' }}
      preferCanvas={true}
    >
      <TileLayer
        attribution='Tiles &copy; Esri &mdash; Source: Esri'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      
      <MarkerClusterGroup chunkedLoading maxClusterRadius={50}>
        {markers}
      </MarkerClusterGroup>

      <MapControl selectedId={selectedId} data={data} />
    </MapContainer>
  );
});

export default MapView;
