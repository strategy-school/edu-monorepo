import React from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';

const AnonymousMenu = () => {
  return (
    <>
      <Button component={Link} href="/registration" color="inherit">
        Регистрация
      </Button>
      <Button component={Link} href="/login" color="inherit">
        Войти
      </Button>
    </>
  );
};

export default AnonymousMenu;
