import { useEffect, useState } from "react";
import DashNavbar from "../components/DashNavbar"
import { getSession } from "../utils/Routing";
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [csrf, setCsrf] = useState("");

  const navigate = useNavigate();
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

  return(
    <>
      <DashNavbar></DashNavbar>
    </>
  )
}

export default Dashboard;