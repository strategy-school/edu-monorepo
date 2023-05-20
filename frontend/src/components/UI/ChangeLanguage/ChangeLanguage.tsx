import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

const ChangeLanguage = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChangeLanguage = (lang: string) => {
    const currentUrl = window.location.href;

    const newUrl = `${
      currentUrl.includes('?locale=') ? currentUrl.slice(0, -10) : currentUrl
    }/?locale=${lang}`;
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
    <div style={{ position: 'absolute', left: '10px', bottom: '10px' }}>
      <Button onClick={handleClick}>Изменить язык</Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => handleChangeLanguage('ru')}>Русский</MenuItem>
        <MenuItem onClick={() => handleChangeLanguage('ky')}>Кыргызча</MenuItem>
      </Menu>
    </div>
  );
};

export default ChangeLanguage;
