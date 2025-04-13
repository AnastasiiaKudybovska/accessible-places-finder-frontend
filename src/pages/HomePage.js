import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Typography, Container, Paper, Grid, IconButton, Collapse, Button } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import Filters from '../components/Filters/Filters';
import PlacesList from '../components/PlacesList/PlacesList';
import Map from '../components/Map/Map';
import HomeIntro from '../components/HomeIntro/HomeIntro';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const HomePage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    wheelchair: true,
    toilets: true,
    tactile: true,
    hotels: true,
    restaurants: true,
    banks: true,
    embassies: true,
    hostels: true,
    pharmacy: true,
  });
  const [mapCenter] = useState([49.839, 24.015]); // Центр Lviv
  const [showFilters, setShowFilters] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Фільтрація місць за обраними критеріями
  const filteredPlaces = places.filter(place => {
    if (filters.wheelchair && place.tags?.wheelchair === 'yes') return true;
    if (filters.toilets && place.tags?.toilets_wheelchair === 'yes') return true;
    if (filters.tactile && place.tags?.tactile_paving === 'yes') return true;
    if (filters.hotels && place.tags?.tourism === 'hotel') return true;
    if (filters.restaurants && (
      place.tags?.amenity === 'restaurant' || 
      place.tags?.amenity === 'cafe' || 
      place.tags?.amenity === 'fast_food'
    )) return true;
    if (filters.banks && place.tags?.amenity === 'bank') return true;
    if (filters.embassies && place.tags?.office === 'diplomatic') return true;
    if (filters.hostels && place.tags?.tourism === 'hostel') return true;
    if (filters.pharmacy && place.tags?.amenity === 'pharmacy') return true;
    return false;
  });

  // Отримання даних з Overpass API
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/objects/nodes`);

        const data = response.data;
        setPlaces(data.nodes || []);
        console.log(data.nodes)
      } catch (error) {
        console.error('Помилка при отриманні даних:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const handleFilterChange = (filter) => {
    setFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
  	<Container maxWidth="xl" sx={{ 
      mt: 8, mb: 2, px: 0, pr: "0 !important", pl: "0 !important", mr: 0, ml: 0, width: '100%',  maxWidth: 'none !important', overflowX: 'hidden'
    }}
  >   
    <HomeIntro/>
      {/* Фільтри та карта */}
    <Paper elevation={3} sx={{ p: { xs: 2, md: 3 },  m: { xs: 2, md: 6 },position: 'relative' }} id="map-section">
        <Box sx={{ 
          textAlign: 'center', 
          mb: 4,
          px: { xs: 0, md: 2 }
        }}>
          <Typography variant="h3" component="h2"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              color: 'var(--primary-color)',
              mb: 2,
              letterSpacing: '0.5px',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
            }}
          >
            Інтерактивна карта доступності
          </Typography>
          <Typography variant="h6" color="var(--main-text-color)"
            sx={{
              fontFamily: '"Montserrat", sans-serif',
              maxWidth: 800,
              mx: 'auto',
              fontWeight: 400,
              fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' }
            }}
          >
            Використовуйте фільтри для пошуку необхідних місць та оберіть маркери на карті для детальної інформації
          </Typography>
        </Box>
        
        <Grid container spacing={3}  sx={{ display: { xs: 'block', md: 'flex' } }}>
          <Grid item xs={12} md={showFilters ?6 : 2} 
            sx={{ 
              position: 'relative',
              order: { xs: 1, md: 0 } 
            }}>
            <IconButton 
              onClick={toggleFilters}
              sx={{
                position: 'absolute',
                right: { xs: 0, md: -20 },
                top: 0,
                zIndex: 1000,
                backgroundColor: 'background.paper',
                boxShadow: 1,
                display: { xs: 'none', md: 'flex' }, 
                '&:hover': {
                  backgroundColor: 'background.paper',
                }
              }}
            >
              {showFilters ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            
            <Collapse 
              in={showFilters || isMobile} 
              orientation="horizontal"
              sx={{
                width: '100%',
                '& .MuiCollapse-wrapper': {
                  width: '100%',
                }
              }}
            >
              <Filters
                filters={filters} 
                onFilterChange={handleFilterChange} 
                placesCount={filteredPlaces.length} 
              />
            </Collapse>
          </Grid>
          
          <Grid item xs={12} md={showFilters ? 6 : 10} 
            sx={{ 
              order: { xs: 2, md: 0 },
              flexGrow: 1,
            }}>
            <Map
              center={mapCenter} 
              places={filteredPlaces} 
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Список місць */}
      {!loading && filteredPlaces.length > 0 && (
        <PlacesList places={filteredPlaces} />
      )}
    </Container>
  );
};

export default HomePage;