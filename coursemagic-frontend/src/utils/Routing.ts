import axios from "axios";

const backendUrl = "http://localhost:3000"

interface ErrorResponse {
  response?: {
    data: {
      error: string;
    };
    status: number;
    headers: unknown;
  };
  request?: unknown;
  message?: string;
}


const handleError = (error: ErrorResponse) => {
  if (error.response) {
    const errorMsg: string = error.response.data.error;
    return errorMsg;
  }
  return 'No connection to server.';
};

export const getSession = async () => {
  try {
    const session = await axios.get(`${backendUrl}/api/getSession`, {withCredentials: true});
    return session.data.csrf;
  } catch (error) {
    return false;
  }
}

export const logout = async () => {
  try {
    await axios.post(`${backendUrl}/api/logout`,{}, {withCredentials: true});
    return true;
  } catch (error) {
    return false;
  }
}