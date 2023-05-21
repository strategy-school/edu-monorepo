import React, { useEffect, useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';

const ChangeLanguage = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [state, setState] = useState('RU');

  useEffect(() => {
    const currentUrl = window.location.href;

    if (currentUrl.includes('ky')) {
      setState('KG');
    } else {
      setState('RU');
    }
  }, [state]);

  const handleChangeLanguage = (lang: string) => {
    const currentUrl = window.location.href;

    const newUrl = `${
      currentUrl.includes('?locale=') ? currentUrl.slice(0, -10) : currentUrl
    }?locale=${lang}`;
    window.history.replaceState(null, '', newUrl);
    window.location.reload();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick} color="inherit">
        <TranslateIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="conveythis-no-translate"
      >
        <MenuItem onClick={() => handleChangeLanguage('ru')}>Русский</MenuItem>
        <MenuItem onClick={() => handleChangeLanguage('ky')}>Кыргызча</MenuItem>
      </Menu>
    </div>
  );
};

export default ChangeLanguage;
