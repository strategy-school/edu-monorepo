import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
}

const CustomModal: React.FC<Props> = ({ children, onClose, open }) => {
  return (
    <Dialog open={open} fullWidth maxWidth={'lg'} transitionDuration={400}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default CustomModal;
