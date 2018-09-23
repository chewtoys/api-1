"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = __importDefault(require("../../Vendor/DB"));
class Products {
    constructor() {
        this.response = { result: false };
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            let t_categories = 'categories';
            let t_products = 'products';
            let data = yield DB_1.default.execute(`
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
    `);
            let tmpData = {};
            data.forEach((item) => {
                if (typeof tmpData[item.idcategory] !== 'undefined') {
                    tmpData[item.idcategory].items.push({
                        id: item.idproduct,
                        name: item.product_name,
                        description: item.product_description,
                        poster: item.product_poster,
                        price: item.product_price
                    });
                }
                else {
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
                    };
                }
            });
            this.response.data = [];
            for (let key in tmpData) {
                this.response.data.push(tmpData[key]);
            }
            this.response.result = true;
            return this.response;
        });
    }
}
module.exports = new Products();
//# sourceMappingURL=index.js.map