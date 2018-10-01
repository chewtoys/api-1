/**
 * Класс для работы с API
 * @author Nikita Bersenev
 */

import Products from "./Products";

// interface paramsCall {
//   classname: string,
//   method: string,
//   params?: any
// }

export default class API {
    [propName: string]: any;
    Products: Products;

    constructor() {
        this.Products = new Products();
    }

    // public call (options: paramsCall) {
    //   this.class = new [options.classname]
    //   // this.class = require('./' + options.classname)
    //   return this.class[options.method](options.params)
    // }
}

// export default new API()
