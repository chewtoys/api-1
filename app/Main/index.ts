import Db from "./Db";
import Logger from "./Logger";
import BotSocket from "./BotSocket";

export default class Main {
  Db: Db;
  Logger: Logger;
  BotSocket: BotSocket;
  table: tableList;

  constructor() {
    this.Db = new Db();
    this.Logger = new Logger();
    this.BotSocket = new BotSocket();
  }
}
