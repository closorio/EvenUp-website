import { Box, styled} from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: 'Nunito, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#77EBEB',
      light: '#FFFFFF',
      dark: '#060606',
    },
    secondary: {
      main: '#9A40E0',
      light: '#F5EBFF',
      dark: '#0F3E3C',
    },
    background: {
      default: '#060606',
    },
  },
});

export const Root = styled(Box)({
  minHeight: '100vh',
  minWidth: '100vw',
  // backgroundImage: 'url("src/assets/imagen.jpg")', //Aquí iria la imagen de fondo q no se cual es
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
});

export const Footer = styled('footer')({
  backgroundColor: 'whitesmoke',
  color: 'black',
  padding: 2,
  textAlign: 'center',
  marginTop: 4,
});
