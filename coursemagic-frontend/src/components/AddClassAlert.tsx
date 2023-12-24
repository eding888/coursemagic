import React, { forwardRef, useImperativeHandle } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Input, InputLabel, Box } from '@mui/material';
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { logout } from '../utils/routing';
import { useNavigate } from 'react-router-dom';


const AddClassAlert = forwardRef((props, ref) => {
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
    navigate('/home');
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
          Add Class
        </DialogTitle>
        <DialogContent>
          <Box sx={{display: "flex", flexDirection: "column", gap: "15px"}}>
            <InputLabel htmlFor="class-name">Class Name</InputLabel>
            <Input id="class-name"></Input>

            <InputLabel htmlFor="credit-hours"># Credit Hours</InputLabel>
            <Input id="credit-hours" type="number"></Input>

            <InputLabel htmlFor="lecture-hall">Lecture Hall</InputLabel>
            <Input id="lecture-hall"></Input>
            
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker label="Start Time" />
              <TimePicker label="End Time" />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogout} autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
});

export default AddClassAlert;