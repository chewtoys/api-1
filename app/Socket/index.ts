import io from "socket.io-client";
import { Workers } from "../API";

class Socket {
  bot: SocketIOClient.Socket;

  constructor() {
    this.bot = io.connect(process.env.BOT_SOCKET);
  }

  public eventHandler() {
    // Изменение статуса курьера
    this.bot.on("change_worker_status", async (data: any) => {
      this.bot.emit("change_worker_status_res", await Workers.changeStatus(data));
    });
  }
}

export default new Socket();