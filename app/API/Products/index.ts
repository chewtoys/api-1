import Main from "../../Main";

export default class Products extends Main {
  constructor() {
    super();
    this.table = {
      categories: "categories",
      products: "products",
    };
  }

  /**
   * @description Получение списка всех актуальных продуктов
   */
  public async get() {
    const data: any = await this.Db.query(
      `
      SELECT
        t1.category_id AS category_id,
        t1.name AS category_name,
        t1.alias AS category_aliase,
        t2.product_id AS product_id,
        t2.name AS product_name,
        t2.title AS product_title,
        t2.specification AS product_specification,
        t2.energy_value AS product_energy,
        t2.fat AS product_fat,
        t2.protein AS product_protein,
        t2.starch AS product_starch,
        t2.mass AS product_mass,
        t2.description AS product_description,
        t2.big_img AS product_big_img,
        t2.small_img AS product_small_img,
        t2.bad_img AS product_bad_img,
        t2.price AS product_price
      FROM ?? AS t1
      INNER JOIN ?? AS t2 ON t2.fk_category_id = t1.category_id
      WHERE t2.actual = 1
    `,
      [this.table.categories, this.table.products]
    );

    let idcategories: number[] = [];
    let modifdata: any[] = [];

    data.forEach((item: any) => {
      if (idcategories.indexOf(item.category_id) === -1) {
        idcategories.push(item.category_id);
        let categoryItems = data.filter((subitem: any) => {
          return subitem.category_id === item.category_id;
        });

        modifdata.push({
          id: item.category_id,
          name: item.category_name,
          aliase: item.category_aliase,
          icon: item.category_icon,
          items: categoryItems.map((item: any) => {
            return {
              id: item.product_id,
              name: item.product_name,
              title: item.product_title,
              description: item.product_description,
              big_img: item.product_big_img,
              small_img: item.product_small_img,
              bad_img: item.product_bad_img,
              specification: item.product_specification,
              energy_value: item.product_energy,
              fat: item.product_fat,
              protein: item.product_protein,
              starch: item.product_starch,
              mass: item.product_mass,
              price: item.product_price,
            };
          }),
        });
      }
    });

    return modifdata;
  }
}
