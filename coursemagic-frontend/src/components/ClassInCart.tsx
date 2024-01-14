import { Typography, Button } from '@mui/material';
import { Box} from '@mui/system';
import { convertTo12HourFormat } from '../utils/jsHelper';
import DeleteClassAlert from './alerts/DeleteClassAlert';
import { useRef } from 'react';
import { addClassToCurrent } from '../utils/routing';

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

interface ClassInCartProps {
  selectedClass: Class,
  retrieveUserData: () => Promise<void>;
}

function ClassInCart(props: ClassInCartProps) {
  const deleteAlertRef = useRef(null);

  const deleteAlertDialog = () => {
    if(deleteAlertRef.current) {
      // @ts-expect-error: Issue with typings, works fine.
      deleteAlertRef.current.handleClickOpen();
    }
  }

  const handleAddClassToCurrent = async () => {
    await addClassToCurrent(props.selectedClass.id);
    await props.retrieveUserData();
  }

  return (
    <>
      <DeleteClassAlert retrieveUserData={props.retrieveUserData} deletionId={props.selectedClass.id} ref={deleteAlertRef}></DeleteClassAlert>
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
          <Button onClick = {handleAddClassToCurrent}>Add to Current</Button>
          <Button onClick= {deleteAlertDialog} size= "small" sx={{color: "red"}}>Delete</Button>
        </Box>
      </Box>
    </>
  );
}

export default ClassInCart;