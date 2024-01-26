import { Typography} from '@mui/material';
import { Box} from '@mui/system';
import { convertTo12HourFormat } from '../utils/jsHelper';
import DeleteClassAlert from './alerts/DeleteClassAlert';
import { useRef } from 'react';
import { Class } from '../../../coursemagic-api/src/database/postgreDataAccess'

interface ClassInWeekProps {
  selectedClass: Class,
  retrieveUserData: () => Promise<void>,
  smallVariant: boolean
}

function ClassInWeek(props: ClassInWeekProps) {
  const deleteAlertRef = useRef(null);

  return (
    <>
      <DeleteClassAlert retrieveUserData={props.retrieveUserData} deletionId={props.selectedClass.id} ref={deleteAlertRef}></DeleteClassAlert>
      <Box borderRadius="10px" sx={{overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", width: "100%"}}>
        <Typography sx={{fontSize: props.smallVariant ? "17px" : "20px", fontWeight: "500"}}>
          {props.selectedClass.classname}
        </Typography>

        <Typography  sx={{fontSize: props.smallVariant ? "13px" : "18px"}}>
          {convertTo12HourFormat(props.selectedClass.starttime)} -
        </Typography>
        <Typography sx={{fontSize: props.smallVariant ? "13px" : "18px"}}>
          {convertTo12HourFormat(props.selectedClass.endtime)}
        </Typography>
      </Box>
    </>
  );
}

export default ClassInWeek;