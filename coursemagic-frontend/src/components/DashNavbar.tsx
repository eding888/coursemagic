import React, { useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button } from "@mui/material"
import { Box } from '@mui/system';
import { CssBaseline } from '@mui/material';
import Alert from './alerts/LogoutAlert';

function DashNavbar() {
  const alertRef = useRef(null);

  const dialog = () => {
    if(alertRef.current) {
      // @ts-expect-error: Issue with typings, works fine.
      alertRef.current.handleClickOpen();
    }
  }
  return (
    <AppBar sx={{backgroundColor:"transparent"}}position="sticky">
      <Alert ref={alertRef}></Alert>
      <CssBaseline />
      <Toolbar sx={{display: "flex", justifyContent: "space-around", backgroundColor: "white", height: "64px"}}>
        <Box
          component="img"
          sx={{
            width: 250,
          }}
          src="https://i.ibb.co/z2767sk/coursemagic-high-resolution-logo-transparent.png"
        />
        <div></div>
        <Box sx={{display: "flex", gap: "20px"}}>
        <Button onClick={dialog} variant='contained'>Log Out</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default DashNavbar;