require("dotenv").config();
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import helmet from "helmet";
import Cron from "./Cron";
import { CronJob } from "cron";
import router, { notFound } from "./Routes";
import { session } from "./utils";

class Server {
  app: express.Application;
  Cron: Cron;

  constructor() {
    this.app = express();

    this.app.use(session);
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
    /**
     * @description CORS
     * @todo Нужно будет переписать, добавить только наши домены
     */
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    // Добавление роутов циклом, последним должен быть 404 всегда
    router.forEach((route) => {
      this.app.use(route);
    });
    this.app.use(notFound);
  }

  /**
   * @description Запуск приложения
   * @param {number} port Port
   */
  public start(port: number) {
    // Запуск cron
    new CronJob("0 0 0 * * *", async () => await this.Cron.updateProductsPopularity(), null, true, "Asia/Irkutsk");

    this.app.listen(port);
  }
}

new Server().start(9001);
