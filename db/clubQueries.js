import pool from "./pool.js";

async function newClubMember(id) {
  await pool.query("UPDATE users SET member = true WHERE id = $1", [id]);
}

export { newClubMember };