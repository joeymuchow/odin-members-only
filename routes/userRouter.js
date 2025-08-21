import { Router } from "express";
import { newUserGet, newUserPost } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", newUserGet);
userRouter.post("/", newUserPost); // submitted sign up form

export default userRouter;