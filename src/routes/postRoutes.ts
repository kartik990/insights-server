import express from "express";
import postController from "../controllers/postController";

const postRouter = express.Router();

postRouter.get("/", postController.getPosts);
postRouter.get("/:id", postController.getPostById);

export default postRouter;
