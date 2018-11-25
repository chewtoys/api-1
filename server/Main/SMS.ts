/**
 * Класс для работы с SMS
 * @author Nikita Bersenev
 */

import axios from 'axios';
import Db from './DataBase';

export default class SMS {
  login: string;
  password: string;
  sender: string;
  table: tableList;
  db: Db;
  [propName: string]: any;

  constructor() {
    this.login = process.env.SMS_USER;
    this.password = process.env.SMS_PASSWORD;
    this.sender = 'LAAPL';
    this.table = {
      codes: 'verification_codes'
    };
    this.db = new Db;
  }

  /**
   * @description Отправка произвольного смс
   * @param {string[]} phones - массив с номерами телефонов
   * @param {string} mes - текст сообщения
   */
  send(phones: string[], mes: string) {
    /**
     * Ответ сервера
     * @param {number} id - id сообщения
     * @param {number} cnt - ?
     */
    return axios({
      method: 'post',
      url: 'https://smsc.ru/sys/send.php',
      params: {
        login: this.login,
        psw: this.password,
        sender: this.sender,
        charset: 'utf-8',
        fmt: 3,
        phones: phones.join(';'),
        mes
      }
    });
  }

  /**
   * @description Отправка кода подтверждения 
   * @param phone - номер телефона
   */
  code(phone: string) {
    /**
     * Ответ сервера
     * @param {number} id - id сообщения
     * @param {number} cnt - ?
     */
    const code = String(Math.round(10000 - 0.5 + Math.random() * (99999 - 10000 + 1)));
    const message = `Код подтверждения: ${code}`;

    axios({
      method: 'post',
      url: 'https://smsc.ru/sys/send.php',
      params: {
        login: this.login,
        psw: this.password,
        sender: this.sender,
        charset: 'utf-8',
        fmt: 3,
        phones: phone,
        mes: message
      }
    }).then((res: any) => {
      if (typeof res.id !== 'undefined') {
        this.db.query('INSERT INTO ?? (phone, code) VALUES(?, ?)', [this.table.codes, phone, code]);
      }
      else {
        return false;
      }
    });
  }

  /**
   * @description Проверка статуса отправленного смс
   * @param {string} phone - номер телефона
   * @param {number} id - id отправленного смс
   */
  status (phone: string, id: number) {
    /**
     * Ответ сервера
     * @param last_date - datetime
     * @param last_timestamp - timestamp
     * @param status - id статуса (https://smsc.ru/api/http/status_messages/statuses/#menu)
     */
    return axios({
      method: 'post',
      url: 'https://smsc.ru/sys/status.php',
      params: {
        login: this.login,
        psw: this.password,
        charset: 'utf-8',
        fmt: 3,
        phone,
        id
      }
    });
  }

  /**
   * @description Запрос баланса
   */
  balance() {
    /**
     * Ответ сервера
     * @param balance - баланс
     */
    return axios({
      method: 'post',
      url: 'https://smsc.ru/sys/balance.php',
      params: {
        login: this.login,
        psw: this.password,
        fmt: 3
      }
    });
  }

}