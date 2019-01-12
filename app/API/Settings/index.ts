/**
 * Класс для работы с настройками
 * @author Nikita Bersenev
 */

import Main from "../../Main";
import Sequelize from "../../Models";

export default class Settings extends Main {
  setting: any;

  constructor() {
    super();
    
    this.setting = Sequelize.models.setting;
  }

  /**
   * @description Получение настроек проекта
   * @param {string} project_id - ID проекта
   * @param {string} [setting_id] - ID параметра
   */
  public async get({ project_id, setting_id }: { project_id: string; setting_id?: string }) {
    let where_clause: any = { fk_project_id: project_id };

    if (setting_id) {
      where_clause.setting_id = setting_id;
    }

    return await this.setting.findAll({
      where: where_clause
    });
  }
}
