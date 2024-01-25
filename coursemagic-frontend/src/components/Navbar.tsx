import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button } from "@mui/material"
import { Box } from '@mui/system';
import { CssBaseline } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

import GitHubIcon from '@mui/icons-material/GitHub';

function Navbar() {
  return (
    <AppBar sx={{backgroundColor:"transparent"}}position="sticky">
      <CssBaseline />
      <Toolbar sx={{display: "flex", justifyContent: "space-around", backgroundColor: "white"}}>
        <Box
          component="img"
          sx={{
            width: 250,
          }}
          src="https://i.ibb.co/z2767sk/coursemagic-high-resolution-logo-transparent.png"
        />
        <div></div>
        <Box sx={{display: "flex", gap: "20px"}}>
          <Button onClick={() => window.open('https://github.com/eding888/coursemagic', '_blank')}variant='outlined'><GitHubIcon></GitHubIcon></Button>
          <Button onClick={() => {window.location.href = 'http://localhost:3000/auth/google'}} variant='contained'><GoogleIcon sx={{mr: "10px"}}></GoogleIcon>Sign In</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;