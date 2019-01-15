import Main from "../../Main";
import Sequelize from "../../Models";

export default class Products extends Main {
  category: any;
  product: any;
  image: any;

  constructor() {
    super();
    this.Logger.info("Products Class init");
    this.category = Sequelize.models.category;
    this.product = Sequelize.models.product;
    this.image = Sequelize.models.image;
  }

  /**
   * @description Получение списка всех актуальных продуктов
   */
  public async get({ project_id }: { project_id: string }) {
    const data: any = await this.category.findAll({
      where: {
        actual: true,
        fk_project_id: project_id,
      },
      include: [
        {
          model: this.product,
          required: true,
          where: { actual: true },
          include: [
            {
              model: this.image,
              required: true,
              where: { unit_name: "product" },
            },
          ],
        },
      ],
    });

    return data;
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
