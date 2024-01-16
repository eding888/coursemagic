import { Typography, Button } from '@mui/material';
import { Box} from '@mui/system';
import { convertTo12HourFormat, daysOfWeekNumsToStr } from '../utils/jsHelper';
import DeleteClassAlert from './alerts/DeleteClassAlert';
import { useRef } from 'react';
import { removeClassFromCurrent } from '../utils/routing';
import { Class } from '../../../coursemagic-api/src/database/postgreDataAccess'

interface CurrentClassProps {
  selectedClass: Class,
  retrieveUserData: () => Promise<void>;
}

function CurrentClass(props: CurrentClassProps) {
  const deleteAlertRef = useRef(null);

  const remove = async () => {
    await removeClassFromCurrent(props.selectedClass.id);
    await props.retrieveUserData();
  }

  return (
    <>
      <DeleteClassAlert retrieveUserData={props.retrieveUserData} deletionId={props.selectedClass.id} ref={deleteAlertRef}></DeleteClassAlert>
      <Box borderRadius="10px" sx={{height: "115px", overflow: "scroll", display: "flex", flexDirection: "column", alignItems: "center", width: "80%", border: "2px solid black"}}>
        <Typography variant = "h5">
          {props.selectedClass.classname}
        </Typography>

        <Box sx={{width: "100%", display: "flex", justifyContent: "center", gap: "10px"}}>
          <Typography>
            {props.selectedClass.credithours} Credits
          </Typography>

          <Typography>
            {convertTo12HourFormat(props.selectedClass.starttime)} - 
            {convertTo12HourFormat(props.selectedClass.endtime)}
          </Typography>
          
          <Typography>
            {props.selectedClass.lecturehall}
          </Typography>
        </Box>
        <Typography fontWeight="bold">
          {daysOfWeekNumsToStr(props.selectedClass.daysofweek)}
        </Typography>
        <Box sx={{display: "flex", flexDirection: "column"}}>
          <Button onClick= {remove} size= "small" sx={{color: "red"}}>Remove</Button>
        </Box>
      </Box>
    </>
  );
}

export default CurrentClass;