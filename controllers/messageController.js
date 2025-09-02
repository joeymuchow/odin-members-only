import { deleteMessage, newMessage } from "../db/messageQueries.js";

function newMessageGet(req, res) {
  res.render("newMessage", {
    url: "/message/new",
    error: ""
  });
}

async function newMessagePost(req, res) {
  const { title, message } = req.body;
  const { id } = req.user;

  const timestamp = new Date();
  const result = await newMessage(title, message, timestamp, id);
  if (result && result.error) {
    res.render("newMessage", {
      url: "/message/new",
      error: "Title or message was too long, please type fewer characters."
    });
  } else {
    res.redirect("/");
  }
}

async function deleteMessageGet(req, res) {
  const { id } = req.params;

  await deleteMessage(id);
  res.redirect("/");
}

export { newMessageGet, newMessagePost, deleteMessageGet }