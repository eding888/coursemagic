// TS methods that utilize sql queries to my ElephantSQL database 
// to provide easy access to database manipulations/operations.
import sql from "./sql"
export const getAllUsers = async () => {
  const users = await sql`
    SELECT * from users;
  `
  return users;
};