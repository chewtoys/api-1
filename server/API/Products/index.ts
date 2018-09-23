/**
 * Класс для работы с продуктами
 * @author Nikita Bersenev
 */

import DB from '../../Vendor/DB'

class Products {

  response: any

  constructor() {
    this.response = { result: false }
  }

  public async get() { // Получение списка всех актуальных продуктов
    let t_categories = 'categories'
    let t_products = 'products'

    let data: any = await DB.execute(`
      SELECT
        t1.idcategory AS idcategory,
        t1.name AS category_name,
        t1.aliase AS category_aliase,
        t1.icon AS category_icon,
        t2.idproduct AS idproduct,
        t2.name AS product_name,
        t2.description AS product_description,
        t2.poster AS product_poster,
        t2.price AS product_price
      FROM ${t_categories} AS t1
      INNER JOIN ${t_products} AS t2 ON t1.idcategory = t2.idcategory
      WHERE CURDATE() BETWEEN t1.bdate AND t1.edate
        AND CURDATE() BETWEEN t2.bdate AND t2.edate
    `)

    let tmpData: any = {}

    data.forEach((item: any) => {
      if (typeof tmpData[item.idcategory] !== 'undefined') {
        tmpData[item.idcategory].items.push({
          id: item.idproduct,
          name: item.product_name,
          description: item.product_description,
          poster: item.product_poster,
          price: item.product_price
        })
      } else {
        tmpData[item.idcategory] = {
          id: item.idcategory,
          name: item.category_name,
          aliase: item.category_aliase,
          icon: item.category_icon,
          items: [
            {
              id: item.idproduct,
              name: item.product_name,
              description: item.product_description,
              poster: item.product_poster,
              price: item.product_price
            }
          ]
        }
      }
    })

    this.response.data = []

    for (let key in tmpData) {
      this.response.data.push(tmpData[key])
    }

    return this.response
  }

}

module.exports = new Products()