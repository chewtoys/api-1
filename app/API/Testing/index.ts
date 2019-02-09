/**
 * @description Класс для тестирования
 */

import Main from "../../Main";
import Sequelize from "../../Models";

export default class Testing extends Main {
  order: any;
  worker: any;

  constructor() {
    super();

    this.Logger.info("Testing class init");
    this.order = Sequelize.models.order;
    this.worker = Sequelize.models.worker;
  }

  /**
   * @description Отправка заказа свободным курьерам
   * @param {number} order_id - id заказа
   */
  public async sendOrder({ order_id }: { order_id: number }) {
    const order = await this.order.findOne({
      where: { order_id }
    });

    if (!order) throw new Error("Заказ не найден");

    // Получаем список свободных курьеров
    const worker = await this.worker.findAll({
      where: { fk_status_id: 2 },
    });

    if (!worker) throw new Error("Нет свободных курьеров");

    this.socket.botSocket.send(
      JSON.stringify({
        meta: {
          event: "new_order",
        },
        data: { order, worker },
      })
    );

    return [true];
  }
}