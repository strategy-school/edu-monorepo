import { useAppSelector } from '@/src/app/hooks';
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
  const user = useAppSelector(selectUser);
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
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
            <Button component={Link} href="/about" color="inherit">
              О компании
            </Button>
          </ListItem>
          <ListItem>
            <Button component={Link} href="/tests" color="inherit">
              Пройти тестирование
            </Button>
          </ListItem>
        </Box>
        <ListItem sx={{ textAlign: 'center' }}>
          {user?.role === 'admin' ? (
            <Button component={Link} href="/categories" color="inherit">
              Категории курсов
            </Button>
          ) : null}
        </ListItem>
        <ListItem>{user ? null : <AnonymousMenu />}</ListItem>
      </List>
    </Box>
  );

  const containerDiv =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'secondary.light' }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={6} sm={12} md={3}>
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
            xs={6}
            sm={12}
            md={9}
          >
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button component={Link} href="/about" color="inherit">
                О компании
              </Button>
              <Button component={Link} href="/tests" color="inherit">
                Пройти тестирование
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
