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

  const openClickPage = (name: string) => {
    void router.push('/admin/' + name);
  };

  return (
    <>
      <Box sx={{ width: '240px' }}>
        <Divider />
        <List>
          {[
            'Courses',
            'Users',
            'Teachers',
            'Transactions',
            'Categories',
            'Tests',
            'Groups',
            'Notifications',
          ].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => openClickPage(text.toLowerCase())}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton onClick={() => openClickPage('courses')}>
              <ListItemText primary="Курсы" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => openClickPage('users')}>
              <ListItemText primary="Пользователи" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => openClickPage('teachers')}>
              <ListItemText primary="Тренеры" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => openClickPage('transactions')}>
              <ListItemText primary="Транзакции" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => openClickPage('categories')}>
              <ListItemText primary="Категории" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => openClickPage('tests')}>
              <ListItemText primary="Тесты" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => openClickPage('groups')}>
              <ListItemText primary="Группы" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
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
