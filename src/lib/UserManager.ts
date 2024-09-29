import { Socket } from "socket.io";

class UserManager {
  private static instance: UserManager;

  onlineUsers: string[];
  busyUsers: string[];
  emailToSocket: { [key: string]: string };
  socketToEmail: { [key: string]: string };

  private constructor() {
    this.onlineUsers = [];
    this.busyUsers = [];
    this.emailToSocket = {};
    this.socketToEmail = {};
  }

  static getInstance() {
    if (UserManager.instance) {
      return UserManager.instance;
    }

    const userManager = new UserManager();
    UserManager.instance = userManager;

    return userManager;
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

    return true;
  }
}

const userManager = UserManager.getInstance();

export default userManager;
