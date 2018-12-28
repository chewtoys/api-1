/**
 * @description Маршрутизация
 * @author Nikita Bersenev
 */

import notFoundRoute from "./NotFound";
import { productsRoute } from "../API/Products";
import { settingsRoute } from "../API/Settings";

export default [productsRoute, settingsRoute, notFoundRoute];
