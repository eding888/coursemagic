import React, { forwardRef, useImperativeHandle } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { logout } from '../../utils/routing';
import { useNavigate } from 'react-router-dom';


const LogoutAlert = forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    document.body.style.overflow = "auto";
    navigate("/home")
  }

  useImperativeHandle(ref, () => ({
    handleClickOpen
  }), [handleClickOpen]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Logout?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Proceed with Logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogout} autoFocus>
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
});

export default LogoutAlert;