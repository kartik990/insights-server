import express from "express";
import chatController from "../controllers/chatController";

const chatRouter = express.Router();

chatRouter.post("/", chatController.createChatRoom);

chatRouter.get("/conversation/:id", chatController.getOldMessages);

chatRouter.get("/:id", chatController.getChatRooms);

export default chatRouter;
