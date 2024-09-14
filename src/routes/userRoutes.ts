import express from "express";
import userController from "./../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", userController.getUsers);

userRouter.get("/:id", userController.getUserByID);

userRouter.post("/", userController.createUser);

userRouter.put("/:id", userController.updateUser);

userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
