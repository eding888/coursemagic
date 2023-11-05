  import { Button } from "@mui/material"
  import { useState, useEffect } from "react";
  import Navbar from "./components/Navbar"
  import Typography from '@mui/material/Typography';
  import { Box } from '@mui/system';
  import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
  import "./index.css"
  function App() {
    const [scroll, setscroll] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 200 && !scroll) {
          // Scroll position is past 200 pixels, and the action hasn't been triggered yet
          setscroll(true);
          // Perform the action you want here, for example, changing a state or displaying content
          // For demonstration purposes, we'll just log a message
          console.log('Scrolled past 200 pixels');
        } else if (window.scrollY <= 200 && scroll) {
          // Scroll position is back below 200 pixels
          setscroll(false);
        }
      };
      // Add the scroll event listener
      window.addEventListener('scroll', handleScroll);
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [scroll]);
    return (
      <>
        <Navbar></Navbar>
        <Box sx={{height: "calc(200vh - 64px)", width:"100vw", background: "linear-gradient(30deg, rgba(95,133,249,0.9962578781512605) 0%, rgba(96,193,242,0.9850533963585434) 56%)"}}>

          <Box sx={{display: "flex", width: "100%", justifyContent: "center", alignItems: "center", height: "80vh"}}>
            <Box sx={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
              <Typography variant="h2" sx={{marginLeft: "100px", width: 600, color: "white", fontWeight: "bold"}}>Signing up for Classes Has Never Been More <span style={{ color: 'blue' }}>	&#10024; Magical &#10024;</span></Typography>
              <Button variant="outlined" sx={{width: "30%", height: "50px", marginTop: "30px", marginLeft: "100px"}}>Register Now</Button>
            </Box>
            <Box
              component="img"
              sx={{
                transform: "scaleX(-1)",
                height: 600,
                width: 600,
              }}
              src="https://static.vecteezy.com/system/resources/previews/025/139/958/original/black-magic-stick-wand-3d-render-icon-png.png"
            />
          </Box>

          <Box className={scroll ? "slide-and-fade" : "fade-away"}sx={{display: "flex", width: "100%", justifyContent: "center", alignItems: "center", height: "80vh"}}>
            <Typography variant="h2" sx={{width: "80%", textAlign:"center", color: "white", fontWeight: "bold"}}>CourseMagic Takes Away the Guesswork. </Typography>
            <Typography>
              <CalendarMonthIcon></CalendarMonthIcon>
            </Typography>
          </Box>

        </Box>
      </>
    )
  }

  export default App;
