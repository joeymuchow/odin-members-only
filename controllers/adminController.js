import { validationResult } from "express-validator";
import { newAdmin } from "../db/adminQueries.js";

function adminGet(req, res) {
  if (!req.user) {
    res.redirect("/");
  } else {
    res.render("admin", {
      message: "",
    });
  }
}

async function adminPost(req, res) {
  const { id } = req.user;
  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(400).render("admin", {
      message: result.array()[0].msg,
    });
  } else {
    await newAdmin(id);
    res.redirect("/");
  }
}

export { adminGet, adminPost };
