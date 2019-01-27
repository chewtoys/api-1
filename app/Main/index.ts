import Logger from "./Logger";
import Socket from "./Socket";

export default class Main {
  Logger: any;
  socket: any;

  constructor() {
    this.Logger = Logger;
    this.socket = Socket;
  }
}
