import { newMessage } from "../db/messageQueries.js";

function newMessageGet(req, res) {
  res.render("newMessage", {
    url: "/new-message",
  });
}

async function newMessagePost(req, res) {
  const { title, message } = req.body;
  const { id } = req.user;

  const timestamp = new Date();
  await newMessage(title, message, timestamp, id);
  res.redirect("/");
}

export { newMessageGet, newMessagePost }