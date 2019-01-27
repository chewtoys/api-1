import sockjs from "sockjs-client";
import Logger from "../Logger";
import { Orders, Telegram, Workers } from "../../API";

class Socket {
  botSocket: WebSocket;
  botSocketInterval: any;
  logger: any;

  constructor() {
    this.logger = Logger;
    this.botHandler();
  }

  botHandler = () => {
    this.botSocket = new sockjs(process.env.BOT_SOCKET);

    clearInterval(this.botSocketInterval);

    this.botSocket.onopen = () => {
      this.botSocket.onmessage = async (e: SockJS.MessageEvent) => {
        try {
          const req = JSON.parse(e.data);

          if (typeof req.meta !== "undefined") {
            let res: any = {
              meta: {},
              data: {
                success: false,
                telegram_id: req.data.telegram_id
              }
            }
  
            switch (req.meta.event) {
              case "launch":
                // Запуск бота
                res.meta.event = "launch_res";
  
                try {
                  res.data.data = await Workers.createIfNotExist(req.data);
                  res.data.success = true;
                } catch (err) {
                  res.data.message = err.message;
                }

                this.botSocket.send(JSON.stringify(res));

                break;
              case "change_worker_status":
                // Изменение статуса курьера
                res.meta.event = "change_worker_status_res";

                try {
                  res.data.data = await Workers.changeStatus(req.data);
                  res.data.success = true;
                } catch (err) {
                  res.data.message = err.message;
                }

                this.botSocket.send(JSON.stringify(res));

                break;
              case "message":
                // Логирование сообщения
                Telegram.saveMessage(req.data);

                break;
              case "get_orders":
                // Запрос актуальных заказов
                res.meta.event = "get_orders_res";

                try {
                  res.data.data = await Orders.get(req.data);
                  res.data.success = true;
                } catch (err) {
                  res.data.message = err.message;
                }

                this.botSocket.send(JSON.stringify(res));

                break;
              case "delete_messages":
                // Запрос удаления сообщений
                res.meta.event = "delete_messages_res";

                try {
                  res.data.data = await Telegram.deleteMessages(req.data);
                  res.data.success = true;
                } catch (err) {
                  res.data.message = err.message;
                }

                this.botSocket.send(JSON.stringify(res));

                break;
              case "accept_order":
                // Запрос на взятие заказа
                res.meta.event = "accept_order_res";

                try {
                  res.data.data = await Orders.assign(req.data);
                  res.data.success = true;
                } catch (err) {
                  res.data.message = err.message;
                }

                this.botSocket.send(JSON.stringify(res));

                break;
              case "change_order_status":
                // Запрос на изменение статуса заказа
                Orders.changeStatusByTelegram(req.data);

                break;
              default: 
                break;
            }
          }
        } catch (err) {
          this.logger.error(err.message);
        }
      }
    }

    this.botSocket.onclose = () => {
      this.botSocket = null;
      this.botSocketInterval = setInterval(() => {
        this.botHandler();
      }, 5000);
    }
  }
}

export default new Socket();