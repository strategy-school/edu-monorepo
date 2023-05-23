import React from 'react';
import { Divider, Typography } from '@mui/material';
import theme from '@/src/theme';

const styles = {
  blockTitle: {
    color: theme.palette.info.dark,
    paddingBottom: '10px',
    fontWeight: 700,
  },
  divider: {
    background: theme.palette.info.dark,
    height: '2px',
    marginBottom: '30px',
    borderRadius: '10px',
    width: '100%',
  },
};

interface Props {
  titleText: string;
}

const BlocksTitle: React.FC<Props> = ({ titleText }) => {
  return (
    <>
      <Typography
        component="h1"
        variant="h3"
        style={styles.blockTitle}
        fontSize={{ xs: '24px', md: '30px' }}
      >
        {titleText}
      </Typography>
      <Divider style={styles.divider} />
    </>
  );
};

export default BlocksTitle;
