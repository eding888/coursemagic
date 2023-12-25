import sql from "./sql";

const tables = async () => {
  // id for users is a string instead of a number. this is a pain in the ass but im gangsta
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id varchar(255) UNIQUE PRIMARY KEY,
      name varchar(255) NOT NULL,
      refreshToken varchar(255) NOT NULL
    );
  `
  await sql`
    CREATE TABLE IF NOT EXISTS classes (
      id SERIAL PRIMARY KEY,
      userid varchar(255) NOT NULL,
      className varchar(255) NOT NULL,
      startTime INT NOT NULL,
      endTime INT NOT NULL,
      creditHours INT NOT NULL,
      lectureHall varchar(255),
      FOREIGN KEY (userid) REFERENCES users(id)
    );
  `
  /* Connects userids to certain classids which represent as users currently selected classes n*/
  await sql`
    CREATE TABLE IF NOT EXISTS userCurrentClasses (
      id SERIAL PRIMARY KEY,
      userid varchar(255) NOT NULL,
      classid INT NOT NULL,
      UNIQUE(userid, classid),
      FOREIGN KEY (userid) REFERENCES users(id),
      FOREIGN KEY (classid) REFERENCES classes(id)
    );
  `
  /* Individual classes saved in some collection. Includes reference to this collection name*/
  await sql`
    CREATE TABLE IF NOT EXISTS savedClasses (
      id SERIAL PRIMARY KEY,
      userid varchar(255) NOT NULL,
      collectionName varchar(255) NOT NULL,
      classid INT NOT NULL,
      UNIQUE(collectionName, classid),
      UNIQUE(userid, collectionName),
      FOREIGN KEY (classid) REFERENCES classes(id),
      FOREIGN KEY (userid) REFERENCES users(id)
    );
  `
}

export const clear= async () => {
  await sql`
    DROP TABLE savedClasses;
  `
  await sql`
    DROP TABLE userCurrentClasses
  `
  await sql`
    DROP TABLE classes;
  `
  await sql`
    DROP TABLE users;
  `;
}

/**
 * Initializes all tables for database
 */
export const initTables = async () => {
  await tables();
}

// DANGER, DELETES ALL DATA !
// BE VERY WEARY.

/**
 * Deletes all tables and reinitalizes them as empty
 * @param confirmation WARNING: CLEARS ALL USER DATA
 */
export const clearAndResetTables = async (confirmation: boolean) => {
  if(confirmation){
    await clear();
    await tables();
  }
}


