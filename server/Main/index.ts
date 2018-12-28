import Db from "./Db";
import Logger from "./Logger";

export default class Main {
  Db: Db;
  Logger: Logger;

  constructor() {
    this.Db = new Db();
    this.Logger = new Logger();
  }
}
