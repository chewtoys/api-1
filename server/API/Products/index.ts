/**
 * Класс для работы с продуктами
 * @author Nikita Bersenev
 */

class Products {

  response: object

  constructor() {
    this.response = { result: false }
  }

  public get() { // Получение продуктов
    return this.response
  }

}

module.exports = new Products()