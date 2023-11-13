// TS methods that utilize sql queries to my ElephantSQL database 
// to provide easy access to database manipulations/operations.
import sql from "./sql"

// Interfaces for use when accessing these methods for their paramters
export interface User {
  id: string,
  name: string
}

export interface Class {
  userid: string,
  startTime: number,
  endTime: number,
  creditHours: number,
  lectureHall: string
}

export interface savedClass {

}

export const getAllUsers = async () => {
  try {
    const users = await sql`
      SELECT * from users;
    `
    return users;
  } catch (error) {
    console.error(error);
    return null;
  }

};

export const findUserById = async (id: string) => {
  try {
    const user = await sql`
      SELECT * FROM users
      WHERE ${id} = users.id;
   `
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }

}

export const addUser = async (user: User) => {
  try {
    await sql`
      INSERT INTO users
      VALUES (${user.id}, ${user.name});
    `
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }

}

export const addClass = async (newClass: Class) => {
  try {
    const classid = await sql`
      INSERT INTO classes(userid, startTime, endTime, creditHours, lectureHall)
      VALUES (${newClass.userid}, ${newClass.startTime}, ${newClass.endTime}, ${newClass.creditHours}, ${newClass.lectureHall})
      RETURNING id;
    `
    await sql`
      INSERT INTO userCurrentClasses(userid, classid)
      VALUES (${newClass.userid}, ${classid[0].id});
    `
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
}