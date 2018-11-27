require('dotenv').config()
import express from "express";
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

class Server {
    app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(express.static('static/desktop/'));
        this.app.use(express.static('upload/'));

        this.app.use(session({
          store: new RedisStore({
            client: RedisClient
          }),
          secret: process.env.SESSION_SALT,
          resave: false,
          saveUninitialized: false
        }));
        this.app.use(cookieParser());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        this.app.use(passport.initialize());
        this.app.use(passport.session());

        this.routing();
    };

    private routing() {
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.app.use(authRoute);
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