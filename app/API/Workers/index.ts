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
   * @description Изменение статуса
   */
  public async changeStatus({ telegram_id, status_id }: { telegram_id: number; status_id: number }) {
    const worker = await this.worker.findOne({
      where: { telegram_id }
    });

    if (!worker) throw new Error("Не зарегистрированный telegram_id");

    worker.update({
      fk_status_id: status_id
    });

    return [worker];
  }

  /**
   * @description Создание учетной записи сотрудника, если ее еще нет
   */
  public async createIfNotExist({
    first_name,
    telegram_id,
    last_name,
    username
  }: {
    first_name: string,
    telegram_id: number,
    last_name?: string,
    username?: string
  }) {
    const result = await this.worker.findOrCreate({
      where: { telegram_id },
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