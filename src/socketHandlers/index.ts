import { Socket } from "socket.io";
import UserManager from "../lib/UserManager";
import socketEvents from "../constants/socketEvents";
import { chatHandler } from "./chat";

export const userManager = new UserManager();

const socketHandler = (socket: Socket) => {
  console.log("User connected with socket Id => ", socket.id);

  socket.on(socketEvents.USER_DETAILS, (data: { email: string }) => {
    userManager.addUserToOnline(data.email, socket.id);
  });

  socket.on(socketEvents.CHAT_MESSAGE, chatHandler);

  socket.on("disconnect", () => {
    userManager.offlineUser(socket.id);
    console.log("user disconnected :", socket.id);
  });
};

export default socketHandler;
