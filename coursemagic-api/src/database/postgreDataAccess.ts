// TS methods that utilize sql queries to my ElephantSQL database
// to provide easy access to database manipulations/operations.

import sql from "./sql"

// Interfaces for use when accessing these methods for their paramters
export interface User {
  auth: string,
  id: string,
  name: string
}

export interface Class {
  classname: string,
  userid: string,
  id: number,
  starttime: number,
  endtime: number,
  daysofweek: string, // Days of week M-F correspond to a digit 1-5 listed in a string.
  credithours: number,
  lecturehall: string
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
export const getUserById = async (userid: string) => {
  try {
    const user = await sql`
      SELECT * FROM users
      WHERE ${userid} = users.id;
   `
    return user[0];
  } catch (error) {
    console.error(error);
    return null;
  }

}

/**
 * Returns class at specific id
 * @param classid class's id
 * @returns Class at id
 */
export const getClassById = async (classid: number) => {
  try {
    const foundclass = await sql`
      SELECT * FROM classes
      WHERE ${classid} = classes.id;
   `
    return foundclass[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Returns all of the classes owned by a user
 * @param userid id of user whose classes are retrieved
 * @returns Retrieved classes at userid
 */
export const getUserClasses = async (userid: string) => {
  try {
    const classes = await sql`
      SELECT * FROM classes
      WHERE ${userid} = classes.userid;
   `
    return classes;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Returns all of the classes that are currently a user's
 * @param userid id of uesr whose classes are retrieved
 * @returns Retrieved classes at userid
 */
export const getUserCurrentClasses = async (userid: string) => {
  try {
    const classes = await sql`
      SELECT * FROM classes
      INNER JOIN usercurrentclasses ON usercurrentclasses.classid = classes.id
      WHERE classes.userid = ${userid};
   `
    return classes;
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
export const addUser = async (userid: string, name: string) => {
  try {
    const id = await sql`
      INSERT INTO users
      VALUES(${userid}, ${name}, 'none')
      RETURNING id;
    `
    return userid[0];
  } catch (error) {
    console.error(error);
    return null;
  }

}

/**
 * Sets a user's refresh token
 * @param userid user's id
 * @param refresh desired refresh token
 * @returns true if update is successful, null if not
 */
export const setUserRefresh = async (userid: string, refresh: string) => {
  try {
    await sql`
      UPDATE users
      SET refreshToken = ${refresh}
      WHERE users.id = ${userid};
    `
    return true
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
export const addClassAsCurrent = async (newClass: Class) => {
  try {
    const classid = await sql`
      INSERT INTO classes(userid, startTime, endTime, creditHours, lectureHall)
      VALUES(${newClass.userid}, ${newClass.starttime}, ${newClass.endtime}, ${newClass.credithours}, ${newClass.lecturehall})
      RETURNING id;
    `
    await sql`
      INSERT INTO usercurrentclasses(userid, classid)
      VALUES(${newClass.userid}, ${classid[0].id})
    `
    return classid[0].id as number;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const addClass = async (newClass: Class) => {
  console.log(newClass)
  try {
    const classid = await sql`
      INSERT INTO classes(userid, className, startTime, endTime, daysofweek, creditHours, lectureHall)
      VALUES(${newClass.userid}, ${newClass.classname}, ${newClass.starttime}, ${newClass.endtime}, ${newClass.daysofweek}, ${newClass.credithours}, ${newClass.lecturehall})
      RETURNING id;
    `
    console.log(newClass);
    return classid[0].id as number;
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
        DELETE FROM userCurrentClasses
        WHERE usercurrentclasses.classid = ${classid};
    `;
    await sql`
        DELETE FROM savedClasses WHERE
        savedclasses.classid = ${classid};
    `;
    await sql`
        DELETE FROM classes
        WHERE classes.id=${classid};
    `;
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }

};

/**
 * Adds a class to a user's current lineup of clasess
 * @param classid id of class that is being added to user's lineup
 * @param userid id of user class is being added to
 * @returns id of currentClass that is added
 */
export const addClassToUserCurrent = async (classid: number, userid: string) => {
  try {
    const currentClassId = await sql`
      INSERT INTO usercurrentclasses(userid, classid)
      VALUES(${userid}, ${classid})
      RETURNING id;
    `
    return currentClassId[0].id as number;

  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Removes a class from the user's current roster of classes
 * @param classid id of the class to be removed
 * @returns true on successful deletion
 */
export const removeClassFromUserCurrent = async (classid: number) => {
  try {
    await sql`
      DELETE FROM usercurrentclasses
      WHERE usercurrentclasses.classid = ${classid};
    `
    return true;

  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Adds a user's current classes to a collection. Replaces any existing classes in the collection.
 * @param userid id of user this class collection is for
 * @param collectionName name of the collection that is being added to
 * @returns returns true upon successful save to collection
 */
export const saveCurrentClassesToCollection = async (userid: string, collectionName: string) => {
  try {
    await sql`
      DELETE FROM savedClasses
      WHERE (savedClasses.collectionName = ${collectionName} AND savedClasses.userid = ${userid});
    `
    await sql`
      INSERT INTO savedClasses(userid, collectionName, classid)
      SELECT ${userid}, ${collectionName}, classid FROM usercurrentclasses WHERE usercurrentclasses.userid = ${userid}
      ON CONFLICT DO NOTHING;
    `
    return true;

  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Loads classes from a users collection to user's current classes. Replaces everything currently in current.
 * @param userid User which collection is from
 * @param collectionName Collection name to retrieve from
 * @returns Returns true if the load is successful, or if there is just nothing to load
 */
export const loadSavedClassesToCurrent = async (userid: string, collectionName: string) => {
  try {
    const collection = await sql`
      SELECT * from savedClasses
      WHERE savedClasses.collectionName = ${collectionName};
    `
    if(collection.length > 0) {
      await sql`
        DELETE FROM usercurrentclasses
        WHERE usercurrentclasses.userid = ${userid};
      `

      await sql`
        INSERT INTO usercurrentclasses(userid, classid)
        SELECT userid, classid FROM savedClasses WHERE (savedClasses.collectionName = ${collectionName} AND savedClasses.userid = ${userid});
      `
    }
    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Deletes a user's collection of saved classes
 * @param userid User whose collection to delete
 * @param collectionName Collection name to delete
 * @returns true on successful deletion
 */
export const deleteCollection = async (userid: string, collectionName: string) => {
  try {
    await sql`
      DELETE FROM savedClasses
      WHERE savedClasses.collectionName = ${collectionName} AND savedClasses.userid = ${userid};
    `
    return true;

  } catch (error) {
    console.error(error);
    return null;
  }
}