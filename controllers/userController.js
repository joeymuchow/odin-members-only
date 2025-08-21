import {
  createUser
} from "../db/userQueries.js";

function newUserGet(req, res) {
  res.render("signUp", {
    url: "/sign-up",
  });
}

async function newUserPost(req, res) {
  // hash password before sending to DB
  // await createUser();
  res.redirect("/");
}


export {
  newUserGet,
  newUserPost,
}