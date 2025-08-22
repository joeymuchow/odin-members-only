import { validationResult } from "express-validator";

function clubGet(req, res) {
  res.render("club", {
    message: "",
  });
}

function clubPost(req, res) {
  const { clubPassword } = req.body;
  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(400).render("club", {
      message: result.array()[0].msg
    });
  } else {
    // call to make user a club member
  }
}

export { clubGet, clubPost }