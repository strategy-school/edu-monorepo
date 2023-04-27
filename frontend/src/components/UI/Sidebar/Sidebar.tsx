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
          {['Courses', 'Users', 'Teachers', 'Transactions', 'Categories'].map(
            (text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => openClickPage(text.toLowerCase())}
                >
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ),
          )}
        </List>
        <Divider />
      </Box>
    </>
  );
};

export default Sidebar;
