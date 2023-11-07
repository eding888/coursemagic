import postgres, { Sql } from "postgres";
let url = Bun.env.POSTGRES_URL;
if(!url) {
  url = "";
}

const sql: Sql = postgres(url);
console.log('hiii');
export default sql;
