import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import kg from '@/src/assets/images/kg.svg';
import ru from '@/src/assets/images/ru.svg';
import NextImage from 'next/image';

const ChangeLanguage = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [state, setState] = useState('RU');
  const [languageId, setLanguageId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedLanguageId = localStorage.getItem('conveythis-language-id');
      setLanguageId(storedLanguageId);
      setLanguageId(storedLanguageId || '771');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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
        <Tooltip title="Сменить язык">
          {languageId === '748' ? (
            <NextImage src={kg} width="36" height="24" alt="kg" />
          ) : languageId === '771' ? (
            <NextImage src={ru} width="36" height="24" alt="ru" />
          ) : (
            <CircularProgress />
          )}
        </Tooltip>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="conveythis-no-translate"
      >
        <MenuItem
          onClick={() =>
            handleChangeLanguage(languageId === '771' ? 'ky' : 'ru')
          }
          style={{ background: '#ccc' }}
        >
          {languageId === '771' ? (
            <Tooltip title="Кыргызча">
              <NextImage src={kg} width="36" height="24" alt="kg" />
            </Tooltip>
          ) : languageId === '748' ? (
            <Tooltip title="Русский">
              <NextImage src={ru} width="36" height="24" alt="ru" />
            </Tooltip>
          ) : (
            <CircularProgress />
          )}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ChangeLanguage;
