/**
 * Методы для работы с локальной аутентификацией
 * @author Nikita Bersenev
 */

import Main from "../../Main";
import SMS from "../../SMS";
import Sequelize from "../../Models";
import moment from "moment";

export default class Auth extends Main {
  code: any;

  constructor() {
    super();

    this.code = Sequelize.models.code;
  }

  /**
   * @description Получение кода подтверждения
   * @param {number} type_id - Тип подтверждения
   * @param {number} operation_id - Подтверждаемая операция
   * @param {string} recipient - Получатель
   */
  public getСode({
    type_id,
    operation_id,
    recipient
  }: {
    type_id: number,
    operation_id: number,
    recipient: string
  }) {
    const code = String(Math.round(10000 - 0.5 + Math.random() * (99999 - 10000 + 1)));
    const msg = `Код подтверждения: ${code}`;

    switch (type_id) {
      case 1:
        // Через телефон
        const phone_reg = /^[0-9]{11}$/;
        if (!phone_reg.test(recipient)) throw new Error("Некорректный номер телефона");

        SMS.send([recipient], msg);
        break;
      case 2:
        // Через Email
        // Написать, когда станет актуальным
        break;
      default: throw new Error("Неизвестный тип подтверждения");
    }

    this.code.create({
      fk_type_id: type_id,
      fk_operation_id: operation_id,
      recipient,
      code
    });

    return [code];
  }

  /**
   * @description Проверка кода подтверждения
   * @param {string} recipient - Получатель
   * @param {number} operation_id - Подтверждаемая операция
   * @param {number} code - Код подтверждения
   */
  public async checkCode({
    operation_id,
    recipient,
    code
  }: {
    operation_id: number,
    recipient: string,
    code: number
  }) {
    const data = await this.code.findOne({
      where: {
        fk_operation_id: operation_id,
        recipient,
        code,
        valid_until: {
          [Sequelize.Op.gte]: moment().format("YYYY-MM-DD HH:mm:ss")
        }
      }
    });

    if (data) {
      return [true];
    } else {
      return [false];
    }
  }
}
