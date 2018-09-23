/**
 * Класс для работы с API 
 * @author Nikita Bersenev
 */

interface paramsCall {
  classname: string,
  method: string,
  params?: any
}

class API {

  class: any

  constructor() {
    this.class = {}
  }

  public call (options: paramsCall) {
    this.class = require('./' + options.classname)
    return this.class[options.method](options.params)
  }

}

export default new API()