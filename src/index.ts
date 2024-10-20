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
import chatRouter from "./routes/chatRoutes";

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
    // credentials: true,
  })
);

app.use("/api/auth", authRouter);

app.use("/api/user", userRouter);

app.use("/api/chat-room", chatRouter);

app.use("/api/post", postRouter);

app.get("/heath-check", (_, res) => {
  console.log("health check");
  res.send({ message: "alive and fine", timeStamp: new Date().getTime() });
});

io.on("connection", socketHandler);

httpServer.listen(process.env.PORT, () => {
  console.log("------Server listening on port :8000---------");
});
