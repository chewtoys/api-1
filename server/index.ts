require('dotenv').config()
import express from "express";
<<<<<<< HEAD
import { desktopRoute, apiRoute } from "./Routes";
=======
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import redis from 'redis';
import connectRedis from 'connect-redis';
import { desktopRoute, apiRoute, authRoute } from "./Routes";

const RedisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
  password: process.env.REDIS_PASSWORD
});
const RedisStore = connectRedis(session);
>>>>>>> feature/redis

class Server {
    app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(express.static('static/desktop/'));
        this.app.use(express.static('upload/'));
        this.routing();
    };

    private routing() {
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.app.use(apiRoute);
        this.app.use(desktopRoute);
    };

    /**
     * @description Start Server
     */
    
    public start() {
        this.app.listen(3000);
        // console.log('env = ', process.env)
    };
};

new Server().start();