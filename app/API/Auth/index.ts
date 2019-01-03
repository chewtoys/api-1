/**
 * Методы для работы с локальной аутентификацией
 * @author Nikita Bersenev
 */

import Main from "../../Main";
import SMS from "../../SMS";
import Sequelize from "../../Models";
import { Request, Response } from "express";

export default class Auth extends Main {
  user: any;

  constructor() {
    super();

    this.table = {
      codes: "verification_codes",
    };

    this.user = Sequelize.models.user;
  }

  /**
   * @description Получение кода подтверждения
   * @param {string} phone - Номер телефона
   */
  public getСode({ phone }: { phone: string }) {
    new SMS().code(phone);
  }

  /**
   * @description Проверка кода подтверждения
   * @param {string} phone - Номер телефона
   * @param {number} code - Код подтверждения
   */
  public async checkCode({ phone, code }: { phone: string; code: number }) {
    // Проверка кода
    const sql = `
      SELECT * FROM ??
      WHERE id_verification_type = 1
        AND value = ?
        AND code = ?
        AND confirmed = 0
      ORDER BY datetime DESC
      LIMIT 1
    `;
    const data: any = await this.Db.query(sql, [this.table.codes, phone, code]);

    if (!data.length) throw new Error("Неверный код");

    // Меняем статус кода на "подтвержденный"
    const update_sql = `
      UPDATE ??
      SET confirmed = 1
      WHERE id_verification_type = 1
        AND value = ?
        AND code = ?
        AND confirmed = 0
      ORDER BY datetime DESC
      LIMIT 1
    `;
    this.Db.query(update_sql, [this.table.codes, phone, code]);
  }
}
