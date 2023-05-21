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
  ListItemButton,
  Toolbar,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import AnonymousMenu from './AnonymousMenu';
import UserMenu from './UserMenu';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '@/src/dispatchers/users/usersThunks';
import ChangeLanguage from '@/src/components/UI/ChangeLanguage/ChangeLanguage';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { name: 'Список курсов', href: '/courses' },
  { name: 'Учебные группы', href: '/groups' },
  { name: 'Наши преподаватели', href: '/teachers' },
];

const AppToolbar: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { window } = props;
  const [open, setOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Strategia School
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Button component={Link} href={item.href} color="inherit">
                {item.name}
              </Button>
            </ListItemButton>
          </ListItem>
        ))}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <ListItem>
            <Button component={Link} href="/tests" color="inherit">
              Пройти тестирование
            </Button>
          </ListItem>
        </Box>
        <ListItem>
          <Button component={Link} href="/about" color="inherit">
            О школе
          </Button>
        </ListItem>
        <ListItem sx={{ textAlign: 'center' }}>
          {user?.role === 'admin' ? (
            <Button component={Link} href="/categories" color="inherit">
              Категории курсов
            </Button>
          ) : null}
        </ListItem>
        <ListItem>{user ? null : <AnonymousMenu />}</ListItem>
        <Divider />
        {user && user.role === 'admin' ? (
          <ListItem>
            <Button component={Link} href="/admin/categories" color="inherit">
              Админ панель
            </Button>
          </ListItem>
        ) : null}
        {user ? (
          <Box>
            <ListItem>
              <Button component={Link} href="/profile" color="inherit">
                Мой профиль
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
    <AppBar position="sticky" sx={{ bgolor: 'secondary.light' }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={3} sm={5} md={3}>
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
                  Strategia School
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
            xs={9}
            sm={7}
            md={9}
          >
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Button component={Link} href="/courses" color="inherit">
                Список курсов
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
            {user ? <UserMenu user={user} /> : null}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: 2 }}
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
