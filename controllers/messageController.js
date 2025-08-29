import { deleteMessage, newMessage } from "../db/messageQueries.js";

function newMessageGet(req, res) {
  res.render("newMessage", {
    url: "/message/new",
  });
}

async function newMessagePost(req, res) {
  const { title, message } = req.body;
  const { id } = req.user;

  const timestamp = new Date();
  await newMessage(title, message, timestamp, id);
  res.redirect("/");
}

async function deleteMessageGet(req, res) {
  const { id } = req.params;

  await deleteMessage(id);
  res.redirect("/");
}

export { newMessageGet, newMessagePost, deleteMessageGet }