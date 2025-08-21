import pool from "./pool.js";

async function createUser(firstName, lastName, username, password) {
  // member and admin default to false
  await pool.query("INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)", [firstName, lastName, username, password]);
}




export {
  createUser,
}