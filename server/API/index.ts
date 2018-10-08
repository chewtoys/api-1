/**
 * Класс для работы с API
 * @author Nikita Bersenev
 */

import Products from "./Products";
import Db from "../Vendor/DateBase"

export default class API {
    [prop: string]: any;
    Products: any;
    basename?: string;

    constructor(basename?:string) {
        this.Products = new Products;
    }

    // private async setBasename() {
    //     await new Db().query(`USE ??`, [this.basename]);
    // }
}
