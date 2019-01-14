/**
 * @description Экспорт классов API
 */

import _Auth from "./Auth";
import _OAuth from "./OAuth";
import _Orders from "./Orders";
import _Products from "./Products";
import _Settings from "./Settings";
import _Workers from "./Workers";

export const Auth = new _Auth();
export const OAuth = new _OAuth();
export const Orders = new _Orders();
export const Products = new _Products();
export const Settings = new _Settings();
export const Workers = new _Workers();