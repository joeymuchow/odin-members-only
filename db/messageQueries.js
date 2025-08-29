import pool from "./pool.js";

async function newMessage(title, message, timestamp, userId) {
  await pool.query("INSERT INTO messages (title, message, timestamp, user_id) VALUES ($1, $2, $3, $4)", [title, message, timestamp, userId]);
}

async function getMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

export { newMessage, getMessages }