import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Paper, 
  Avatar,
  Container,
  Link
} from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Паролі не співпадають');
      return;
    }
    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      navigate('/');
    } catch (err) {
      console.log(err);
      setError('Помилка реєстрації. Можливо, email вже використовується.');
    }
  };

  return (
    <Container component="main" maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        pt: 10,
      }}
    >
      <Paper elevation={6} sx={{ 
        p: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        backgroundColor: 'var(--main-bg-color)',
        color: 'var(--white-text-color)',
        borderRadius: 4,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)'
      }}>
        <Avatar sx={{ 
          m: 2, 
          bgcolor: 'var(--primary-color)', 
          width: 64, 
          height: 64
        }}>
          <HowToRegIcon fontSize="large" />
        </Avatar>
        
        <Typography 
          component="h1" 
          variant="h4" 
          sx={{ 
            mb: 1, 
            fontWeight: 'bold', 
            fontFamily: '"Playfair Display", serif', 
            color: 'primary.contrastText'
          }}
        >
          Реєстрація
        </Typography>

        <Box 
          component="form" 
          noValidate 
          onSubmit={handleSubmit} 
          sx={{ 
            width: '100%', 
            mt: 2 
          }}
        >
          {error && (
            <Typography 
              color="error" 
              align="center" 
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                py: 1, 
                borderRadius: 1,
                mb: 2
              }}
            >
              {error}
            </Typography>
          )}
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Ім'я"
            name="username"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            sx={{
              '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
              },
              '& .MuiInputBase-input': { color: '#ffffff' }
            }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email адреса"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            sx={{
              '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
              },
              '& .MuiInputBase-input': { color: '#ffffff' }
            }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            sx={{
              '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
              },
              '& .MuiInputBase-input': { color: '#ffffff' }
            }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Підтвердіть пароль"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            sx={{
              '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
              },
              '& .MuiInputBase-input': { color: '#ffffff' }
            }}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              fontSize: '1rem',
              borderRadius: 2,
              fontWeight: 'bold',
              backgroundColor: 'var(--primary-color)',
              '&:hover': {
                backgroundColor: 'var(--button-hover-color)',
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)'
              },
            }}
          >
            Зареєструватися
          </Button>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 2 
          }}>
            <Link 
              href="/login" 
              variant="body2"
              sx={{
                color: 'var(--primary-color)',
                '&:hover': { color: 'var(--white-hover-text-color)' }
              }}
            >
              Вже є акаунт? Увійти
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterForm;