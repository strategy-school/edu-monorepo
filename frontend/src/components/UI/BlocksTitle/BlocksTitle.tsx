import React from 'react';
import { Divider, Typography } from '@mui/material';

const styles = {
  blockTitle: {
    color: '#D9272DFF',
    paddingBottom: '10px',
  },
  divider: {
    background: '#D9272DFF',
    height: '2px',
    marginBottom: '30px',
    borderRadius: '10px',
  },
};

interface Props {
  titleText: string;
}

const BlocksTitle: React.FC<Props> = ({ titleText }) => {
  return (
    <>
      <Typography component="h1" variant="h3" style={styles.blockTitle}>
        {titleText}
      </Typography>
      <Divider style={styles.divider} />
    </>
  );
};

export default BlocksTitle;
