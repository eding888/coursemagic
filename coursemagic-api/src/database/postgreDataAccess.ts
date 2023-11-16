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

///////////////////////////////////

/**
 * Returns all users in table
 * @returns Array of users
 */
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

/**
 * Returns user at specific id
 * @param id user's id
 * @returns User at id
 */
export const findUserById = async (id: string) => {
  try {
    const user = await sql`
      SELECT * FROM users
      WHERE ${id} = users.id;
   `
    return user[0];
  } catch (error) {
    console.error(error);
    return null;
  }

}

/**
 * Adds user to table
 * @param user object of User type to be added
 * @returns added user's id
 */
export const addUser = async (user: User) => {
  try {
    const userid = await sql`
      INSERT INTO users
      VALUES (${user.id}, ${user.name})
      RETURNING id;
    `
    return userid[0];
  } catch (error) {
    console.error(error);
    return null;
  }

}

/**
 * Adds class to table
 * @param newClass object of Class type to be added
 * @returns added classes' id
 */
export const addClass = async (newClass: Class) => {
  try {
    const classid = await sql`
      INSERT INTO classes(userid, startTime, endTime, creditHours, lectureHall)
      VALUES (${newClass.userid}, ${newClass.startTime}, ${newClass.endTime}, ${newClass.creditHours}, ${newClass.lectureHall})
      RETURNING id;
    `
    return classid[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Removes class from table
 * @param classid id of class to be removed
 * @returns true for successful removal
 */

export const removeClass = async (classid: number) => {
  try {
    await sql`
        DELETE FROM classes WHERE id=${classid};
    `;
    await sql`
        DELETE FROM userCurrentClasses WHERE id = ${classid};
    `;
    await sql`
        DELETE FROM savedClassses WHERE id = ${classid};
    `;
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }

};

export const addClassToUserCurrent = async (classid: number, uesrid: number) => {

}
