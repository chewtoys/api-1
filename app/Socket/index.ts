import io from "socket.io-client";
import { Telegram, Workers } from "../API";

class Socket {
  bot: SocketIOClient.Socket;

  constructor() {
    this.bot = io.connect(process.env.BOT_SOCKET);
  }

  public eventHandler() {
    // Запуск бота
    this.bot.on("launch", async (data: any) => {
      let res: any = { success: false };

      try {
        res.data = await Workers.createIfNotExist(data);
        res.success = true;
      } catch (err) {
        res.telegram_id = data.id;
        res.message = err.message;
      }

      this.bot.emit("launch_res", res);
    });

    // Изменение статуса курьера
    this.bot.on("change_worker_status", async (data: any) => {
      let res: any = { success: false };

      try {
        res.data = await Workers.changeStatus(data);
        res.success = true;
      } catch (err) {
        res.telegram_id = data.telegram_id;
        res.message = err.message;
      }

      this.bot.emit("change_worker_status_res", res);
    });

    // Логирование сообщения
    this.bot.on("message", (data: any) => {
      Telegram.saveMessage(data);
    });
  }
}

export default new Socket();