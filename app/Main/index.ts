import Db from "./Db";
import Logger from "./Logger";
import BotSocket from "./BotSocket";

export default class Main {
  Db: Db;
  Logger: Logger;
  BotSocket: BotSocket;
  table: tableList;

  constructor() {
    this.Logger = new Logger();

    this.Logger.info("Class Db init");
    this.Db = new Db();
    this.Logger.info("Class BotSocket init");
    this.BotSocket = new BotSocket();
  }
}
