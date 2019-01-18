import io from "socket.io-client";

class Socket {
  bot: SocketIOClient.Socket;

  constructor() {
    this.bot = io.connect(process.env.BOT_SOCKET);
  }
}

export default new Socket();