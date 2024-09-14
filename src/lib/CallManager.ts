class CallManager {
  rooms: { roomId: string; email1: string; email2: string }[];

  constructor() {
    this.rooms = [];
  }

  createCallRoom(email1: string, email2: string) {
    const uniqueId = crypto.randomUUID();
    this.rooms.push({
      roomId: uniqueId,
      email1,
      email2,
    });
  }
}

export default CallManager;
