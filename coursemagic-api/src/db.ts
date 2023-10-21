import { Database } from "bun:sqlite";

const db = new Database("mydb.sqlite");

const retrieve = () => {
  const query = db.query("select 'Hello world' as message;");
  return query.get();
}

export default retrieve;