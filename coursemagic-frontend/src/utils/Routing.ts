import axios from "axios";
import store from '../redux/store';
import { setCsrf } from '../redux/sessionSlice';

// All methods used to interact with backend via axios.

const backendUrl = "http://localhost:3000"

// Gets session, saves it to redux store.
export const getSession = async () => {
  try {
    const session = await axios.get(`${backendUrl}/api/getSession`, {withCredentials: true});
    store.dispatch(setCsrf(session.data.csrf));
    return true;
  } catch (error) {
    try {
      await axios.post(`${backendUrl}/api/refresh`, {}, {withCredentials: true});
    } catch (error) {
      return false;
    }
    try {
      const session = await axios.get(`${backendUrl}/api/getSession`, {withCredentials: true});
      store.dispatch(setCsrf(session.data.csrf));
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Logs user out
export const logout = async () => {
  try {
    await axios.post(`${backendUrl}/api/logout`,{}, {withCredentials: true});
    return true;
  } catch (error) {
    return false;
  }
}

// Adds class to user class list
export const addClass= async (className: string, lectureHall: string, creditHours: number, startTime: number, endTime: number) => {
  try {
    await axios.post(`${backendUrl}/api/addUserClass`, {className, lectureHall, creditHours, startTime, endTime}, { headers: { 'x-csrf-token': store.getState().session.csrf}, withCredentials: true});
    return true;
  } catch (error) {
    try {
      await axios.post(`${backendUrl}/api/refresh`, {}, {withCredentials: true});
    } catch (error) {
      return false;
    }
    try {
      await axios.post(`${backendUrl}/api/addUserClass`, {className, lectureHall, creditHours, startTime, endTime}, { headers: { 'x-csrf-token': store.getState().session.csrf}, withCredentials: true});
      return true;
    } catch (error) {
      return false;
    }
  }
}