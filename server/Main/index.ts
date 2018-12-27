import Db from "./DataBase";

export default class Main {
  Db: Db;
  constructor() {
    // // console.log("start");
    this.Db = new Db();
  }
}
