import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  open: boolean;
  handleClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const MyModal: React.FC<Props> = ({ open, handleClose, title, children }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ '& .MuiPaper-root': { width: '70%', maxWidth: 'none' } }}
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
      <DialogContent>{children}</DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{ paddingX: '30px' }}
        >
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MyModal;
