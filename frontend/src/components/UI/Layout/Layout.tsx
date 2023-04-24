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
      <AppToolbar />
      <Container sx={{ padding: '50px 25px' }}>{children}</Container>
      {/*<Footer />*/}
    </>
  );
};

export default Layout;
