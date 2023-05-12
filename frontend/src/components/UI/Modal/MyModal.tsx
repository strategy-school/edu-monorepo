import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  open: boolean;
  handleClose: () => void;
  title?: string;
  children: React.ReactNode;
  isReview?: boolean;
}

const MyModal: React.FC<Props> = ({
  open,
  handleClose,
  title,
  children,
  isReview,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiPaper-root': {
          width: isReview ? '337px' : '60%',
          maxWidth: 'none',
        },
      }}
    >
      <DialogTitle>
        {title}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {isReview ? (
        <DialogContent sx={{ p: 0 }}>{children}</DialogContent>
      ) : (
        <DialogContent>{children}</DialogContent>
      )}
    </Dialog>
  );
};

export default MyModal;
