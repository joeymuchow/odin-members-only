import pool from "./pool.js";

async function createUser(firstName, lastName, username, password) {
  // member and admin default to false
  await pool.query(
    "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
    [firstName, lastName, username, password]
  );
}

async function findUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows;
}

async function findUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows;
}

async function findUsersFromIds(ids) {
  if (!ids.length) return [];
  const placeholders = ids.map((_, i) => `$${i + 1}`).join(', ');
  const { rows } = await pool.query(`SELECT * FROM users WHERE id IN (${placeholders})`, ids);
  return rows;
}

export { createUser, findUsername, findUserById, findUsersFromIds };
