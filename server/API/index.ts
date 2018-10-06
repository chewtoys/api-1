/**
 * Класс для работы с API
 * @author Nikita Bersenev
 */

import Settings from './Settings';
import Products from './Products';

export default class API {
    [propName: string]: any;
    Settings: Settings;
    Products: Products;

    constructor() {
        this.Settings = new Settings;
        this.Products = new Products;
    }
}
