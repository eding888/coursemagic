// TS methods that utilize sql queries to my ElephantSQL database 
// to provide easy access to database manipulations/operations.
import sql from "./sql"

interface User {
  id: string,
  name: string
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