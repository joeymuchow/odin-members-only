import {
  createUser
} from "../db/userQueries.js";
import { validationResult } from "express-validator";

function newUserGet(req, res) {
  res.render("signUp", {
    url: "/sign-up",
    firstName: "",
    lastName: "",
    username: "",
    errors: null,
  });
}

async function newUserPost(req, res) {
  const { firstName, lastName, username } = req.body;
  const result = validationResult(req);
  console.log(result.array());
  if (!result.isEmpty()) {
    const formattedErrors = {};

    for (const error of result.array()) {
      formattedErrors[error.path] = error.msg;
    }

    res.status(400).render("signUp", {
      url: "/sign-up",
      firstName: firstName,
      lastName: lastName,
      username: username,
      errors: formattedErrors,
    });
  } else {
    // hash password before sending to DB
    // await createUser();
    res.redirect("/");
  }
  
}


export {
  newUserGet,
  newUserPost,
}