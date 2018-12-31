/**
 * Класс для работы с настройками
 * @author Nikita Bersenev
 */

import Main from "../../Main";

export default class Settings extends Main {
  constructor() {
    super();
    this.table = {
      settings: "settings",
    };
  }

  /**
   * @description Получение настроек проекта
   * @param {number} idproject - id проекта
   * @param {string} [name] - название параметра
   */
  public async get({ idproject, name }: { idproject?: string; name?: string }) {
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

    if (name) {
      sql += ` AND name = ?`;
      params.push(name);
    }

    const data: any = await this.Db.query(sql, params);

    return data;
  }
}
