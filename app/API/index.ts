/**
 * @description Экспорт классов API
 */

import _Auth from "./Auth";
import _OAuth from "./OAuth";
import _Orders from "./Orders";
import _Products from "./Products";
import _Projects from "./Projects";
import _Settings from "./Settings";
import _Telegram from "./Telegram";
import _Testing from "./Testing";
import _Workers from "./Workers";

export const Auth = new _Auth();
export const OAuth = new _OAuth();
export const Orders = new _Orders();
export const Products = new _Products();
export const Projects = new _Projects();
export const Settings = new _Settings();
export const Telegram = new _Telegram();
export const Testing = new _Testing();
export const Workers = new _Workers();