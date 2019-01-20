/**
 * @description Класс для работы с Telegram
 */

import Main from "../../Main";
import Sequelize from "../../Models";

export default class Telegram extends Main {
  message: any;
  worker: any;

  constructor() {
    super();

    this.message = Sequelize.models.message;
    this.worker = Sequelize.models.worker;
  }

  /**
   * @description Удаление сообщений
   */
  public async deleteMessages({
    type_id,
    unit_id,
    telegram_id
  }: {
    type_id?: number;
    unit_id?: number;
    telegram_id?: number;
  }) {
    let conditions: any = {
      deleted: false
    };

    if (typeof type_id !== "undefined") {
      conditions.fk_type_id = type_id;
    }

    if (typeof unit_id !== "undefined") {
      conditions.unit_id = unit_id;
    }

    if (typeof telegram_id !== "undefined") {
      conditions.fk_telegram_id = telegram_id;
    }

    const messages = await this.message.findAll({
      where: conditions
    });

    await this.message.update({
      deleted: true
    }, {
      where: conditions
    });

    return [messages];
  }

  /**
   * @description Сохранение сообщения
   */
  public async saveMessage({
    telegram_id,
    message_id,
    text,
    type_id,
    unit_id
  }: {
    telegram_id: number;
    message_id: number;
    text: string;
    type_id: number;
    unit_id?: number;
  }) {
    this.message.create({
      fk_telegram_id: telegram_id,
      fk_type_id: type_id,
      message_id,
      text,
      unit_id
    });

    return [true];
  }
}