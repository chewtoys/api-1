"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Routes_1 = require("./Routes");
class Server {
    constructor() {
        this.app = express_1.default();
        this.routes();
    }
    routes() {
        this.app.use(express_1.default.static('static/desktop/'));
        this.app.use(Routes_1.desktopRoute);
    }
    start() {
        this.app.listen(3000);
    }
}
new Server().start();
//# sourceMappingURL=index.js.map