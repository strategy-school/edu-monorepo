import React from 'react';
import { Divider, Typography } from '@mui/material';

const styles = {
  blockTitle: {
    color: '#D9272DFF',
    paddingBottom: '10px',
    fontWeight: 700,
  },
  divider: {
    background: '#D9272DFF',
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
