import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button } from "@mui/material"
import { Box } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { logout } from '../utils/Routing';
import { useNavigate } from 'react-router-dom';

function DashNavbar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate('/home');
  }
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
        <Button onClick={handleLogout} variant='contained'>Log Out</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default DashNavbar;