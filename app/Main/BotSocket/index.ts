import io from "socket.io-client";
import Logger from "../Logger";

class BotSocket {
  connection: SocketIOClient.Socket;
  socket: SocketIOClient.Socket;

  constructor() {
    Logger.info("Class BotSocket init");
    this.connection = io.connect(process.env.BOT_SOCKET);
    this.connection.on("connection", (socket: any) => {
      this.socket = socket;
    });
  }

  public emit(event: string, data: any) {
    this.socket.emit(event, data);
  }
}

export default new BotSocket();
