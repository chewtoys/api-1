/**
 * Класс для работы с API
 * @author Nikita Bersenev
 * @todo Use JSON:API specification
 * @body For our API we should follow [JSON:API](https://jsonapi.org/) standard. More info at https://jsonapi.org/
 */

import Settings from './Settings';
import Products from './Products';
import Orders from './Orders';

export default class API {
    [propName: string]: any;
    Settings: Settings;
    Products: Products;
    Orders: Orders;

    constructor() {
        this.Settings = new Settings;
        this.Products = new Products;
        this.Orders = new Orders;
    }

    // private async setBasename() {
    //     await new Db().query(`USE ??`, [this.basename]);
    // }
}
