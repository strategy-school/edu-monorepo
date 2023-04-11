import React from 'react';
import Head from 'next/head';
import AppToolbar from '@/src/components/UI/AppToolbar/AppToolbar';
import { Container } from '@mui/material';

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
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
