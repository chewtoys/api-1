import Db from "./DateBase";

export default class Main {
    Db: Db;
    constructor() {
        this.Db = new Db;
    }
}