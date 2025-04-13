import { Box, Typography, Link, Container } from '@mui/material';
import { Facebook, Instagram, Telegram, Email } from '@mui/icons-material';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <Box component="footer" sx={{backgroundColor: 'var(--main-bg-color)',  py: 3, mt: 'auto', color: 'white' , fontFamily: '"Montserrat", sans-serif' }}>
      <Container maxWidth="lg">
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: 16
        }}>
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              єДоступність
            </Typography>
            <Typography variant="body2">
              Проект від команди Nisomix
            </Typography>
            <Typography variant="caption" display="block">
              © {new Date().getFullYear()} Всі права захищені
            </Typography>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 1,
            textAlign: { xs: 'center', sm: 'left' }
          }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              Зв'яжіться з нами:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
              <Link href="https://facebook.com/bestlviv" target="_blank" rel="noopener">
                <Facebook sx={{ color: 'white', '&:hover': { color: 'var(--white-hover-text-color)' } }} />
              </Link>
              <Link href="https://instagram.com/bestlviv" target="_blank" rel="noopener">
                <Instagram sx={{ color: 'white', '&:hover': { color: 'var(--white-hover-text-color)' } }} />
              </Link>
              <Link href="https://t.me/bestlviv" target="_blank" rel="noopener">
                <Telegram sx={{ color: 'white', '&:hover': { color: 'var(--white-hover-text-color)' } }} />
              </Link>
              <Link href="mailto:info@bestlviv.com" target="_blank" rel="noopener">
                <Email sx={{ color: 'white', '&:hover': { color: 'var(--white-hover-text-color)' } }} />
              </Link>
              <Link href="https://github.com/maximka608/BEST_hackathon" target="_blank" rel="noopener noreferrer">
                <GitHubIcon sx={{ color: 'white', '&:hover': { color: 'var(--white-hover-text-color)' } }} />
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;