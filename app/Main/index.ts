import Db from "./Db";
import Logger from "./Logger";
import BotSocket from "./BotSocket";

export default class Main {
  Db: Db;
  Logger: any;
  BotSocket: any;
  table: tableList;

  constructor() {
    this.Logger = Logger;
    // this.Db = new Db();
    this.BotSocket = BotSocket;
  }
}
