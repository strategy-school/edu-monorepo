import { createTheme, Theme } from '@mui/material/styles';

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#58595b',
      light: '#fff',
    },
    secondary: {
      main: 'rgb(217, 39, 45)',
      dark: 'rgb(180, 40, 45)',
      light: 'rgb(217, 82, 91)',
    },
    info: {
      main: '#2a8d57',
      dark: '#004c97',
    },
    warning: {
      main: '#ffaa18',
    },
  },
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
  },
});

export default theme;
