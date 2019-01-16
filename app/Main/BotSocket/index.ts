import io from "socket.io-client";

export default class BotSocket {
  connection: SocketIOClient.Socket;

  constructor() {
    this.connection = io.connect(process.env.BOT_SOCKET);
  }

  public emit(event: string, data: any) {
    this.connection.emit(event, data);
  }
}