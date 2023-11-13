import sql from "./sql";

const tables = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id varchar(255) UNIQUE PRIMARY KEY,
      name varchar(255) NOT NULL
    );
  `
  await sql`
    CREATE TABLE IF NOT EXISTS classes (
      id SERIAL PRIMARY KEY,
      userid varchar(255) NOT NULL,
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

export const initTables = async () => {
  await tables();
}