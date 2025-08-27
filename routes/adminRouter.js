import { Router } from "express";
import { body } from "express-validator";
import { adminGet, adminPost } from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.get("/", adminGet);
adminRouter.post(
  "/",
  body("adminPassword")
    .equals("The name's Admin, New Admin.")
    .withMessage("Admin application denied."),
  adminPost
);

export default adminRouter;
