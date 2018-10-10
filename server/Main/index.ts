import Db from "./DataBase";

export default class Main {
    Db: Db;
    constructor() {
        this.Db = new Db;
    }
}