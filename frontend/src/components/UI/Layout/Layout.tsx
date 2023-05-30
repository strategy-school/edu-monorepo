import React from 'react';
import Head from 'next/head';
import AppToolbar from '@/src/components/UI/AppToolbar/AppToolbar';
import { Container } from '@mui/material';
import Footer from '@/src/components/UI/Footer/Footer';

interface Props {
  title: string;
  description?: string;
  keywords?: string;
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({
  title,
  description,
  keywords,
  children,
}) => {
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
        <meta
          name="description"
          content={
            description ||
            'Школа Маркетинга Strategia – это новое учебное подразделение консалтинговой компании Strategia. Мы стремится к формированию нового поколения бизнес-профессионалов Кыргызстана. Наша цель - обучить практиков, дать необходимые навыки для достижения максимальной эффективности в своей деятельности по следующим направлениям: маркетинг, digital, продажи, телемаркетинг и японская концепция управления бизнесом “Кайдзен”. '
          }
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={keywords || 'Маркетинг, продажи, школа маркетинга'}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
