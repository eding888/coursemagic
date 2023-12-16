  import { Button } from "@mui/material"
  import { useState, useEffect } from "react";
  import Navbar from "../components/Navbar"
  import Typography from '@mui/material/Typography';
  import { Box } from '@mui/system';
  import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
  import SchoolIcon from '@mui/icons-material/School';
  import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
  import DirectionsIcon from '@mui/icons-material/Directions';

  import { googleLogin } from "../utils/Routing";

  import "../index.css"
  function Landing() {
    const [scroll, setscroll] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const mobile = (screenWidth < 900);
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > (mobile ? 1200 : 700)) {
          setscroll(2);
        } else if (window.scrollY >= 300) {
          setscroll(1);
        } else {
          setscroll(0);
        }
      };
      // Add the scroll event listener
      window.addEventListener('scroll', handleScroll);
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [scroll]);

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

    return (
      <>
        <Navbar></Navbar>
        <Box sx={{padding: "10px", overflow: "hidden", height: (mobile ? "3000px" : "2000px"), width:"100vw", background: "linear-gradient(30deg, rgba(95,133,249,0.9962578781512605) 0%, rgba(96,201,242,0.9850533963585434) 82%)"}}>
          <Box sx={{display: "flex", width: "100%", justifyContent: "center", alignItems: "center", height: "88vh", mb: "45px"}}>
            <Box sx={{display: "flex", flexDirection: "column", width: (mobile ? "100%" : "45%"), textAlign: (mobile ? "center" : "left"), alignItems: 'center', justifyContent: 'center'}}>
              <Typography variant="h2" sx={{minWidth: "360px", marginLeft: (mobile ? "0px" : "100px"), color: "white", fontWeight: "bold"}}>Signing up for Classes Has Never Been More<br></br> <span style={{ color: 'blue' }}>	&#10024; Magical &#10024;</span></Typography>
              <Button variant="outlined" sx={{width: "30%", height: "50px", marginTop: "30px", marginLeft: (mobile ? "0px" : "100px")}}>Sign Up with Google</Button>
            </Box>
            <Box
              display= {mobile ? "none" : "flex"}
              component="img"
              className="body-image wiggle"
              sx={{
                transform: "scaleX(-1)",
                height: 600,
                width: 600,
              }}
              src="https://static.vecteezy.com/system/resources/previews/025/139/958/original/black-magic-stick-wand-3d-render-icon-png.png"
            />
          </Box>

          <Box className={scroll === 1 || scroll == 2 ? "slide-and-fade" : "fade-away"}sx={{display: "flex", flexDirection: "column", gap: "10px", width: "100%", justifyContent: "flex-start", alignItems: "center", height: "500px", pt: "200px"}}>
            <Typography variant="h2" sx={{width: "80%", textAlign:"center", color: "white", fontWeight: "bold"}}>University Class Registration is Painful. </Typography>
            <Box sx={{display: "flex", alignItems: "center", flexDirection: (mobile ? "column-reverse" : "row"), gap: "30px"}}>
             <Box>
                <Typography variant="h5" sx={{textAlign: (mobile ? "center" : "left"), mb: "20px", color: "blue", fontWeight: "450"}}>Picking your classes can and will go wrong.</Typography>
                <ul>
                  <li>
                    <Typography variant= "h6" sx={{display: "flex", alignItems: "center", gap: "20px"}}>
                      Courses fill up QUICK. How would you know what other class to add if one fills up?
                    </Typography>
                  </li>
                  <li>
                    <Typography variant= "h6" sx={{display: "flex", alignItems: "center", gap: "20px"}}>
                      You don't want early classes. It's hard to keep that in mind.
                    </Typography>
                  </li>
                  <li>
                <Typography variant= "h6" sx={{display: "flex", alignItems: "center", gap: "20px"}}>
                  You don't want classes that are too far away from each other.
                </Typography>
                </li>
                <li>
                <Typography variant= "h6" sx={{display: "flex", alignItems: "center", gap: "20px"}}>
                  Your college's class selection portal sucks.
                </Typography>
                </li>
                </ul>
              </Box>
              <Box
                component="img"
                className="body-image"
                sx={{
                  height: 250,
                  width: 250,
                }}
                src="https://static.vecteezy.com/system/resources/previews/012/627/751/original/3d-books-stack-education-learning-studying-and-information-concept-realistic-3d-high-quality-render-isolated-png.png"
              />

            </Box>
          </Box>

          <Box className={scroll === 2 ? "slide-and-fade" : "fade-away"}sx={{display: "flex", flexDirection: "column", gap: "10px", width: "100%", justifyContent: "flex-start", alignItems: "center", height: "500px", pt: (mobile ? "700px" : "200px")}}>
            <Typography variant="h2" sx={{width: "80%", textAlign:"center", color: "white", fontWeight: "bold"}}>CourseMagic Takes Away the Guesswork. </Typography>
            <Box sx={{display: "flex", alignItems: "center", flexDirection: (mobile ? "column" : "row"), gap: "30px"}}>
              <Box
                component="img"
                className="body-image"
                sx={{
                  height: 250,
                  width: 250,
                }}
                src="https://static.vecteezy.com/system/resources/thumbnails/011/026/915/small_2x/3d-wizard-hat-icon-halloween-illustration-png.png"
              />
              <Box>
                <Typography variant="h5" sx={{textAlign: (mobile ? "center" : "left"), mb: "20px", color: "blue", fontWeight: "450"}}>CourseMagic makes picking classes a breeze:</Typography>
                <Typography variant= "h6" sx={{display: "flex", alignItems: "center", gap: "20px"}}>
                  <SchoolIcon sx={{mb: "5px"}}></SchoolIcon>
                  Add your classes with various metadata to keep yourself organized.
                </Typography>
                <Typography variant= "h6" sx={{display: "flex", alignItems: "center", gap: "20px"}}>
                  <CalendarMonthIcon sx={{mb: "5px"}}></CalendarMonthIcon>
                  Automatically view addable classes based on currently selected schedule.
                </Typography>
                <Typography variant= "h6" sx={{display: "flex", alignItems: "center", gap: "20px"}}>
                  <SettingsSuggestIcon sx={{mb: "5px"}}></SettingsSuggestIcon>
                  Get magical suggestions for classes to add.
                </Typography>
                <Typography variant= "h6" sx={{display: "flex", alignItems: "center", gap: "20px"}}>
                  <DirectionsIcon sx={{mb: "5px"}}></DirectionsIcon>
                  Google Maps API allows for estimation of walking distance between classes.
                </Typography>
              </Box>
            </Box>
            <Button variant="contained" sx={{width: "30%", height: "150px", marginTop: "50px"}}>Try CourseMagic for Free!</Button>
          </Box>
        </Box>
      </>
    )
  }

  export default Landing;
