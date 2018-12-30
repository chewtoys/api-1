/**
 * @description Маршрутизация
 * @author Nikita Bersenev
 */

import notFoundRoute from "./NotFound";
import { productsRoute } from "../API/Products/routes";
import { settingsRoute } from "../API/Settings/routes";
import { ordersRoute } from "../API/Orders/routes";

export const notFound = notFoundRoute;

export default [productsRoute, settingsRoute, ordersRoute];
