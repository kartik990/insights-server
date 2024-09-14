import { Socket } from "socket.io";

class UserManager {
  onlineUsers: string[];
  busyUsers: string[];
  emailToSocket: { [key: string]: string };
  socketToEmail: { [key: string]: string };

  constructor() {
    this.onlineUsers = [];
    this.busyUsers = [];
    this.emailToSocket = {};
    this.socketToEmail = {};
  }

  getOnlineUsers() {
    return this.onlineUsers;
  }

  isUserOnline(email: string) {
    return this.onlineUsers.includes(email);
  }

  isUserBusy(email: string) {
    return this.busyUsers.includes(email);
  }

  addUserToOnline(email: string, socketId: Socket["id"]) {
    this.onlineUsers.push(email);
    this.emailToSocket[email] = socketId;
    this.socketToEmail[socketId] = email;
    return true;
  }

  offlineUser(socketId: Socket["id"]) {
    const email = this.socketToEmail[socketId];
    delete this.emailToSocket[email];
    delete this.socketToEmail[socketId];
    this.onlineUsers = this.onlineUsers.filter((e) => e != email);

    console.log(this.onlineUsers);
    console.log(this.emailToSocket);
    console.log(this.socketToEmail);

    return true;
  }
}

export default UserManager;
