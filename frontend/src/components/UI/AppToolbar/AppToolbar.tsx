import { useAppSelector } from '@/src/app/hooks';
import logo from '@/src/assets/images/strategia-logo.png';
import { selectUser } from '@/src/dispatchers/users/usersSlice';
import { AppBar, Box, Button, Grid, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import AnonymousMenu from './AnonymousMenu';
import UserMenu from './UserMenu';
import React from 'react';

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{ bgolor: 'secondary.light' }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12} md={3}>
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
                </Box>
              </Link>
            </Typography>
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="flex-end"
            xs={12}
            md={9}
          >
            <Button component={Link} href="/about" color="inherit">
              О школе
            </Button>
            {user?.role === 'admin' ? (
              <Button component={Link} href="/categories" color="inherit">
                Категории курсов
              </Button>
            ) : (
              <Typography component="div"></Typography>
            )}
            <Button component={Link} href="/courses" color="inherit">
              Список курсов
            </Button>
            <Button component={Link} href="/groups" color="inherit">
              Учебные группы
            </Button>
            <Button component={Link} href="/teachers" color="inherit">
              Наши преподаватели
            </Button>
            <Button component={Link} href="/tests" color="inherit">
              Пройти тестирование
            </Button>
            <div
              style={{
                display: 'inline-flex',
                width: '2px',
                height: '20px',
                background: '#fff',
                borderRadius: '10px',
              }}
            />
            {user ? <UserMenu user={user} /> : <AnonymousMenu />}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
