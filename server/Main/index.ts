import Db from "./DataBase";
import Logger from "./Logger";

export default class Main {
  Db: Db;
  Logger: Logger;

  constructor() {
    // // console.log("start");
    this.Db = new Db();
    this.Logger = new Logger();
  }
}
