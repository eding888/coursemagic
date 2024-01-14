import React, { useEffect, useState, useRef } from "react";
import DashNavbar from "../components/DashNavbar"
import { getSession, getUserClasses, getUserCurrentClasses } from "../utils/routing";
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

import AddClassAlert from "../components/alerts/AddClassAlert";
import ClassInCart from "../components/ClassInCart";

import "../stylesheets/anims.css"

// Cant import original, for some reason, camelback notation didn't work?
interface Class {
  classname: string,
  userid: string,
  starttime: number,
  endtime: number,
  id: number,
  credithours: number,
  lecturehall: string
}

function Dashboard() {
  // State for various ui componeents
  const [menuPopped, setMenuPopped] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  //screen thresholds
  const mobile = (screenWidth < 950);
  const tiny = (screenWidth < 750);
  const med = (screenWidth < 1170);

  //States for various user data
  const [allUserClasses, setAllUserClasses] = useState([])
  const [userCurrentClasses, setUserCurrentClasses] = useState([])
  const [creditHours, setCreditHours] = useState(0);
  console.log(allUserClasses);

  // I want the menu to close when screen get samll
  if(!med && menuPopped) setMenuPopped(false);

  //Handles opening of add class alert
  const addClassRef = useRef(null);
  const handleAddClass = () => {
    if(addClassRef.current) {
      // @ts-expect-error: Issue with typings, works fine.
      addClassRef.current.handleClickOpen();
    }
  }

  // Retrieves all user data and updates state
  const retrieveUserData = async () => {
    const classes = await getUserClasses();
    const currentClasses = await getUserCurrentClasses();
    setAllUserClasses(classes);
    setUserCurrentClasses(currentClasses);
    if(!classes) {
      navigate("/home")
    }
  }
  console.log(userCurrentClasses);

  const navigate = useNavigate();

  // Effect for retrieving csrf on page load
  useEffect(() => {
    const retreiveSession = async () => {
      const session = await getSession();
      if(!session) {
        navigate("/home")
      } else {
        await retrieveUserData();
      }
    }
    retreiveSession();
  }, []);

  // Effect for updating window size
  useEffect(() => {
    document.body.style.overflow = "hidden";
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
    <Box>
      <DashNavbar></DashNavbar>
      <AddClassAlert retrieveUserData={retrieveUserData} ref={addClassRef}></AddClassAlert>
      <Box sx={{display: "flex"}}>
        {
          // If mobile view, then we need the hamburger menu
          !med
          ? <Box sx={{overflow: "scroll", height: "calc(100vh - 60px)", width: "300px", boxShadow: 8, paddingBottom: "8px"}}>
                <Box sx={{gap: "15px", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography variant="h5" sx={{mt: "30px"}}>Your Class Cart</Typography>
                {
                  allUserClasses.map(selectedClass => {
                    const formattedClass = selectedClass as Class;
                    return (
                      <>
                        <ClassInCart retrieveUserData={retrieveUserData} selectedClass={formattedClass}/>
                      </>
                    )
                  })
                }
                </Box>
            </Box>
          : <Box sx={{zIndex: 1000, backgroundColor: "whitesmoke", position: "absolute", height: "calc(100vh - 60px)", boxShadow: 8}} className={menuPopped ? "slide-menu-out" : "slide-menu-in"}>
              <Box sx={{display: "flex", width: "100%", justifyContent: "flex-end"}}>
                <ListIcon onClick={() => {setMenuPopped(!menuPopped)}} sx={{ml: "auto", mr:"5px", cursor: "pointer"}}style={{fontSize: 40}}>
                </ListIcon>
              </Box>
              <Box sx= {{height: "100%", overflow: "scroll", paddingBottom: "50px"}}>
                <Box className={menuPopped ? "fade-in" : "fade-out"} sx={{gap: "15px", display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <Typography variant="h5" sx={{mt: "5px"}}>Your Class Cart</Typography>
                  {
                    allUserClasses.map(selectedClass => {
                      const formattedClass = selectedClass as Class;
                      return (
                        <>
                          <ClassInCart retrieveUserData={retrieveUserData} selectedClass={formattedClass}/>
                        </>
                      )
                    })
                  }
                </Box>
              </Box>
            </Box>
        }
        <Box className={med ? "increase-margin" : "decrease-margin"}sx={{width: "100%", overflow: "scroll", height: "calc(100vh - 60px)"}}>
          <Box sx={{width: "100%", display: "flex", padding: "20px", flexDirection: tiny ? "column-reverse" : "row", gap: tiny ? "30px" : ""}}>
            <Box sx={{display: "flex", border: "2px", flexDirection: "column", alignItems: "center", height: tiny ? "335px" : "800px", width: mobile ? tiny ? "100%" : "300px" : "400px", boxShadow: 3, ml : tiny ? "15px" : ""}}>
              <Typography variant="h6" sx={{mt: "10px"}}>Addable Classes</Typography>
            </Box>
            <Box sx={{display: "flex", width: "100%", flexDirection: "column", alignItems: "center", gap: "10px", mr: "20px"}}>
              <Box sx={{display: "flex", ml: "30px", width: "100%", justifyContent: "center", gap: "30px"}}>
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
              <Box sx={{zIndex: 1, boxShadow: 3, pt: "7px", height: "400px", width: "100%", ml: "30px", display: "flex", flexDirection: tiny ? "column" : "row", justifyContent: tiny ? "space-between" : "space-around", alignItems: tiny ? "center" : ""}}>
                <Box>
                  <Typography variant={mobile ? "h6" : "h5"}>{mobile && !tiny  ? "Mon" : "Monday"}</Typography>
                </Box>
                <Box>
                  <Typography variant={mobile ? "h6" : "h5"}>{mobile && !tiny ? "Tue" : "Tuesday"}</Typography>
                </Box>
                <Box>
                  <Typography variant={mobile ? "h6" : "h5"}>{mobile && !tiny ? "Wed" : "Wednesday"}</Typography>
                </Box>
                <Box>
                  <Typography variant={mobile ? "h6" : "h5"}>{mobile && !tiny ? "Thur" : "Thursday"}</Typography>
                </Box>
                <Box>
                  <Typography variant={mobile ? "h6" : "h5"}>{mobile && !tiny ? "Fri" : "Friday"}</Typography>
                </Box>
              </Box>
              <Box sx={{mt: "10px", ml: "30px", display: 'flex', width: "100%", justifyContent: "space-between", gap: "10px", flexDirection: tiny ? "column": "row", alignItems: tiny ? "center" : ""}}>
                <Box sx={{display: "flex", flexDirection: "column", width: tiny ? "75%" : "50%", alignItems: "center", mt: "10px"}}>
                  <Typography variant="h6" sx={{mb: "40px"}}>{creditHours} Credit Hours</Typography>
                  <Button onClick={handleAddClass}size= {med && ! tiny ? "medium" : "large"} sx={{mb: "10px"}} variant="contained"><AddIcon sx={{mr: "5px"}}></AddIcon>Add Class to Cart</Button>
                  <Button size={med && ! tiny ? "medium" : "large"} sx={{mb: "10px"}}><DownloadIcon sx={{mr: "5px"}}></DownloadIcon>Save Schedule</Button>
                  <Button size={med && ! tiny ? "medium" : "large"} sx={{mb: "10px"}}><DirectionsIcon sx={{mr: "5px"}}></DirectionsIcon>Distance Estimate</Button>
                  <Button size={med && ! tiny ? "medium" : "large"} sx={{mb: "10px"}}><AutoFixHighIcon sx={{mr: "5px"}}></AutoFixHighIcon>Get Magic Schedule</Button>
                </Box>
                <Box sx={{width: tiny ? "100%" : "50%", mt: tiny ? "30px" : "", boxShadow: 3, display: "flex", justifyContent: "center", height: "335px", pt: "10px"}}>
                  <Typography variant="h6">Current Classes</Typography>
                </Box>
              </Box>

            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard;