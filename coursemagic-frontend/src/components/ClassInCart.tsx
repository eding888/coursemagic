import { Box } from '@mui/system';
import { Class } from '../../../coursemagic-api/src/database/postgreDataAccess'

interface ClassInCartProps {
  selectedClass: Class
}

function ClassInCart(props: ClassInCartProps) {
  console.log(props.selectedClass)
  return (
    <>
      <Box>

        {props.selectedClass.classname}
      </Box>
    </>
  );
}

export default ClassInCart;