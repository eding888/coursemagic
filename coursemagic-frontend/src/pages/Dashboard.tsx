import { useEffect, useState } from "react";
import DashNavbar from "../components/DashNavbar"
import { getSession } from "../utils/Routing";
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
import ListIcon from '@mui/icons-material/List';

import "../index.css"

function Dashboard() {
  // State for csrf token requied for requests
  const [csrf, setCsrf] = useState("");

  // State for various ui componeents
  const [menuPopped, setMenuPopped] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const mobile = (screenWidth < 900);

  // I want the menu to close when screen get samll
  if(!mobile && menuPopped) setMenuPopped(false);

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

  return(
    <>
      <DashNavbar></DashNavbar>
      <Box sx={{display: "flex"}}>
        {
          // If mobile view, then we need the hamburger menu
          !mobile
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

        <Box className={mobile ? "increase-margin" : "decrease-margin"} sx={{zIndex: 1, position: 'relative', width: "100%", display: "flex", justifyContent: "space-around"}}>
          <Box>
            <Typography variant="h5">Monday</Typography>
          </Box>
          <Box>
            <Typography variant="h5">Tuesday</Typography>
          </Box>
          <Box>
            <Typography variant="h5">Wednesday</Typography>
          </Box>
          <Box>
            <Typography variant="h5">Thursday</Typography>
          </Box>
          <Box>
            <Typography variant="h5">Friday</Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Dashboard;