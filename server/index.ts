require("dotenv").config();
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import helmet from "helmet";
import { CronJob } from "cron";
import Cron from "./Main/Cron";
import session from './utils/session';
import router from "./Routes";

class Server {
  app: express.Application;
  Cron: Cron;

  constructor() {
    this.app = express();

    // Обеспечит маломальскую защиту, уберет хотябы из header заголовок express
    this.app.use(helmet());
    this.app.use(cookieParser());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    this.app.use(session);
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
    router.forEach(route => {
      this.app.use(route);
    });
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
