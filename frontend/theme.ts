import { createTheme, Theme } from '@mui/material/styles';

interface MyPaletteOptions {
  custom: {
    main: string;
  };
}

declare module '@mui/material/styles' {
  interface PaletteOptions {
    custom?: {
      main?: string;
    };
  }
}

const myPalette: MyPaletteOptions = {
  custom: {
    main: 'rgb(180, 40, 45)',
  },
};

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(88, 89, 91)',
    },
    secondary: {
      main: 'rgb(217, 39, 45)',
    },
    custom: myPalette.custom,
  },
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  });


export default theme;

