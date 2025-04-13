import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline } from 'react-leaflet';
import chipIcons from '../../config/chipIcons';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import PlacePopup from '../PlacePopUp/PlacePopUp';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;


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
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [route, setRoute] = useState([]);
  const [accessible, setAccessible] = useState(false);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [noRouteFound, setNoRouteFound] = useState(false);



  const MapClickHandler = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        console.log(`Left click at: ${lat}, ${lng}`);
        setStart({ lat: lat, lon: lng });
      },
      contextmenu(e) {
        const { lat, lng } = e.latlng;
        console.log(`Right click at: ${lat}, ${lng}`);
        setEnd({ lat: lat, lon: lng });
      }
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

  useEffect(() => {
    fixLeafletIcons();
  
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 100);
    }
  
    const fetchRoute = async () => {
      if (!start || !end) return;
      setLoadingRoute(true);
      setNoRouteFound(false);
      try {
        console.log('Requesting route from backend...');
        const response = await axios.post(`${backendUrl}/api/objects/find_path`, {
          start,
          end,
          accessible,
        });
  
        if (response.data?.route) {
          console.log("Route found!")
          setRoute(response.data.route);
        } else {
          setRoute([]);
          setNoRouteFound(true);  // 👈 trigger the "no route" message
        }
      } catch (error) {
        console.error('Error fetching route:', error);
      }
      finally {
        setLoadingRoute(false);
      }
      setLoadingRoute(false);

    };
  
    fetchRoute();
  },  [start, end, accessible]);

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
      <Box sx={{ p: 1 }}>
      <label>
        <input 
          type="checkbox" 
          checked={accessible} 
          onChange={(e) => setAccessible(e.target.checked)} 
        />
        Accessible route
      </label>
    </Box>
    {loadingRoute && (
  <Box
    sx={{
      position: 'absolute',
      top: 60,
      right: 10,
      zIndex: 1000,
      bgcolor: 'white',
      p: 1,
      borderRadius: 1,
      boxShadow: 2,
      fontSize: '0.9rem',
    }}
  >
    шукаємо шлях...
  </Box>
)}

{noRouteFound && (
  <Box
    sx={{
      position: 'absolute',
      top: 100,
      right: 10,
      zIndex: 1000,
      bgcolor: '#ffe6e6',
      p: 1,
      borderRadius: 1,
      boxShadow: 2,
      fontSize: '0.9rem',
      color: '#990000',
    }}
  >
    нам шкода, шлях не знайдено 😢
  </Box>
)}
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

        {/* Markers for start/end (optional visual aid) */}
        {start && <Marker position={[start.lat, start.lon]} />}
        {end && <Marker position={[end.lat, end.lon]} />}

        {/* Polyline for route */}
        {route.length > 0 && (
          <Polyline 
            positions={route.map(([lat, lon]) => [lat, lon])} 
            pathOptions={{ color: 'blue', weight: 5 }}
          />
        )}

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