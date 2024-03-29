import { addInterceptors } from '@/src/axiosApi';
import { initializeConveyThis } from '@/src/conveyThis';
import { ThemeProvider } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { GOOGLE_CLIENT_ID } from '../constants';
import { wrapper } from '../store/store';
import '../stylesGlobal.css';
import theme from '../theme';

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  addInterceptors(store);

  React.useEffect(() => {
    initializeConveyThis();
  }, []);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...props.pageProps} />
        </ThemeProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default App;
