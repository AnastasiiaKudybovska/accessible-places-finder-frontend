import L from 'leaflet';

const chipIcons = {
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
export default chipIcons;