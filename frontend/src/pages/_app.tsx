import React from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { persistor, store } from '../app/store';
import { ThemeProvider } from '@mui/material';
import theme from '../theme';
import { PersistGate } from 'redux-persist/integration/react';
import { addInterceptors } from '@/src/axiosApi';

addInterceptors(store);
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
