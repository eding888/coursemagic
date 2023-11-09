import sql from "./sql";

const tables = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id INT UNIQUE PRIMARY KEY,
      name varchar(255) NOT NULL
    );
  `
  await sql`
    CREATE TABLE IF NOT EXISTS classes (
      id SERIAL PRIMARY KEY,
      userid INT NOT NULL,
      FOREIGN KEY (userid) REFERENCES users(id)
    );
  `
  /* Connects userids to certain classids which represent as users currently selected classes n*/
  await sql`
    CREATE TABLE IF NOT EXISTS userCurrentClasses (
      id SERIAL PRIMARY KEY,
      userid INT NOT NULL,
      classid INT NOT NULL,
      FOREIGN KEY (userid) REFERENCES users(id),
      FOREIGN KEY (classid) REFERENCES classes(id)
    );
  `
  /* Individual classes saved in some collection. Includes reference to this collection*/
  await sql`
    CREATE TABLE IF NOT EXISTS savedClasses (
      id SERIAL PRIMARY KEY,
      userid INT NOT NULL,
      collectionName varchar(255) NOT NULL,
      classid INT NOT NULL,
      UNIQUE(userid, classid, collectionName),
      FOREIGN KEY (classid) REFERENCES classes(id),
      FOREIGN KEY (userid) REFERENCES users(id)
    );
  `
}

export const initTables = async () => {
  await tables();
}