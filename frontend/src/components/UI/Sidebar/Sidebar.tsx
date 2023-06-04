import React from 'react';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const openClickPage = (name: string) => {
    void router.push('/admin/' + name);
  };

  return (
    <>
      <Box sx={{ width: '240px' }}>
        <Divider />
        <List>
          <ListItem disablePadding selected={currentPath === '/admin/courses'}>
            <ListItemButton onClick={() => openClickPage('courses')}>
              <ListItemText primary="Курсы" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding selected={currentPath === '/admin/users'}>
            <ListItemButton onClick={() => openClickPage('users')}>
              <ListItemText primary="Пользователи" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding selected={currentPath === '/admin/teachers'}>
            <ListItemButton onClick={() => openClickPage('teachers')}>
              <ListItemText primary="Тренеры" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            selected={currentPath === '/admin/transactions'}
          >
            <ListItemButton onClick={() => openClickPage('transactions')}>
              <ListItemText primary="Транзакции" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            selected={currentPath === '/admin/categories'}
          >
            <ListItemButton onClick={() => openClickPage('categories')}>
              <ListItemText primary="Категории" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding selected={currentPath === '/admin/tests'}>
            <ListItemButton onClick={() => openClickPage('tests')}>
              <ListItemText primary="Тесты" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding selected={currentPath === '/admin/groups'}>
            <ListItemButton onClick={() => openClickPage('groups')}>
              <ListItemText primary="Группы" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding selected={currentPath === '/admin/lessons'}>
            <ListItemButton onClick={() => openClickPage('lessons')}>
              <ListItemText primary="Уроки" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            selected={currentPath === '/admin/notifications'}
          >
            <ListItemButton onClick={() => openClickPage('notifications')}>
              <ListItemText primary="Уведомления" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            selected={currentPath === '/admin/video-reviews'}
          >
            <ListItemButton onClick={() => openClickPage('video-reviews')}>
              <ListItemText primary="Видео отзывы" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Box>
    </>
  );
};

export default Sidebar;
