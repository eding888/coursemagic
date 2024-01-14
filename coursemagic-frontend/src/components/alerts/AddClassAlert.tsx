import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Input, InputLabel, Box, Alert } from '@mui/material';
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { addClass } from '../../utils/routing';
import { useNavigate } from 'react-router-dom';
import { Class } from '../../../../coursemagic-api/src/database/postgreDataAccess'

interface AddClassAlertProps {
  retrieveUserData: () => Promise<void>;
}


const AddClassAlert = forwardRef((props: AddClassAlertProps, ref) => {
  const [open, setOpen] = useState(false);

  const [className, setClassName] = useState("");
  const [creditHours, setCreditHours] = useState(1);
  const [lectureHall, setLectureHall] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const timeError = (startTime.getHours() * 60 + startTime.getMinutes()) 
                    >= (endTime.getHours() * 60 + endTime.getMinutes())
                    ? true
                    : false;

  const handleStartTime = (newDate: Date | null) => {
    if(!newDate) {
      return;
    }
    setStartTime(newDate);
  }
  const handleEndTime = (newDate: Date | null) => {
    if(!newDate) {
      return;
    }
    setEndTime(newDate);
  }

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    await props.retrieveUserData();
  };

  const handleAddClass = async () => {
    const addedClass: Class = {
      userid: "", // user id and id will be automatically populated later, placeholder values first
      id: 0,
      className,
      lectureHall,
      creditHours,
      startTime: (startTime.getHours() * 60 + startTime.getMinutes()),
      endTime: (endTime.getHours() * 60 + endTime.getMinutes())
    }
    const res = await addClass(addedClass);
    if(!res) {
      navigate("/home")
      return;
    }
    await props.retrieveUserData();
    setOpen(false);
  }

  useImperativeHandle(ref, () => ({
    handleClickOpen,
    handleClose
  }), [handleClickOpen, handleClose]);

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
            <Input value={className} onChange={newValue => setClassName(newValue.target.value)}id="class-name"></Input>

            <InputLabel htmlFor="credit-hours"># Credit Hours</InputLabel>
            <Input value={creditHours} onChange={newValue => setCreditHours(Number(newValue.target.value))} id="credit-hours" type="number" inputProps={{min: "1"}}></Input>

            <InputLabel htmlFor="lecture-hall">Lecture Hall</InputLabel>
            <Input value={lectureHall} onChange={newValue => setLectureHall(newValue.target.value)} id="lecture-hall"></Input>
            
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker value = {startTime} onChange = {newTime => handleStartTime(newTime)} label="Start Time" />
              <TimePicker value = {endTime} onChange = {newTime => handleEndTime(newTime)} label="End Time" />
            </LocalizationProvider>
            {
              timeError
              ? <Alert severity='error'>Start time must be before end time.</Alert>
              : <></>
            }
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={timeError} onClick={handleAddClass} autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
});

export default AddClassAlert;