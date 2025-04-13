import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import chipIcons from '../../config/chipIcons';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import PlacePopup from '../PlacePopUp/PlacePopUp';

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

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        console.log(`Clicked at coordinates: x: ${lng.toFixed(6)}, y: ${lat.toFixed(6)}`);
      },
    });
    return null;
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
    if (!place.tags) return chipIcons.wheelchair;
    
    if (place.tags.toilets_wheelchair === 'yes') return chipIcons.toilet;
    if (place.tags.tactile_paving === 'yes') return chipIcons.tactile;
    if (place.tags.tourism === 'hotel') return chipIcons.hotel;
    if (place.tags.amenity === 'restaurant' || place.tags.amenity === 'cafe' || place.tags.amenity === 'fast_food') {
      return chipIcons.restaurant;
    }
    if (place.tags.amenity === 'bank') return chipIcons.bank;
    if (place.tags.office === 'diplomatic') return chipIcons.embassy;
    if (place.tags.tourism === 'hostel') return chipIcons.hostel;
    if (place.tags.amenity === 'pharmacy') return chipIcons.pharmacy;
    return chipIcons.wheelchair;
  };

  const handleAddComment = (placeId, comment) => {
    console.log(`Adding comment to place ${placeId}:`, comment);
    // Implement your API call here
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
        
        <MapClickHandler />
        
        {places.map((place) => {
          if (!place.lat || !place.lon) return null;
          
          const icon = getIconForPlace(place);
          
          return (
            <Marker 
              key={place.id} 
              position={[place.lat, place.lon]} 
              icon={icon}
            >
              <Popup>
                <PlacePopup 
                  place={place} 
                  onAddComment={handleAddComment} 
                />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </Box>
  );
};

export default Map;