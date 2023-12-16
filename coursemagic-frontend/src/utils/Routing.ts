import axios from "axios";

const backendUrl = "http://localhost:3000"

export const googleLogin = async () => {
  await axios.get(`${backendUrl}/auth/google`, {withCredentials: true});
}