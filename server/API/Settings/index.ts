/**
 * Класс для работы с настройками
 * @author Nikita Bersenev
 */

import Main from "../../Main";
import { route } from "../../utils";

export default class Settings extends Main {
  table: tableList;

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
   * @param {boolean} [debug] - режим отладки
   */
  public async get({ idproject, name }: { idproject?: string; name?: string }) {
    console.log(idproject);
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

export const settingsRoute = route("/settings/get", async (e) => new Settings().get(e), ["idproject"]);
