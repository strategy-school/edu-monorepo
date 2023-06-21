import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import logo from '@/src/assets/images/strategia-logo.png';
import { selectUser } from '@/src/dispatchers/users/usersSlice';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  Toolbar,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import AnonymousMenu from './AnonymousMenu';
import UserMenu from './UserMenu';
import React, { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '@/src/dispatchers/users/usersThunks';
import ChangeLanguage from '@/src/components/UI/ChangeLanguage/ChangeLanguage';
import { selectUnchecked } from '@/src/dispatchers/notifications/notificationsSlice';
import { fetchUncheckedCount } from '@/src/dispatchers/notifications/notificationsThunks';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { name: 'Курсы', href: '/courses' },
  { name: 'Бизнес-тренеры', href: '/teachers' },
  { name: 'Учебные группы', href: '/groups' },
];

const AppToolbar: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const uncheckedCount = useAppSelector(selectUnchecked);
  const { window } = props;
  const [open, setOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      const interval = setInterval(() => {
        void dispatch(fetchUncheckedCount());
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [dispatch, user, user?.role]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Меню
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <Button component={Link} href="/about" color="inherit">
            О школе
          </Button>
        </ListItem>
        {navItems.map((item) => (
          <ListItem key={item.name}>
            <Button component={Link} href={item.href} color="inherit">
              {item.name}
            </Button>
          </ListItem>
        ))}
        <ListItem>
          <Button component={Link} href="/tests" color="inherit">
            Онлайн-тест
          </Button>
        </ListItem>
        <ListItem>{user ? null : <AnonymousMenu />}</ListItem>
        <Divider />
        <ListItem sx={{ textAlign: 'center' }}>
          {user?.role === 'admin' ? (
            <Button component={Link} href="/categories" color="inherit">
              Категории курсов
            </Button>
          ) : null}
        </ListItem>
        {user && user.role === 'admin' ? (
          <ListItem>
            <Button component={Link} href="/admin/courses" color="inherit">
              Админ панель
            </Button>
          </ListItem>
        ) : null}
        {user ? (
          <Box>
            <ListItem>
              <Button component={Link} href="/profile" color="inherit">
                Личный кабинет
              </Button>
            </ListItem>
            <ListItem>
              <Button onClick={handleLogout} color="inherit">
                Выйти
              </Button>
            </ListItem>
          </Box>
        ) : null}
      </List>
    </Box>
  );

  const containerDiv =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <AppBar position="fixed" sx={{ bgcolor: 'info.dark' }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={4} sm={7} md={6}>
            <Typography component="div">
              <Link
                href="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography
                  component="span"
                  style={{
                    textTransform: 'uppercase',
                    color: '#fff',
                    fontWeight: 600,
                  }}
                  display={{ xs: 'none', sm: 'inline' }}
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
            xs={8}
            sm={5}
            md={6}
          >
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Button component={Link} href="/courses" color="inherit">
                Курсы
              </Button>
            </Box>
            <Box
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              style={{
                width: '2px',
                height: '20px',
                background: '#fff',
                borderRadius: '10px',
              }}
            />
            {user ? (
              <UserMenu user={user} uncheckedCount={uncheckedCount} />
            ) : null}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Box>
              <ChangeLanguage />
            </Box>
          </Grid>
        </Grid>
        <Box component="nav">
          <Drawer
            disableScrollLock={true}
            container={containerDiv}
            variant="temporary"
            anchor="right"
            open={open}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
