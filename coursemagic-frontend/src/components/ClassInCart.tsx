import { Typography, Button } from '@mui/material';
import { Box} from '@mui/system';
import { convertTo12HourFormat } from '../utils/jsHelper';

// Cant import original, for some reason, camelback notation didn't work?
interface Class {
  classname: string,
  userid: string,
  starttime: number,
  endtime: number,
  credithours: number,
  lecturehall: string
}

interface ClassInCartProps {
  selectedClass: Class
}

function ClassInCart(props: ClassInCartProps) {
  return (
    <>
      <Box borderRadius="10px" sx={{height: "190px", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", width: "80%", border: "2px solid black"}}>
        <Typography variant = "h5">
          {props.selectedClass.classname}
        </Typography>

        <Typography sx={{mt: "5px"}}>
          {props.selectedClass.credithours} Credit Hours
        </Typography>

        <Typography>
          {convertTo12HourFormat(props.selectedClass.starttime)} - 
          {convertTo12HourFormat(props.selectedClass.endtime)}
        </Typography>
        
        <Typography>
          {props.selectedClass.lecturehall}
        </Typography>
        
        <Box sx={{display: "flex", flexDirection: "column"}}>
          <Button>Add to Current</Button>
          <Button size= "small" sx={{color: "red"}}>Delete</Button>
        </Box>
      </Box>
    </>
  );
}

export default ClassInCart;