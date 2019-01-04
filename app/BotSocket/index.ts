import io from "socket.io-client";

export default class BotSocket {
  connection: SocketIOClient.Socket;

  constructor() {
    this.connection = io.connect(process.env.BOT_SOCKET);
  }

  start() {
    // тут будут обработчики событий
  }
}