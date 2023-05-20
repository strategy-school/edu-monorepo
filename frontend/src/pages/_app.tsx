import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { persistor, store } from '../app/store';
import { ThemeProvider } from '@mui/material';
import theme from '../theme';
import { PersistGate } from 'redux-persist/integration/react';
import { addInterceptors } from '@/src/axiosApi';
import '../stylesGlobal.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from '../constants';
import { initializeConveyThis } from '@/src/conveyThis';

addInterceptors(store);
export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initializeConveyThis();
  }, []);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  );
}
