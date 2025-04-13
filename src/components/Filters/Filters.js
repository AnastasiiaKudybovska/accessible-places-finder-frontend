import { Typography, FormControlLabel, Checkbox, Chip, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Кастомні стилізовані чекбокси
const PrimaryCheckbox = styled(Checkbox)(({ theme }) => ({
  color: 'var(--primary-color)',
  '&.Mui-checked': {
    color: 'var(--primary-color)',
  },
}));

const Filters = ({ filters, onFilterChange, placesCount }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      fontFamily: '"Montserrat", sans-serif' 
    }}>
      <Typography 
        variant="h6" 
        gutterBottom
        sx={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 700,
          color: 'var(--primary-color)'
        }}
      >
        Фільтри
      </Typography>
      
      <Typography 
        variant="subtitle2" 
        sx={{ 
          mt: 1, 
          mb: 1,
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600
        }}
      >
        Доступність:
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
        <FormControlLabel
          control={
            <PrimaryCheckbox
              checked={filters.wheelchair}
              onChange={() => onFilterChange('wheelchair')}
            />
          }
          label="Крісла колісні"
          sx={{ fontFamily: '"Montserrat", sans-serif' }}
        />
        
        <FormControlLabel
          control={
            <PrimaryCheckbox
              checked={filters.toilets}
              onChange={() => onFilterChange('toilets')}
            />
          }
          label="Адаптовані туалети"
          sx={{ fontFamily: '"Montserrat", sans-serif' }}
        />
        
        <FormControlLabel
          control={
            <PrimaryCheckbox
              checked={filters.tactile}
              onChange={() => onFilterChange('tactile')}
            />
          }
          label="Тактильне покриття"
          sx={{ fontFamily: '"Montserrat", sans-serif' }}
        />
      </Box>
      
      <Typography 
        variant="subtitle2" 
        sx={{ 
          mt: 2, 
          mb: 1,
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600
        }}
      >
        Типи місць:
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
        <FormControlLabel
          control={
            <PrimaryCheckbox
              checked={filters.hotels}
              onChange={() => onFilterChange('hotels')}
            />
          }
          label="Готелі"
          sx={{ fontFamily: '"Montserrat", sans-serif' }}
        />

        <FormControlLabel
          control={
            <PrimaryCheckbox
              checked={filters.restaurants}
              onChange={() => onFilterChange('restaurants')}
            />
          }
          label="Ресторани та кафе"
          sx={{ fontFamily: '"Montserrat", sans-serif' }}
        />

        <FormControlLabel
          control={
            <PrimaryCheckbox
              checked={filters.pharmacy}
              onChange={() => onFilterChange('pharmacy')}
            />
          }
          label="Аптеки"
          sx={{ fontFamily: '"Montserrat", sans-serif' }}
        />
        
        <FormControlLabel
          control={
            <PrimaryCheckbox
              checked={filters.banks}
              onChange={() => onFilterChange('banks')}
            />
          }
          label="Банки"
          sx={{ fontFamily: '"Montserrat", sans-serif' }}
        />
        
        <FormControlLabel
          control={
            <PrimaryCheckbox
              checked={filters.embassies}
              onChange={() => onFilterChange('embassies')}
            />
          }
          label="Посольства"
          sx={{ fontFamily: '"Montserrat", sans-serif' }}
        />
        
        <FormControlLabel
          control={
            <PrimaryCheckbox
              checked={filters.hostels}
              onChange={() => onFilterChange('hostels')}
            />
          }
          label="Хостели"
          sx={{ fontFamily: '"Montserrat", sans-serif' }}
        />

      </Box>
      
      <Typography 
        variant="subtitle2" 
        sx={{ 
          mt: 2,
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600
        }}
      >
        Знайдено: <span style={{ color: 'var(--primary-color)' }}>{placesCount}</span> місць
      </Typography>
    </Box>
  );
};

export default Filters;