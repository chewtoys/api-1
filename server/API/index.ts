/**
 * Класс для работы с API
 * @author Nikita Bersenev
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
