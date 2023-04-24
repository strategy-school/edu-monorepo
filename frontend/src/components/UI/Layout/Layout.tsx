import React from 'react';
import Head from 'next/head';
import AppToolbar from '@/src/components/UI/AppToolbar/AppToolbar';
import { Container } from '@mui/material';
import Footer from '@/src/components/UI/Footer/Footer';

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
      <div
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <AppToolbar />
        <Container sx={{ padding: '50px 25px' }}>{children}</Container>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
