/**
 * Класс для работы с настройками
 * @author Nikita Bersenev
 */

import Main from '../../Main';
import Functions from '../../Main/Functions';

export default class Settings extends Main {
  functions: Functions;
  response: responseAPI;
  table: tableList;

  constructor() {
    super();
    this.functions = new Functions;

    this.response = {
      result: false 
    };
    this.table = {
      settings: "settings"
    };
  };

  /**
   * @description Получение настроек проекта
   * @param {number} idproject - id проекта
   * @param {string} [name] - название параметра
   * @param {boolean} [debug] - режим отладки
   */
  public async get(query: any) {
    // Проверка обязательных параметров
    if (!query.idproject) {
      if (query.debug) this.functions.paramsError();
      else this.functions.unknownError();
    }  

    let sql: string = `
      SELECT
        idsetting,
        name,
        value,
        start_date,
        end_date
      FROM ??
      WHERE CURDATE() BETWEEN start_date AND end_date
    `;
    let params = [this.table.settings];

    if (query.name) {
      sql += ` AND name = ?`;
      params.push(query.name);
    }

    const data: any = await this.Db.query(sql, params);

    this.response.result = true;
    this.response.data = data;
    return this.response;
  }
};