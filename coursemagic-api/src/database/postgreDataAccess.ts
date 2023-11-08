// TS methods that utilize sql queries to my ElephantSQL database 
// to provide easy access to database manipulations/operations.
import sql from "./sql"

interface User {
  id: string,
  name: string
}

export const getAllUsers = async () => {
  const users = await sql`
    SELECT * from users;
  `
  return users;
};

export const findUserById = async (id: string) => {
  const user = await sql`
    SELECT * FROM users
    WHERE ${id} = users.id;
  `
  return user;
}

export const addUser = async (user: User) => {
  await sql`
    INSERT INTO users
    VALUES (${user.id}, ${user.name});
  `
}