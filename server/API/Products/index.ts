/**
 * Класс для работы с продуктами
 * @author Nikita Bersenev
 */

import DB from '../../Vendor/DB';

export default class Products {
  response: any;
  [propName: string]: any;

  constructor() {
    this.response = {
      result: false
    };
  };

  public async getItems() { // Получение списка всех актуальных продуктов
    const t_categories = 'categories';
    const t_products = 'products';

    const data: any = await new DB().query(`
      SELECT
        t1.idcategory AS idcategory,
        t1.name AS category_name,
        t1.aliase AS category_aliase,
        t1.icon AS category_icon,
        t2.idproduct AS idproduct,
        t2.name AS product_name,
        t2.title AS product_title,
        t2.specification AS product_specification,
        t2.energy_value AS product_energy,
        t2.fat AS product_fat,
        t2.protein AS product_protein,
        t2.starch AS product_starch,
        t2.mass AS product_mass,
        t2.description AS product_description,
        t2.poster AS product_poster,
        t2.price AS product_price
      FROM ${t_categories} AS t1
      INNER JOIN ${t_products} AS t2 ON t1.idcategory = t2.idcategory
      WHERE CURDATE() BETWEEN t1.bdate AND t1.edate
        AND CURDATE() BETWEEN t2.bdate AND t2.edate
    `);

    let idcategories: number[] = [];
    let modifdata: any = [];

    data.forEach((item: any) => {
      if (idcategories.indexOf(item.idcategory) === -1) {
        idcategories.push(item.idcategory);
        let categoryItems = data.filter((subitem: any) => {
          return subitem.idcategory === item.idcategory;
        }); 

        modifdata.push({
          id: item.idcategory,
          name: item.category_name,
          aliase: item.category_aliase,
          icon: item.category_icon,
          items: categoryItems.map((item: any) => {
            return {
              id: item.idproduct,
              name: item.product_name,
              title: item.product_title,
              description: item.product_description,
              poster: item.product_poster,
              specification: item.product_specification,
              energy_value: item.product_energy,
              fat: item.product_fat,
              protein: item.product_protein,
              starch: item.product_starch,
              mass: item.product_mass,
              price: item.product_price
            }
          })
        });
      }
    });

    this.response.data = modifdata
    this.response.result = true

    return this.response
  };
};