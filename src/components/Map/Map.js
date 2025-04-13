import { useEffect, useRef } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

const fixLeafletIcons = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
};

const Map = ({ center, places }) => {
  const mapRef = useRef(null);

  const icons = {
    wheelchair: new L.Icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/17573/17573250.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41]
    }),
    toilet: new L.Icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/6212/6212526.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41]
    }),
    tactile: new L.Icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/9434/9434701.png',
      iconSize: [25, 25],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41]
    }),
    hotel: new L.Icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/6030/6030437.png',
      iconSize: [30, 30],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41]
    }),
    restaurant: new L.Icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448653.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41]
    }),
    bank: new L.Icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/3956/3956293.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41]
    }),
    embassy: new L.Icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/5219/5219019.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41]
    }),
    hostel: new L.Icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/10607/10607354.png',
      iconSize: [30, 30],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41]
    }),
    pharmacy: new L.Icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/9922/9922129.png', 
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41]
    })
  };
  useEffect(() => {
    fixLeafletIcons();
    
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 100);
    }
  }, []);

  const getIconForPlace = (place) => {
    if (!place.tags) return icons.wheelchair;
    
    if (place.tags.toilets_wheelchair === 'yes') return icons.toilet;
    if (place.tags.tactile_paving === 'yes') return icons.tactile;
    if (place.tags.tourism === 'hotel') return icons.hotel;
    if (place.tags.amenity === 'restaurant' || place.tags.amenity === 'cafe' || place.tags.amenity === 'fast_food') {
      return icons.restaurant;
    }
    if (place.tags.amenity === 'bank') return icons.bank;
    if (place.tags.office === 'diplomatic') return icons.embassy;
    if (place.tags.tourism === 'hostel') return icons.hostel;
    if (place.tags.amenity === 'pharmacy') return icons.pharmacy;
    return icons.wheelchair;
  };

  
  return (
    <Box className="map-container" sx={{ flexGrow: 1 }}>
      <MapContainer 
        center={center} 
        zoom={15} 
        className="map-view"
        style={{ height: '100%', width: '100%' }}
        preferCanvas={true}
        whenCreated={(map) => {
          mapRef.current = map;
          setTimeout(() => {
            map.invalidateSize();
          }, 100);
        }}
      > 
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {places.map((place) => {
          if (!place.lat || !place.lon) return null;
          
          const icon = getIconForPlace(place);
          const markerType = place.tags?.tourism === 'hotel' ? 'hotel-marker' : 
                           place.tags?.amenity === 'restaurant' ? 'restaurant-marker' : 
                           'custom-marker';
          
          return (
            <Marker 
              key={place.id} 
              position={[place.lat, place.lon]} 
              icon={icon}
              className={`custom-marker ${markerType}`}
            >
              <Popup className="custom-popup">
                <Typography variant="subtitle1">
                  {place.tags?.name || 'Місце без назви'}
                </Typography>
                <Typography variant="body2">
                  {place.tags?.wheelchair === 'yes' && <Chip label="Доступність" size="small" sx={{ mr: 0.5 }} />}
                  {place.tags?.toilets_wheelchair === 'yes' && <Chip label="Туалет" size="small" sx={{ mr: 0.5 }} />}
                  {place.tags?.tactile_paving === 'yes' && <Chip label="Тактильні" size="small" sx={{ mr: 0.5 }} />}
                  {place.tags?.tourism === 'hotel' && <Chip label="Готель" size="small" sx={{ mr: 0.5 }} />}
                  {(place.tags?.amenity === 'restaurant' || place.tags?.amenity === 'cafe' || place.tags?.amenity === 'fast_food') && 
                    <Chip label="Їжа" size="small" sx={{ mr: 0.5 }} />}
                  {place.tags?.amenity === 'bank' && <Chip label="Банк" size="small" sx={{ mr: 0.5 }} />}
                  {place.tags?.office === 'diplomatic' && <Chip label="Посольство" size="small" sx={{ mr: 0.5 }} />}
                  {place.tags?.tourism === 'hostel' && <Chip label="Хостел" size="small" />}
                  {place.tags?.amenity === 'pharmacy' && <Chip label="Аптека" size="small" />}
                </Typography>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </Box>
  );
};

export default Map;