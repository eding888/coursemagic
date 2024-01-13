import React, { forwardRef, useImperativeHandle } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { deleteClass } from '../../utils/routing';

interface DeleteClassAlertProps {
  deletionId: number,
  retrieveUserData: () => Promise<void>;
}
const DeleteClassAlert = forwardRef((props: DeleteClassAlertProps, ref) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    await deleteClass(props.deletionId);
    await props.retrieveUserData();
    setOpen(false);
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
          Delete Class?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this class?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogout} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
});

export default DeleteClassAlert;