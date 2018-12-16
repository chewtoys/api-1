/**
 * @description Маршрутизация 
 * @author Nikita Bersenev
 */

import { Router } from "express";
import Auth from './Auth';
import OAuth from './OAuth';
import Orders from './Orders';
import Products from './Products';
import Settings from './Settings';

const router = Router();

Auth(router);
OAuth(router);
Orders(router);
Products(router);
Settings(router);

export default router;