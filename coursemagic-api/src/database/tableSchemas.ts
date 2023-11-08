import sql from "./sql";

const tables = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id varchar(255) UNIQUE PRIMARY KEY,
      name varchar(255) NOT NULL
    );
  `
}

export const initTables = async () => {
  await tables();
}