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
  public async getСode({ type_id, operation_id, recipient }: { type_id: number; operation_id: number; recipient: string }) {
    switch (type_id) {
      case 1:
        // Через телефон
        const phone_reg = /^[0-9]{11}$/;
        if (!phone_reg.test(recipient)) throw new Error("Некорректный номер телефона");
        break;
      default:
        throw new Error("Неизвестный тип подтверждения");
    }

    const data = await this.code.findOrCreate({
      where: {
        fk_type_id: type_id,
        fk_operation_id: operation_id,
        recipient,
        lifetime: {
          [Sequelize.Op.gte]: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        confirmed: false
      },
      limit: 1,
      order: [
        ["code_id", "DESC"]
      ],
      defaults: {
        code: String(Math.round(10000 - 0.5 + Math.random() * (99999 - 10000 + 1)))
      }
    });

    const msg = `Код подтверждения: ${data[0].code}`;

    switch (type_id) {
      case 1:
        new SMS().send([recipient], msg);
        break;
      default:
        break;
    }

    return [{ code: data[0].code }];
  }

  /**
   * @description Проверка кода подтверждения
   * @param {string} recipient - Получатель
   * @param {number} operation_id - Подтверждаемая операция
   * @param {number} code - Код подтверждения
   */
  public async checkCode({ operation_id, recipient, code }: { operation_id: number; recipient: string; code: number }) {
    const data = await this.code.findOne({
      where: {
        fk_operation_id: operation_id,
        recipient,
        code,
        lifetime: {
          [Sequelize.Op.gte]: moment().format("YYYY-MM-DD HH:mm:ss"),
        },
        confirmed: false
      },
      limit: 1,
      order: [
        ["code_id", "DESC"]
      ]
    });

    if (data) {
      data.update({ confirmed: true });
      return [true];
    } else {
      return [false];
    }
  }
}
