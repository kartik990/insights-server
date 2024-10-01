import { Socket } from "socket.io";
import socketEvents from "../constants/socketEvents";
import { chatHandler } from "./chat";
import userManager from "../lib/UserManager";
import { io } from "..";

const socketHandler = (socket: Socket) => {
  console.log("User connected with socket Id => ", socket.id);
  socket.join(socket.id);

  socket.on(socketEvents.USER_DETAILS, (data: { email: string }) => {
    userManager.addUserToOnline(data.email, socket.id);
    io.emit(socketEvents.UPDATE_ONLINE_USERS, { added: data.email });
  });

  socket.on(socketEvents.ONLINE_USERS, () => {
    io.to(socket.id).emit(
      socketEvents.ONLINE_USERS,
      userManager.getOnlineUsers()
    );
  });

  socket.on(socketEvents.CHAT_MESSAGE, chatHandler);

  socket.on(socketEvents.CALL, (data) => {
    const { to, ...callDetails } = data;
    const socketId = userManager.emailToSocket[to];
    io.to(socketId).emit(socketEvents.CALL_NOTIFICATION, callDetails);
  });

  socket?.on(
    socketEvents.CALL_ACCEPTED,
    (data: { to: string; answer: any }) => {
      const socketId = userManager.emailToSocket[data.to];
      io.to(socketId).emit(socketEvents.CALL_READY, { answer: data.answer });
    }
  );

  socket.on(socketEvents.CALL_REJECTED, (data) => {
    io.to(userManager.emailToSocket[data.email]).emit(
      socketEvents.CALL_REJECTED
    );
  });

  socket.on("disconnect", () => {
    io.emit(socketEvents.UPDATE_ONLINE_USERS, {
      remove: userManager.socketToEmail[socket.id],
    });

    userManager.offlineUser(socket.id);
    console.log("user disconnected :", socket.id);
  });
};

export default socketHandler;
