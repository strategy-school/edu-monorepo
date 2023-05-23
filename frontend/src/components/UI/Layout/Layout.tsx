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
  const header = React.useRef<HTMLDivElement>(null);
  const footer = React.useRef<HTMLDivElement>(null);
  const [extraHeight, setExtraHeight] = React.useState(0);

  React.useEffect(() => {
    const headerHeight = header.current ? header.current.offsetHeight : 0;
    const footerHeight = footer.current ? footer.current.offsetHeight : 0;

    setExtraHeight(headerHeight + footerHeight);
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div ref={header}>
        <AppToolbar />
      </div>
      <Container
        style={{
          display: 'flex',
          minHeight: `calc(100vh - ${extraHeight}px)`,
          padding: '50px 25px',
          flexDirection: 'column',
        }}
      >
        {children}
      </Container>
      <div ref={footer}>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
