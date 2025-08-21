import { Router } from "express";
import { newUserGet, newUserPost } from "../controllers/userController.js";
import { body } from "express-validator";

const userRouter = Router();

userRouter.get("/", newUserGet);
userRouter.post(
  "/",
  body("username").custom(async (value) => {
    const existingUsername = true; // TODO: find username
    if (existingUsername) {
      throw new Error("This username is unavailable.");
    }
    return true;
  }),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),
  newUserPost
);

export default userRouter;
