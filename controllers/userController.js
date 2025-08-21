import {
  createUser
} from "../db/userQueries.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

function newUserGet(req, res) {
  res.render("signUp", {
    url: "/sign-up",
    firstName: "",
    lastName: "",
    username: "",
    errors: null,
  });
}

async function newUserPost(req, res, next) {
  const { firstName, lastName, username, password } = req.body;
  const result = validationResult(req);
  
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
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await createUser(firstName, lastName, username, hashedPassword);
      res.redirect("/");
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  
}


export {
  newUserGet,
  newUserPost,
}