import io from "socket.io-client";
import { Orders, Telegram, Workers } from "../API";

class Socket {
  bot: SocketIOClient.Socket;
  client: SocketIOClient.Socket;

  constructor() {
    this.bot = io.connect(process.env.BOT_SOCKET);
    this.client = io.connect(process.env.CLIENT_SOCKET);
  }

  // Обработчик пространства бота
  public botHandler() {
    this.bot.on("connect", () => {
      // Запуск бота
      this.bot.on("launch", async (data: any) => {
        let res: any = { 
          success: false,
          telegram_id: data.id 
        };

        try {
          res.data = await Workers.createIfNotExist(data);
          res.success = true;
        } catch (err) {
          res.message = err.message;
        }

        this.bot.emit("launch_res", res);
      });

      // Запрос на изменение статуса курьера
      this.bot.on("change_worker_status", async (data: any) => {
        let res: any = { 
          success: false,
          telegram_id: data.telegram_id
        };

        try {
          res.data = await Workers.changeStatus(data);
          res.success = true;
        } catch (err) {
          res.message = err.message;
        }

        this.bot.emit("change_worker_status_res", res);
      });

      // Логирование сообщения
      this.bot.on("message", (data: any) => {
        Telegram.saveMessage(data);
      });

      // Запрос актуальных заказов
      this.bot.on("get_orders", async (data: any) => {
        let res: any = { 
          success: false,
          telegram_id: data.telegram_id 
        };

        try {
          res.data = await Orders.get(data);
          res.success = true;
        } catch (err) {
          res.message = err.message;
        }

        this.bot.emit("get_orders_res", res);
      });

      // Запрос удаления сообщений
      this.bot.on("delete_messages", async (data: any) => {
        let res: any = {
          success: false,
          telegram_id: data.telegram_id
        };

        try {
          res.data = await Telegram.deleteMessages(data);
          res.success = true;
        } catch (err) {
          res.message = err.message;
        }

        this.bot.emit("delete_messages_res", res);
      }); 

      // Запрос на взятие заказа
      this.bot.on("accept_order", async (data: any) => {
        let res: any = {
          success: false,
          telegram_id: data.telegram_id
        };

        try {
          res.data = await Orders.assign(data);
          res.success = true;
        } catch (err) {
          res.message = err.message;
        }

        this.bot.emit("accept_order_res", res);
      });

      // Запрос на изменение статуса заказа
      this.bot.on("change_order_status", (data: any) => {
        Orders.changeStatusByTelegram(data);
      });
    });
  }
}

export default new Socket();