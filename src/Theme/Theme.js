import { createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#fff'
      },
      secondary: {
        main: '#d3d3d3',
      }
    },
    typography: {
      fontSize: 16
    }
  });

export default theme;