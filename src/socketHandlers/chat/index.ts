import { io } from "../..";
import socketEvents from "../../constants/socketEvents";
import userManager from "../../lib/UserManager";
import { storeMessage } from "../../services/chat/storeMessage";

export const chatHandler = async (data: {
  fromEmail: string;
  toEmail: string;
  message: string;
}) => {
  const { fromEmail, toEmail, message } = data;
  const socketId = userManager.emailToSocket[data.toEmail];
  const socketId2 = userManager.emailToSocket[data.fromEmail];

  io.to(socketId).to(socketId2).emit(socketEvents.CHAT_MESSAGE, {
    message,
    fromEmail,
  });

  await storeMessage(fromEmail, toEmail, message);
};
