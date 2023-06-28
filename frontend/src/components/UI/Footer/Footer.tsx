import React, { FC, ReactElement } from 'react';
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import logoTransparent from '@/src/assets/images/strategia-logo-transparent.png';
import PhonelinkRingIcon from '@mui/icons-material/PhonelinkRing';
import EmailIcon from '@mui/icons-material/Email';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, WhatsApp, YouTube } from '@mui/icons-material';
import { SOCIAL_LINKS } from '@/src/constants';

export const Footer: FC = (): ReactElement => {
  return (
    <footer className="footer">
      <Box
        sx={{
          width: '100%',
          height: 'auto',
          backgroundColor: 'primary.main',
          paddingTop: '1rem',
          paddingBottom: '1rem',
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            color="primary.light"
          >
            <Grid item justifyContent="space-between">
              <Typography variant="h5" component="div">
                <Link
                  href="/"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    textTransform: 'uppercase',
                    color: '#fff',
                  }}
                >
                  <Typography
                    component="span"
                    style={{
                      textTransform: 'uppercase',
                      color: '#fff',
                      fontWeight: 600,
                    }}
                    className="conveythis-no-translate"
                  >
                    Школа Маркетинга Strategia
                  </Typography>
                  <Box
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: '10px',
                      background: 'transparent',
                    }}
                  >
                    <Image
                      src={logoTransparent}
                      alt="Strategia logo"
                      width={25}
                      height={25}
                      style={{ margin: '3px 0 0 2px' }}
                    />
                  </Box>
                </Link>
              </Typography>
              <Typography color="primary.light" variant="subtitle1">
                {`© Все права защищены, ${new Date().getFullYear()}`}
              </Typography>
            </Grid>

            <Grid item>
              <List>
                <ListItem sx={{ m: 0, p: 0, pb: 1 }}>
                  <Link href="/courses">
                    <Typography>Курсы</Typography>
                  </Link>
                </ListItem>
                <ListItem sx={{ m: 0, p: 0, pb: 1 }}>
                  <Link href="/teachers">
                    <Typography>Бизнес-тренеры</Typography>
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item>
              <List>
                <ListItem style={{ display: 'inline', paddingLeft: 0 }}>
                  <Link
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook />
                  </Link>
                </ListItem>
                <ListItem style={{ display: 'inline' }}>
                  <Link
                    href={SOCIAL_LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsApp />
                  </Link>
                </ListItem>
                <ListItem style={{ display: 'inline' }}>
                  <Link
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram />
                  </Link>
                </ListItem>
                <ListItem style={{ display: 'inline' }}>
                  <Link
                    href={SOCIAL_LINKS.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <YouTube />
                  </Link>
                </ListItem>
              </List>
              <Typography
                component="p"
                style={{ position: 'relative', paddingBottom: '5px' }}
              >
                <Typography
                  component="span"
                  style={{ position: 'absolute', top: '0px' }}
                  color="primary.light"
                >
                  <EmailIcon />
                </Typography>
                <Typography component="span" sx={{ pl: 4 }}>
                  {SOCIAL_LINKS.email}
                </Typography>
              </Typography>
              <Typography
                component="p"
                style={{ position: 'relative', paddingBottom: '5px' }}
              >
                <Typography
                  component="span"
                  style={{ position: 'absolute', top: '0px' }}
                  color="primary.light"
                >
                  <PhonelinkRingIcon />
                </Typography>
                <Typography component="span" sx={{ pl: 4 }}>
                  <Link type="phone" href={`tel:${SOCIAL_LINKS.phoneLink}`}>
                    {SOCIAL_LINKS.phoneText}
                  </Link>
                </Typography>
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="p">
                Internet Marketing Strategies LLC
              </Typography>
              <Typography component="p">
                Strategia Marketing School 2023
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
