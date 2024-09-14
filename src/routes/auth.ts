import express from "express";
import authController from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/login", authController.login);

authRouter.post("/signup", authController.signUp);

authRouter.post("/logout", authController.logout);

export default authRouter;
