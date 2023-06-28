import React from 'react';
import Head from 'next/head';
import AppToolbar from '@/src/components/UI/AppToolbar/AppToolbar';
import { Container, Hidden } from '@mui/material';
import Footer from '@/src/components/UI/Footer/Footer';
import Image from 'next/image';
import whatsappIcon from '@/src/assets/images/whatsapp.png';
import { SOCIAL_LINKS } from '@/src/constants';

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
          content={`Курсы по маркетингу для начинающих, Курсы по маркетингу в социальных сетях Instagram, Курсы по SMM, Курсы по интернет- маркетингу, Курсы по цифровому маркетингу, Курсы по маркетингу для опытных менеджеров, Курсы по маркетингу для владельцев бизнеса, Курсы по Интернет- маркетингу для оффлайн маркетологов, ${keywords}`}
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
          padding: '75px 25px 50px',
          flexDirection: 'column',
        }}
      >
        {children}
        <Hidden mdUp>
          <a
            style={{
              position: 'fixed',
              right: '20px',
              bottom: '20px',
              zIndex: '9999',
            }}
            href={SOCIAL_LINKS.whatsapp}
          >
            <Image src={whatsappIcon} alt="User icon" width={50} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <style jsx>{`
              a:hover {
                transform: scale(1.2);
                transition: transform 0.2s ease-in-out;
              }
            `}</style>
          </a>
        </Hidden>
      </Container>
      <div ref={footer}>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
