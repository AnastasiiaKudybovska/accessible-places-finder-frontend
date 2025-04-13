import { Box } from '@mui/material';
import RegisterForm from '../components/RegisterForm/RegisterForm';

const RegisterPage = () => {
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
      <RegisterForm />
    </Box>
  );
};

export default RegisterPage;