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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Неправильний email або пароль');
    }
  };

  return (
    <Container component="main" maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        pt: 8,
      }}
    >
      <Paper elevation={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',
          backgroundColor: 'var(--main-bg-color)',
          color: 'var(--white-text-color)',
          borderRadius: 4,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)'
        }}
      >
        <Avatar sx={{  m: 2, bgcolor: 'var(--primary-color)', width: 64, height: 64}}>
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
        
        <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 'bold', fontFamily: '"Playfair Display", serif', color: 'primary.contrastText'}}>
          Вхід до системи
        </Typography>

        <Box component="form"  noValidate  onSubmit={handleSubmit} sx={{  width: '100%', mt: 2}}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email адреса"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
              },
              '& .MuiInputBase-input': { color: '#ffffff' }
            }}
          />
          
          {error && (
            <Typography  color="error"  align="center" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', py: 1, borderRadius: 1}}>
              {error}
            </Typography>
          )}
          
          <Button type="submit" fullWidth variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              fontSize: '1rem',
              borderRadius: 2,
              fontWeight: 'bold',
              backgroundColor: 'var(--primary-color)'
            }}
          >
            Увійти
          </Button>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Link 
              href="/register" 
              variant="body2"
              sx={{
                color: 'var(--primary-color)',
                '&:hover': { color: 'var(--white-hover-text-color)' }
              }}
            >
              Немає акаунту? Зареєструватись
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;