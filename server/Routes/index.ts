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
import io from 'socket.io-client';

const router: Router = Router();
const SocketBot: SocketIOClient.Socket = io.connect(process.env.SOCKET_BOT);

Auth(router);
OAuth(router);
Orders(router, SocketBot);
Products(router);
Settings(router);

export default router;