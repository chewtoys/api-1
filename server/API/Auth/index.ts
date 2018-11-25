/**
 * Методы для работы с локальной авторизацией
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
        confirmed: 0
      }
    });

    const user = data[0];
    const created = data[1];

    if (!user) this.functions.unknownError();
    if (!created) throw new Error('Номер телефона уже зарегистрирован');

    // Отправка кода подтверждения
    const code = Math.round(10000 - 0.5 + Math.random() * (99999 - 10000 + 1));
    const message = `Код подтверждения: ${code}`;

    this.sms.send([query.phone], message);

    // Запись кода в базу
    this.Db.query('INSERT INTO ?? (phone, code) VALUES(?, ?)', [this.table.codes, query.phone, code]);

    this.response.result = true;

    return this.response;
  }

  /**
   * @description Подтверждение номера телефона
   * @param {string} phone - номер телефона
   * @param {number} code - код подтверждения
   * @param {boolean} [debug] - режим отладки
   */
  public async confirm(query: any) {
    // Проверка обязательных параметров
    if (!query.phone || !query.code) {
      if (query.debug) this.functions.paramsError();
      else this.functions.unknownError();
    }

    // Получение кода из базы
    const data: any = await this.Db.query('SELECT * FROM ?? WHERE phone = ?', [this.table.codes, query.phone]);

    // Проверка номера и кода
    if (!data.length) throw new Error('Номер телефона не зарегистрирован');
    if (query.code != data[0].code) throw new Error('Неверный код');

    // Меняем статус аккаунта на "подтвержденный"
    const user = await User.findOne({
      where: {
        phone: query.phone
      }
    });

    user.update({
      confirmed: true
    });

    this.response.result = true;

    return this.response;
  }

}