import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button } from "@mui/material"
import { Box } from '@mui/system';
import { CssBaseline } from '@mui/material';

function Navbar() {
  return (
    <AppBar sx={{backgroundColor:"transparent"}}position="sticky">
      <CssBaseline />
      <Toolbar sx={{display: "flex", justifyContent: "space-between", backgroundColor: "white"}}>
        <Box
          component="img"
          sx={{
            width: 250,
          }}
          src="https://i.ibb.co/z2767sk/coursemagic-high-resolution-logo-transparent.png"
        />
        <Box sx={{display: "flex", gap: "20px"}}>
          <Button variant='contained'>Login</Button>
          <Button variant='contained'>Sign Up</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;