import axios from "axios";
import store from '../redux/store';
import { setCsrf } from '../redux/sessionSlice';
import { Class } from '../../../coursemagic-api/src/database/postgreDataAccess'

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
export const addClass= async (addedClass: Class) => {
  console.log(addedClass);
  try {
    await axios.post(`${backendUrl}/api/addUserClass`, {classname: addedClass.classname, daysofweek: addedClass.daysofweek, lecturehall: addedClass.lecturehall, credithours: addedClass.credithours, starttime: addedClass.starttime, endtime: addedClass.endtime}, { headers: { 'x-csrf-token': store.getState().session.csrf}, withCredentials: true});
    return true;
  } catch (error) {
    try {
      await axios.post(`${backendUrl}/api/refresh`, {}, {withCredentials: true});
    } catch (error) {
      return false;
    }
    try {
      await axios.post(`${backendUrl}/api/addUserClass`, {classname: addedClass.classname, daysofweek: addedClass.daysofweek, lecturehall: addedClass.lecturehall, credithours: addedClass.credithours, starttime: addedClass.starttime, endtime: addedClass.endtime}, { headers: { 'x-csrf-token': store.getState().session.csrf}, withCredentials: true});
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Adds class to user current classes
export const addClassToCurrent= async (classid: number) => {
  try {
    await axios.post(`${backendUrl}/api/addClassToCurrent/`, {classid}, { headers: { 'x-csrf-token': store.getState().session.csrf}, withCredentials: true});
    return true;
  } catch (error) {
    try {
      await axios.post(`${backendUrl}/api/refresh`, {}, {withCredentials: true});
    } catch (error) {
      return false;
    }
    try {
      await axios.post(`${backendUrl}/api/addClassToCurrent/`, {classid}, { headers: { 'x-csrf-token': store.getState().session.csrf}, withCredentials: true});
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Removes class from user's current classes
export const removeClassFromCurrent = async (classid: number) => {
  try {
    await axios.delete(`${backendUrl}/api/removeFromCurrent/${classid}`, { headers: { 'x-csrf-token': store.getState().session.csrf}, withCredentials: true});
    return true;
  } catch (error) {
    try {
      await axios.post(`${backendUrl}/api/refresh`, {}, {withCredentials: true});
    } catch (error) {
      return false;
    }
    try {
      await axios.delete(`${backendUrl}/api/removeFromCurrent/${classid}`, { headers: { 'x-csrf-token': store.getState().session.csrf}, withCredentials: true});
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Deletes class
export const deleteClass= async (classid: number) => {
  try {
    await axios.delete(`${backendUrl}/api/removeClass/${classid}`, { headers: { 'x-csrf-token': store.getState().session.csrf}, withCredentials: true});
    return true;
  } catch (error) {
    try {
      await axios.post(`${backendUrl}/api/refresh`, {}, {withCredentials: true});
    } catch (error) {
      return false;
    }
    try {
      await axios.delete(`${backendUrl}/api/removeClass/${classid}`, { headers: { 'x-csrf-token': store.getState().session.csrf}, withCredentials: true});
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Gets all user classes
export const getUserClasses = async () => {
  try {
    const classes = await axios.get(`${backendUrl}/api/userAllClasses`, { headers: { 'x-csrf-token': store.getState().session.csrf}, withCredentials: true});
    return classes.data;
  } catch (error) {
    try {
      await axios.post(`${backendUrl}/api/refresh`, {}, {withCredentials: true});
    } catch (error) {
      return false;
    }
    try {
      const classes = await axios.get(`${backendUrl}/api/userAllClasses`, { headers: { 'x-csrf-token': store.getState().session.csrf}, withCredentials: true});
      return classes.data;
    } catch (error) {
      return false;
    }
  }
  return false;
}

// Get user current classes
export const getUserCurrentClasses = async () => {
  try {
    const classes = await axios.get(`${backendUrl}/api/userCurrentClasses`, { headers: { 'x-csrf-token': store.getState().session.csrf}, withCredentials: true});
    return classes.data;
  } catch (error) {
    try {
      await axios.post(`${backendUrl}/api/refresh`, {}, {withCredentials: true});
    } catch (error) {
      return false;
    }
    try {
      const classes = await axios.get(`${backendUrl}/api/userCurrentClasses`, { headers: { 'x-csrf-token': store.getState().session.csrf}, withCredentials: true});
      return classes.data;
    } catch (error) {
      return false;
    }
  }
  return false;
}