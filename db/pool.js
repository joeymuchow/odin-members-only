import { Pool } from "pg";
import process from "node:process";

export default new Pool({
  host: process.env.host,
  user: process.env.user,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port
});
