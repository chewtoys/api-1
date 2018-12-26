require("dotenv").config();
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import helmet from "helmet";
import redis from "redis";
import connectRedis from "connect-redis";
import Cron from "./Main/Cron";
import { CronJob } from "cron";
import router from "./Routes";

const RedisClient = redis.createClient({
  host: "localhost",
  port: 6379,
  password: process.env.REDIS_PASSWORD
});
const RedisStore = connectRedis(session);

class Server {
  app: express.Application;
  Cron: Cron;

  constructor() {
    this.app = express();

    this.app.use(
      session({
        store: new RedisStore({
          client: RedisClient
        }),
        secret: process.env.SESSION_SALT,
        resave: false,
        saveUninitialized: false,
        cookie: { httpOnly: true }
      })
    );
    // Обеспечит маломальскую защиту, уберет хотябы из header заголовок express
    this.app.use(helmet());
    this.app.use(cookieParser());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    this.app.use(passport.initialize());
    this.app.use(passport.session());

    this.Cron = new Cron();

    this.routing();
  }

  private routing() {
    // Для возможности обращаться с любых доменов
    /**
     * @todo Нужно будет переписать, добавить только наши домены
     */
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });
    this.app.use(router);
  }

  /**
   * @description Запуск приложения
   */

  public start() {
    // Запуск cron
    /**
     * @todo Надо отдебажить
     */
    new CronJob(
      "0 0 0 * * *",
      async () => await this.Cron.updateProductsPopularity(),
      null,
      true,
      "Asia/Irkutsk"
    );

    this.app.listen(9001);
  }
}

new Server().start();
