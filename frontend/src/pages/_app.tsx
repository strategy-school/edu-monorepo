import React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { ThemeProvider } from '@mui/material';
import theme from '../../theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
