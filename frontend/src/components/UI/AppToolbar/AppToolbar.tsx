import React from 'react';
import { AppBar, Box, Grid, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';
import { useAppSelector } from '@/src/app/hooks';
import { selectUser } from '@/src/features/users/usersSlice';
import logo from '../../../assets/images/strategia-logo.png';
import Image from 'next/image';

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'main' }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
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
                  background: '#fff',
                }}
              >
                <Image
                  src={logo}
                  alt="Strategia logo"
                  width={25}
                  height={25}
                  style={{ margin: '3px 0 0 2px' }}
                />
                {/*<SchoolIcon fontSize="small" />*/}
              </Box>
            </Link>
          </Typography>
          <Grid item>
            {user ? <UserMenu user={user} /> : <AnonymousMenu />}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
