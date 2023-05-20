import React from 'react';
import Head from 'next/head';
import AppToolbar from '@/src/components/UI/AppToolbar/AppToolbar';
import { Container } from '@mui/material';
import Footer from '@/src/components/UI/Footer/Footer';

import ChangeLanguage from '@/src/components/UI/ChangeLanguage/ChangeLanguage';

interface Props {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <AppToolbar />
      <Container
        sx={{ padding: '50px 25px' }}
        style={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {children}
        <ChangeLanguage />
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
