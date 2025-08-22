import { Router } from "express";
import { body } from "express-validator";
import { clubGet, clubPost } from "../controllers/clubController";

const clubRouter = Router();

clubRouter.get("/", clubGet);
clubRouter.post(
  "/",
  body("clubPassword").equals("Go Beavs").withMessage("Sorry, better luck next time."),
  clubPost
);

export default clubRouter;