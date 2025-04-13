import { useState, useEffect } from 'react';
import { Typography, Button, Stack } from '@mui/material';
import './HomeIntro.css';

const HomeIntro = () => {
  const [currentBg, setCurrentBg] = useState(0);

  const backgrounds = [
    'url(https://grandms.pro/wp-content/uploads/2024/09/%D0%BB%D1%96%D1%84%D1%82%D1%8F-%D0%B4%D0%BB%D1%8F-%D0%BB%D1%8E%D0%B4%D0%B5%D0%B9-%D0%B7-%D1%96%D0%BD%D0%BA%D0%BB%D1%8E%D0%B7%D0%B8%D0%B2%D0%BD%D1%96%D1%81%D1%82%D1%8E.png)',
    'url(https://mapmetrics.org/wp-content/uploads/2024/11/DALL%C2%B7E-2024-11-28-14.19.08-A-clean-and-realistic-outdoor-scene-showing-an-urban-setting-designed-for-accessibility-focusing-on-navigation-apps-for-people-with-disabilities.-The.webp)',
    'url(https://accessibilitypartners.ca/wp-content/uploads/2024/06/DALL%C2%B7E-2024-06-14-18.19-1.png)'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToMap = () => {
    const mapElement = document.getElementById('map-section');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="intro-container">
      <div 
        className="intro-background"
        style={{ backgroundImage: backgrounds[currentBg] }}
      />
      <div className="intro-overlay" />
      <div className="intro-content">
        <Typography variant="h2" component="h1" gutterBottom className='h2-header'>
          Знаходь доступні місця
        </Typography>
        <Typography variant="h5" component="p" className='h5-content'>
          Пошук місць з пандусами, тактильним покриттям, адаптованими туалетами та іншими зручностями
        </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={scrollToMap}
            className="custom-button"
            sx={{
              px: 6,
              py: 1.5,
              fontSize: '1.2rem',
              fontWeight: 'bold',
              fontFamily: '"Montserrat", sans-serif'
            }}
          >
            Пошук на карті
          </Button>
      </div>
    </div>
  );
};

export default HomeIntro;