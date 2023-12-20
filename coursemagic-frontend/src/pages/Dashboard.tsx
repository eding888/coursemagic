import React, { useEffect, useState } from "react";
import DashNavbar from "../components/DashNavbar"
import { getSession } from "../utils/routing";
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import DirectionsIcon from '@mui/icons-material/Directions';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';

import "../index.css"

function Dashboard() {
  // State for csrf token requied for requests
  const [csrf, setCsrf] = useState("");

  // State for various ui componeents
  const [menuPopped, setMenuPopped] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const mobile = (screenWidth < 900);
  const med = (screenWidth < 1170);

  //State for credit hours
  const [creditHours, setCreditHours] = useState(0);

  // I want the menu to close when screen get samll
  if(!med && menuPopped) setMenuPopped(false);

  const navigate = useNavigate();

  // Effect for retrieving csrf on page load
  useEffect(() => {
    const retreiveSession = async () => {
      const session = await getSession();
      console.log(session);
      if(!session) {
        navigate("/home")
        return;
      }
      setCsrf(session);
    }
    retreiveSession();
  }, []);

  // Effect for updating window size
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add a listener for the resize event
    window.addEventListener('resize', handleResize);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Stuff for the dropdown
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return(
    <>
      <DashNavbar></DashNavbar>
      <Box sx={{display: "flex", overflow: "hidden"}}>
        {
          // If mobile view, then we need the hamburger menu
          !med
          ? <Box sx={{width: "300px", height: "calc(100vh - 64px)", boxShadow: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
              <Typography variant="h5" sx={{mt: "30px"}}>Your Class Cart</Typography>
            </Box>
          : <Box sx={{zIndex: 1500, backgroundColor: "whitesmoke", position: "absolute", height: "calc(100vh - 64px)", boxShadow: 8}} className={menuPopped ? "slide-menu-out" : "slide-menu-in"}>
              <Box sx={{display: "flex", width: "100%", justifyContent: "flex-end"}}>
                <ListIcon onClick={() => {setMenuPopped(!menuPopped); console.log(menuPopped)}} sx={{ml: "auto", mr:"5px", cursor: "pointer"}}style={{fontSize: 40}}>
                </ListIcon>
              </Box>
              <Box className={menuPopped ? "fade-in" : "fade-out"} sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography variant="h5" sx={{mt: "5px"}}>Your Class Cart</Typography>
              </Box>
            </Box>
        }
        <Box className={med ? "increase-margin" : "decrease-margin"}sx={{width: "100%", overflow: "scroll", height: "calc(100vh - 60px)"}}>
          <Box sx={{width: "100%", display: "flex", overflow: "scroll", padding: "30px"}}>
            <Box sx={{display: "flex", border: "2px", flexDirection: "column", alignItems: "center", height: "800px", width: mobile ? "300px" : "400px", boxShadow: 3}}>
              <Typography variant="h6" sx={{mt: "10px"}}>Addable Classes</Typography>
            </Box>
            <Box sx={{display: "flex", width: "100%", flexDirection: "column", alignItems: "center", gap: "10px"}}>
              <Box sx={{display: "flex", width: "100%", justifyContent: "center", gap: "30px"}}>
                <div>
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    Load Saved Schedule
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </Menu>
                </div>
                <div>
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    sx={{color: "red"}}
                    onClick={handleClick}
                  >
                    Delete Saved Schedule
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </Menu>
                </div>
              </Box>
              <Box sx={{zIndex: 1, boxShadow: 3, pt: "7px", height: "400px", width: "100%", ml: "30px", display: "flex", justifyContent: "space-around"}}>
                <Box>
                  <Typography variant={mobile ? "h6" : "h5"}>{mobile ? "Mon" : "Monday"}</Typography>
                </Box>
                <Box>
                  <Typography variant={mobile ? "h6" : "h5"}>{mobile ? "Tue" : "Tuesday"}</Typography>
                </Box>
                <Box>
                  <Typography variant={mobile ? "h6" : "h5"}>{mobile ? "Wed" : "Wednesday"}</Typography>
                </Box>
                <Box>
                  <Typography variant={mobile ? "h6" : "h5"}>{mobile ? "Thur" : "Thursday"}</Typography>
                </Box>
                <Box>
                  <Typography variant={mobile ? "h6" : "h5"}>{mobile ? "Fri" : "Friday"}</Typography>
                </Box>
              </Box>
              <Box sx={{mt: "10px", ml: "30px", display: 'flex', width: "100%", justifyContent: "space-between"}}>
                <Box sx={{display: "flex", flexDirection: "column", width: "50%", alignItems: "center", mt: "10px"}}>
                  <Typography variant="h6" sx={{mb: "40px"}}>{creditHours} Credit Hours</Typography>
                  <Button size="large" sx={{mb: "10px"}} variant="contained"><AddIcon sx={{mr: "5px"}}></AddIcon>Add Class to Cart</Button>
                  <Button size="large" sx={{mb: "10px"}}><DownloadIcon sx={{mr: "5px"}}></DownloadIcon>Save Schedule</Button>
                  <Button size="large" sx={{mb: "10px"}}><DirectionsIcon sx={{mr: "5px"}}></DirectionsIcon>Run Distance Estimate</Button>
                  <Button size="large" sx={{mb: "10px"}}><AutoFixHighIcon sx={{mr: "5px"}}></AutoFixHighIcon>Get Magic Schedule</Button>
                </Box>
                <Box sx={{width: "50%", boxShadow: 3, display: "flex", justifyContent: "center", height: "335px", pt: "10px"}}>
                  <Typography variant="h6">Current Classes</Typography>
                </Box>
              </Box>

            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Dashboard;