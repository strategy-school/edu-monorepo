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
import { Facebook, Instagram } from '@mui/icons-material';

export const Footer: FC = (): ReactElement => {
  const socialLinks = {
    facebook: 'https://www.facebook.com/strategia.trainings',
    instagram: 'https://www.instagram.com/strategiaschool/',
  };

  return (
    <footer className="footer">
      <Box
        sx={{
          width: '100%',
          height: 'auto',
          backgroundColor: 'black',
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
                  Strategia School
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
                    <Typography>Список курсов</Typography>
                  </Link>
                </ListItem>
                <ListItem sx={{ m: 0, p: 0, pb: 1 }}>
                  <Link href="/teachers">
                    <Typography>Наши преподаватели</Typography>
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item>
              <List>
                <ListItem style={{ display: 'inline' }}>
                  {' '}
                  <Link href={socialLinks.facebook}>
                    <Facebook />
                  </Link>{' '}
                </ListItem>
                <ListItem style={{ display: 'inline' }}>
                  <Link href={socialLinks.instagram}>
                    <Instagram />
                  </Link>
                </ListItem>
              </List>
              <Typography
                component="p"
                style={{ position: 'relative', paddingBottom: '5px' }}
              >
                <Typography
                  component="span"
                  style={{ position: 'absolute', top: '2px' }}
                  color="primary.light"
                >
                  <PhonelinkRingIcon />
                </Typography>
                <Typography component="span" sx={{ pl: 4 }}>
                  +996(709) 677 777
                </Typography>
              </Typography>
              <Typography
                component="p"
                style={{ position: 'relative', paddingBottom: '5px' }}
              >
                <Typography
                  component="span"
                  style={{ position: 'absolute', top: '2px' }}
                  color="primary.light"
                >
                  <EmailIcon />
                </Typography>
                <Typography component="span" sx={{ pl: 4 }}>
                  strategia.kg@gmail.com
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
