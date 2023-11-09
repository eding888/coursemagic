import sql from "./sql";

const tables = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id varchar(255) UNIQUE PRIMARY KEY,
      name varchar(255) NOT NULL
    );

    ${/* Connects userids to certain classids which represent as users currently selected classes n*/""}
    CREATE TABLE IF NOT EXISTS userCurrentClasses (
      id SERIAL PRIMARY KEY,
      userid varchar(255) NOT NULL,
      classid varchar(255) NOT NULL,
      FOREIGN KEY (userid) REFERENCES users(id),
      FOREIGN KEY (classid) REFERENCES classes(id)
    );

    ${/* ID of this collectionSavedClasses is how you get the savedClasses that are from a collection n*/""}
    CREATE TABLE IF NOT EXISTS collectionSavedClasses (
      id SERIAL PRIMARY KEY,
      userid varchar(255) NOT NULL,
      FOREIGN KEY (userid) REFERENCES users(id),
    );
    
    ${/* Individual classes saved in some collection. Includes reference to this collection*/""}
    CREATE TABLE IF NOT EXISTS savedClasses (
      id SERIAL PRIMARY KEY,
      collectionid varchar(255) NOT NULL,
      classid varchar(255) NOT NULL,
      FOREIGN KEY (collectionid) REFERENCES collectionSavedClasses(id),
      FOREIGN KEY (classid) REFERENCES classes(id)
    );

    CREATE TABLE IF NOT EXISTS classes (
      id SERIAL PRIMARY KEY,
      userid varchar(255) NOT NULL,
      FOREIGN KEY (userid) REFERENCES users(id)
    );
  `
}

export const initTables = async () => {
  await tables();
}