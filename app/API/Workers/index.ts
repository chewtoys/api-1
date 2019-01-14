/**
 * @description Класс для работы с сотрудниками
 * @author Nikita Bersenev
 */

import Main from "../../Main";
import Sequelize from "../../Models";

export default class Workers extends Main {
  worker: any;

  constructor() {
    super();

    this.worker = Sequelize.models.worker;
  }

  /**
   * @description Создание учетной записи сотрудника, если ее еще нет
   */
  public async createIfNotExist({
    first_name,
    id,
    last_name,
    username
  }: {
    first_name: string,
    id: number,
    last_name?: string,
    username?: string
  }) {
    const result = await this.worker.findOrCreate({
      where: {
        telegram_id: id
      },
      defaults: {
        telegram_first_name: first_name,
        telegram_last_name: last_name,
        telegram_username: username
      }
    });

    const worker = result[0];
    const created = result[1];

    return [{worker, created}];
  }
}