/**
 * Класс для работы с настройками
 * @author Nikita Bersenev
 */

import Main from "../../Main";
import Sequelize from "../../Models";

export default class Settings extends Main {
  setting: any;
  house_type: any;

  constructor() {
    super();

    this.Logger.info("Settings Class init");

    this.setting = Sequelize.models.setting;
    this.house_type = Sequelize.models.house_type;
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

    const settings =  await this.setting.findAll({
      where: where_clause,
    });

    const house_types = await this.house_type.findAll();

    return [settings, house_types];
  }
}
