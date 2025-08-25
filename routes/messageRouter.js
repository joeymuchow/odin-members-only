import { Router } from "express";
import { newMessageGet, newMessagePost } from "../controllers/messageController.js";

const messageRouter = Router();

messageRouter.get("/", newMessageGet);
messageRouter.post("/", newMessagePost);

export default messageRouter;