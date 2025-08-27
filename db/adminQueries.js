import pool from "./pool.js";

async function newAdmin(id) {
  await pool.query("UPDATE users SET admin = true WHERE id = $1", [id]);
}

export { newAdmin };
