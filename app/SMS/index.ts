/**
 * Класс для работы с SMS
 * @author Nikita Bersenev
 */

import axios from "axios";
import Logger from "../Main/Logger";

class SMS {
  login: string;
  password: string;
  sender: string;

  constructor() {
    Logger.info("SMS Class init");

    this.login = process.env.SMS_USER;
    this.password = process.env.SMS_PASSWORD;
    this.sender = "LAAPL.RU";
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
      method: "post",
      url: "https://smsc.ru/sys/send.php",
      params: {
        login: this.login,
        psw: this.password,
        sender: this.sender,
        charset: "utf-8",
        fmt: 3,
        phones: phones.join(";"),
        mes,
      },
    });
  }

  /**
   * @description Проверка статуса отправленного смс
   * @param {string} phone - номер телефона
   * @param {number} id - id отправленного смс
   */
  status(phone: string, id: number) {
    /**
     * Ответ сервера
     * @param last_date - datetime
     * @param last_timestamp - timestamp
     * @param status - id статуса (https://smsc.ru/api/http/status_messages/statuses/#menu)
     */
    return axios({
      method: "post",
      url: "https://smsc.ru/sys/status.php",
      params: {
        login: this.login,
        psw: this.password,
        charset: "utf-8",
        fmt: 3,
        phone,
        id,
      },
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
      method: "post",
      url: "https://smsc.ru/sys/balance.php",
      params: {
        login: this.login,
        psw: this.password,
        fmt: 3,
      },
    });
  }
}

export default SMS;
