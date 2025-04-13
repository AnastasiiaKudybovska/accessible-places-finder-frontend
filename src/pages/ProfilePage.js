import { Container, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return <Typography>Будь ласка, увійдіть в систему</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>Профіль</Typography>
        <Typography variant="body1">Ім'я: {user.name}</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
        <Button 
          variant="contained" 
          color="error" 
          onClick={handleLogout}
          sx={{ mt: 2 }}
        >
          Вийти
        </Button>
      </Box>
    </Container>
  );
};

export default ProfilePage;