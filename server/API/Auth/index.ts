/**
 * Методы для работы с локальной аутентификацией
 * @author Nikita Bersenev
 */

import Main from '../../Main';
import Functions from '../../Main/Functions';
import SMS from '../../Main/SMS';
import Models from '../../Models';
import bCrypt from 'bcrypt-nodejs';

const { User } = Models;

export default class Auth extends Main {
  functions: Functions;
  response: responseAPI;
  sms: SMS;
  table: tableList;
  [propName: string]: any;

  constructor() {
    super();

    this.functions = new Functions;
    this.response = { result: false };
    this.sms = new SMS;

    this.table = {
      codes: 'verification_codes'
    };
  }

  /**
   * @description Регистрация
   * @param {string} phone - номер телефона
   * @param {string} password - пароль
   * @param {string} name - имя
   * @param {number} [idusertype] - тип пользователя
   * @param {boolean} [debug] - режим отладки
   */
  public async reg(query: any) {
    // Проверка обязательных параметров
    if (!query.phone || !query.password || !query.name) {
      if (query.debug) this.functions.paramsError();
      else this.functions.unknownError();
    }

    const phone_reg = /^[0-9]{11}$/i;
    
    if (!phone_reg.test(query.phone)) throw new Error('Неверный номер телефона');
    if (query.password.length < 6 || query.password.length > 32) throw new Error('В пароле должно быть от 6 до 32 символов');

    // Регистрация аккаунта, если не был зарегистрирован ранее
    const data = await User.findOrCreate({
      where: {
        phone: query.phone
      },
      defaults: {
        idusertype: (query.idusertype) ? query.idusertype : 1,
        password: bCrypt.hashSync(query.password, bCrypt.genSaltSync(10)),
        name: query.name,
        phone_confirmed: 0,
        email_confirmed: 0
      }
    });

    const user = data[0];
    const created = data[1];

    if (!user) this.functions.unknownError();
    if (!created) throw new Error('Номер телефона уже зарегистрирован');

    // Отправка кода подтверждения
    this.sms.code(query.phone);

    this.response.result = true;

    return this.response;
  }

  /**
   * @description Подтверждение номера телефона для зарегистрированного аккаунта
   * @param {string} phone - номер телефона
   * @param {number} code - код подтверждения
   * @param {boolean} [debug] - режим отладки
   */
  public async confirm_phone(query: any) {
    // Проверка обязательных параметров
    if (!query.phone || !query.code) {
      if (query.debug) this.functions.paramsError();
      else this.functions.unknownError();
    }

    // Получение кода из базы
    const sql = `
      SELECT * FROM ??
      WHERE id_verification_type = 1
        AND value = ?
        AND code = ?
        AND confirmed = 0
      ORDER BY datetime DESC
      LIMIT 1
    `;
    const data: any = await this.Db.query(sql, [this.table.codes, query.phone, query.code]);

    // Проверка номера и кода
    if (!data.length) throw new Error('Неверный код');

    // Меняем статус номера и кода на "подтвержденный"
    const user = await User.findOne({
      where: {
        phone: query.phone
      }
    });

    user.update({
      phone_confirmed: true
    });

    const update_sql = `
      UPDATE ??
      SET confirmed = 1
      WHERE id_verification_type = 1
        AND value = ?
        AND confirmed = 0
      ORDER BY datetime DESC
      LIMIT 1
    `;
    this.Db.query(update_sql, [this.table.codes, query.phone]);

    this.response.result = true;

    return this.response;
  }

  /**
   * @description Получение кода подтверждения
   * @param {string} phone - номер телефона
   * @param {boolean} [debug] - режим отладки
   */
  public async get_code(query: any) {
    // Проверка обязательных параметров
    if (!query.phone) {
      if (query.debug) this.functions.paramsError();
      else this.functions.unknownError();
    }

    this.sms.code(query.phone);

    this.response.result = true;
    return this.response;
  }

  /**
   * @description Проверка кода подтверждения
   * @param {string} phone - номер телефона
   * @param {number} code - код подтверждения
   * @param {boolean} [debug] - режим отладки
   */
  public async check_code(query: any) {
    // Проверка обязательных параметров
    if (!query.phone || !query.code) {
      if (query.debug) this.functions.paramsError();
      else this.functions.unknownError();
    }

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
    const data: any = await this.Db.query(sql, [this.table.codes, query.phone, query.code]);

    if (!data.length) throw new Error('Неверный код');

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
    this.Db.query(update_sql, [this.table.codes, query.phone, query.code]);

    this.response.result = true;
    return this.response;
  }

}