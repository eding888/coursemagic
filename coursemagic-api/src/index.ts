import express from 'express';
import sql from './sql';
require('./googleStrategy');

//ROUTER IMPORTS
import googleAuthRouter from './googleAuthRouter';

const app = express();

app.use(googleAuthRouter);

const port = Bun.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const newTable = async () => {
  await sql`
  CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    username varchar(50) UNIQUE NOT NULL,
    email varchar(100) UNIQUE NOT NULL,
    created_at timestamp default current_timestamp
  );`
}

newTable();


console.log("done");
