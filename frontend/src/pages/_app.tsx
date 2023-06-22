import { addInterceptors } from '@/src/axiosApi';
import { initializeConveyThis } from '@/src/conveyThis';
import { ThemeProvider } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app';
import { parseCookies } from 'nookies';
import React from 'react';
import { Provider } from 'react-redux';
import { GOOGLE_CLIENT_ID } from '../constants';
import { getMe } from '../dispatchers/users/usersThunks';
import { wrapper } from '../store/store';
import '../stylesGlobal.css';
import theme from '../theme';
import { NextApiRequest } from 'next';

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

App.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ ctx, Component }) => {
      const req = ctx.req as NextApiRequest;
      const cookies =
        req &&
        req.headers.cookie?.split('; ').map((cookie) => cookie.split('='));

      if (cookies) {
        const strategiaToken = cookies.find(
          ([key]) => key === 'strategiaToken',
        );
        console.log(strategiaToken && strategiaToken[1]);
        strategiaToken && (await store.dispatch(getMe(strategiaToken[1])));
      }

      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps({ ...ctx, store })
          : {},
      };
    },
);

export default App;
