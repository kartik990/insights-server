import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
import socketHandler from "./socketHandlers";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth";

dotenv.config();

const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);

app.use("/api/user", userRouter);

app.use("/api/post", postRouter);

io.on("connection", socketHandler);

httpServer.listen(8000, () => {
  console.log("------Server listening on port :8000---------");
});