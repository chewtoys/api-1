/**
 * Класс для работы с API
 * @author Nikita Bersenev
 */

import Products from "./Products";

export default class API {
    [propName: string]: any;
    Products: Products;

    constructor() {
        this.Products = new Products;
    }
}
