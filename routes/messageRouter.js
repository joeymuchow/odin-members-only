import { Router } from "express";
import { newMessageGet, newMessagePost, deleteMessageGet } from "../controllers/messageController.js";

const messageRouter = Router();

messageRouter.get("/new", newMessageGet);
messageRouter.post("/new", newMessagePost);
messageRouter.get("/:id/delete", (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    res.redirect("/");
  }
}, deleteMessageGet);

export default messageRouter;