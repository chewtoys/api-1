/**
 * Класс для работы с API
 * @author Nikita Bersenev
 * @body For our API we should follow [JSON:API](https://jsonapi.org/) standard. More info at https://jsonapi.org/
 */

import Auth from "./Auth";
import OAuth from "./OAuth";
import Settings from "./Settings";
import Products from "./Products";
import Orders from "./Orders";

export default class API {
  Auth: Auth;
  OAuth: OAuth;
  Settings: Settings;
  //   Products: Products;
  //   Orders: Orders;
  //   [propName: string]: any;

  constructor() {
    this.Auth = new Auth();
    this.OAuth = new OAuth();
    this.Settings = new Settings();
    // this.Products = new Products();
    // this.Orders = new Orders();
  }

  Products = new Products();
  Orders = new Orders();
}
