import { Router } from "express";
import { body } from "express-validator";
import { clubGet, clubPost } from "../controllers/clubController.js";

const clubRouter = Router();

clubRouter.get("/", clubGet);
clubRouter.post(
  "/",
  body("clubPassword").equals("Get outta my way!").withMessage("Sorry, better luck next time."),
  clubPost
);

export default clubRouter;