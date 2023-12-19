import { useEffect, useState } from "react";
import DashNavbar from "../components/DashNavbar"
import { getSession } from "../utils/Routing";
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
import ListIcon from '@mui/icons-material/List';

import "../index.css"

function Dashboard() {
  const [csrf, setCsrf] = useState("");
  const [menuPopped, setMenuPopped] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const mobile = (screenWidth < 900);

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
      {
        // If mobile view, then we need the hamburger menu
        !mobile
        ? <Box sx={{width: "300px", height: "calc(100vh - 64px)", boxShadow: 8, display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Typography variant="h5" sx={{mt: "30px"}}>Your Class Cart</Typography>
          </Box>
        : <Box sx={{position: "absolute", height: "calc(100vh - 64px)",boxShadow: 8}} className={menuPopped ? "slide-menu-out" : "slide-menu-in"}>
            <Box sx={{display: "flex", width: "100%", justifyContent: "flex-end"}}>
              <ListIcon onClick={() => {setMenuPopped(!menuPopped); console.log(menuPopped)}} sx={{ml: "auto", mr:"5px", cursor: "pointer"}}style={{fontSize: 40}}>
              </ListIcon>
            </Box>
            <Box className={menuPopped ? "fade-in" : "fade-out"} sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <Typography variant="h5" sx={{mt: "5px"}}>Your Class Cart</Typography>
            </Box>
          </Box>
      }
    </>
  )
}

export default Dashboard;