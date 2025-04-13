import { Box, Typography, Grid, Paper, Chip, Pagination, Stack } from '@mui/material';
import { useState, useRef } from 'react';

const PlacesList = ({ places }) => {
  const [page, setPage] = useState(1);
  const topRef = useRef(null);
  const itemsPerPage = 8;
  const pageCount = Math.ceil(places.length / itemsPerPage);
  
  const handlePageChange = (event, value) => {
    setPage(value);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const translatePlaceType = (type) => ({
    hotel: 'Готель',
    restaurant: 'Ресторан',
    cafe: 'Кафе',
    fast_food: 'Фастфуд',
    bank: 'Банк',
    diplomatic: 'Посольство',
    hostel: 'Хостел',
    post_office: 'Поштове відділення',
    toilets: "Адаптований туалет",
    pharmacy: "Аптека"
  })[type] || type;

  const getAddress = (place) => {
    const addressParts = [];
    
    // Спершу перевіряємо основні теги адреси
    if (place.tags?.['addr:street']) {
      addressParts.push(place.tags['addr:street']);
      if (place.tags?.['addr:housenumber']) {
        addressParts.push(place.tags['addr:housenumber']);
      }
    }
    
    if (addressParts.length === 0) {
      if (place.tags?.['address']) {
        addressParts.push(place.tags['address']);
      } else if (place.tags?.['addr:full']) {
        addressParts.push(place.tags['addr:full']);
      }
    }
    
    if (place.tags?.['addr:city'] && !addressParts.includes(place.tags['addr:city'])) {
      addressParts.push(place.tags['addr:city']);
    }

    if (addressParts.length < 0  && place.tags?.['website'] && !addressParts.includes(place.tags['website'])) {
      addressParts.push(place.tags['website']);
    }
    if (addressParts.length < 0  && place.tags?.['phone'] && !addressParts.includes(place.tags['phone'])) {
      addressParts.push(place.tags['phone']);
    }
    
    return addressParts.length > 0 
      ? addressParts.join(', ') 
      : 'Адреса не вказана';
  };

  const tagColors = {
    'Доступність': '#4CAF50',
    'Туалет': '#2196F3',
    'Тактильні': '#FF9800',
    'Готель': '#9C27B0',
    'Ресторан': '#F44336',
    'Кафе': '#795548',
    'Фастфуд': '#FF5722',
    'Банк': '#607D8B',
    'Посольство': '#3F51B5',
    'Хостел': '#009688',
    'Поштове відділення': '#673AB7',
    'Аптека': '#E91E63' 

  };

  const currentPlaces = places.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box sx={{ m: 6 }} ref={topRef}>
      <Typography variant="h4" gutterBottom sx={{ 
        mb: 4, 
        fontFamily: '"Playfair Display", serif', 
        fontWeight: 700, 
        color: 'var(--primary-color)'
      }}>
        Знайдені місця
      </Typography>
      
      <Grid container spacing={3}>
        {currentPlaces.map((place) => (
          <Grid item xs={12} sm={6} md={4} key={place.id}>
            <Paper elevation={3} sx={{ 
              p: 3, 
              height: '100%',
              borderRadius: 2,
              transition: 'transform 0.3s',
              '&:hover': { transform: 'translateY(-5px)', boxShadow: 4 }
            }}>
              <Typography variant="h6" gutterBottom sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 600 }}>
                {place.tags?.name || 'Місце без назви'}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: '"Montserrat", sans-serif', mb: 1 }}>
                <strong>Тип:</strong> {translatePlaceType(
                  place.tags?.amenity || place.tags?.tourism || place.tags?.office || 'Публічне місце'
                )}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: '"Montserrat", sans-serif', mb: 2 }}>
                <strong>Адреса:</strong> {getAddress(place)}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {place.tags?.wheelchair === 'yes' && <Chip label="Доступність" size="small" sx={{ bgcolor: tagColors['Доступність'], color: 'white' }} />}
                {place.tags?.toilets_wheelchair === 'yes' && <Chip label="Туалет" size="small" sx={{ bgcolor: tagColors['Туалет'], color: 'white' }} />}
                {place.tags?.tactile_paving === 'yes' && <Chip label="Тактильні" size="small" sx={{ bgcolor: tagColors['Тактильні'], color: 'white' }} />}
                {place.tags?.tourism === 'hotel' && <Chip label="Готель" size="small" sx={{ bgcolor: tagColors['Готель'], color: 'white' }} />}
                {(place.tags?.amenity === 'restaurant' || place.tags?.amenity === 'cafe' || place.tags?.amenity === 'fast_food') && (
                  <Chip label={translatePlaceType(place.tags?.amenity)} size="small" sx={{ bgcolor: tagColors[translatePlaceType(place.tags?.amenity)], color: 'white' }} />
                )}
                {place.tags?.amenity === 'bank' && <Chip label="Банк" size="small" sx={{ bgcolor: tagColors['Банк'], color: 'white' }} />}
                {place.tags?.office === 'diplomatic' && <Chip label="Посольство" size="small" sx={{ bgcolor: tagColors['Посольство'], color: 'white' }} />}
                {place.tags?.tourism === 'hostel' && <Chip label="Хостел" size="small" sx={{ bgcolor: tagColors['Хостел'], color: 'white' }} />}
                {place.tags?.amenity === 'post_office' && <Chip label="Поштове відділення" size="small" sx={{ bgcolor: tagColors['Поштове відділення'], color: 'white' }} />}
                {place.tags?.amenity === 'pharmacy' && <Chip label="Аптека" size="small" sx={{ bgcolor: tagColors['Аптека'], color: 'white' }} />}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {pageCount > 1 && (
        <Stack spacing={2} sx={{ mt: 4, alignItems: 'center', width: '100%' }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Stack>
      )}
    </Box>
  );
};

export default PlacesList;