/**
 * @description Маршрутизация
 * @author Nikita Bersenev
 */

import notFoundRoute from "./NotFound";
import { productsRoute } from "../API/Products/routes";
import { settingsRoute } from "../API/Settings/routes";
import ordersRoutes from "../API/Orders/routes";
import authRoutes from "../API/Auth/routes";
import telegramRoutes from "../API/Telegram/routes";
import workersRoutes from "../API/Workers/routes";

export const notFound = notFoundRoute;

export default [productsRoute, settingsRoute, ...ordersRoutes, ...authRoutes, ...telegramRoutes, ...workersRoutes];
