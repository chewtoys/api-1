/**
 * Класс для работы с Cron-задачами
 * @author Nikita Bersenev
 */

import Main from "../Main";

export default class Cron extends Main {
  constructor() {
    super();
  }

  /**
   * @description Пересчет популярности товаров
   */
  public async updateProductsPopularity() {
    // console.log("test");
    // const query = `
    //   UPDATE ?? AS t1
    //   INNER JOIN (
    //     SELECT
    //       idproduct,
    //       SUM(count) AS count
    //     FROM ??
    //     GROUP BY idproduct
    //   ) AS t2 ON t1.idproduct = t2.idproduct
    //   SET t1.popularity = t2.count
    // `;

    // const params = [this.table.products, this.table.orders_data];

    // await this.Db.query(query, params);
  }
}
