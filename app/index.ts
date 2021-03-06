require("dotenv").config();
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import helmet from "helmet";
import Logger from "./Main/Logger";
import router, { notFound } from "./Routes";
import { session } from "./utils";

class Server {
  app: express.Application;

  constructor() {
    Logger.info("Server Class init");

    this.app = express();

    this.app.use(session);
    // Обеспечит маломальскую защиту, уберет хотябы из header заголовок express
    this.app.use(helmet());
    this.app.use(cookieParser());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    this.app.use(passport.initialize());
    this.app.use(passport.session());

    // this.Cron = new Cron();

    this.routing();
  }

  private routing() {
    Logger.info("routing in Server Class init");
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
  public async start(port: number) {
    this.app.listen(port);

    Logger.info("start in Server Class init");
  }
}

new Server().start(Number(process.env.PORT));
