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