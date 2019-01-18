import io from "socket.io-client";
import Logger from "../Logger";

class BotSocket {
  connection: SocketIOClient.Socket;

  constructor() {
    Logger.info("Class BotSocket init");
    this.connection = io.connect(process.env.BOT_SOCKET);
  }

  public emit(event: string, data: any) {
    this.connection.emit(event, data);
  }
}

export default new BotSocket();
