//Create sql helper method to access elephantSQL database using postgres node module
import postgres, { Sql } from "postgres";
let url = Bun.env.POSTGRES_URL;
if(!url) {
  url = "";
}

const sql: Sql = postgres(url);
export default sql;
