import { userManager } from "..";
import { io } from "../..";
import socketEvents from "../../constants/socketEvents";
import getPrismaClient from "../../services/getPrismaClient";

const prisma = getPrismaClient();

export const chatHandler = async (data: {
  formEmail: string;
  toEmail: string;
  message: string;
}) => {
  console.log(data);
  const socketId = userManager.emailToSocket[data.toEmail];
  const socketId2 = userManager.emailToSocket[data.formEmail];

  io.to(socketId).to(socketId2).emit(socketEvents.CHAT_MESSAGE, {
    message: data.message,
    fromEmail: data.formEmail,
  });
};

export const createChatRoomHandler = async (data: {
  formEmail: string;
  toEmail: string;
  message: string;
}) => {
  console.log(data);
  const socketId = userManager.emailToSocket[data.toEmail];
  const socketId2 = userManager.emailToSocket[data.formEmail];

  io.to(socketId).to(socketId2).emit(socketEvents.CHAT_MESSAGE, {
    message: data.message,
    fromEmail: data.formEmail,
  });
};
