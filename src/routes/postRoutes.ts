import express from "express";
import postController from "../controllers/postController";

const postRouter = express.Router();

postRouter.get("/", postController.getPosts);

postRouter.get("/:id", postController.getPostById);

postRouter.get("/:id/comment/", postController.getComments);

postRouter.put("/interaction", postController.postInteraction);

postRouter.post("/comment", postController.addComment);

postRouter.put("/:id", postController.updatePost);

postRouter.post("/", postController.createPost);

export default postRouter;
