import { Box } from '@mui/material';
import LoginForm from '../components/LoginForm/LoginForm';

const LoginPage = () => {
  return (
    <Box sx={{ 
      width: '100%',
      minHeight: '100vh',
      backgroundColor: 'var(--grey-bg-color)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      p: 2
    }}>
      <LoginForm />
    </Box>
  );
};

export default LoginPage;