import { validationResult } from "express-validator";
import { newClubMember } from "../db/clubQueries.js";

function clubGet(req, res) {
  if (!req.user) {
    res.redirect("/");
  } else {
    res.render("club", {
      message: "",
    });
  }
}

async function clubPost(req, res) {
  const { id } = req.user;
  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(400).render("club", {
      message: result.array()[0].msg
    });
  } else {
    await newClubMember(id);
    res.redirect("/");
  }
}

export { clubGet, clubPost }