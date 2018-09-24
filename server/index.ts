import express from "express";
import { desktopRoute } from "./Routes";

class Server {
    app: express.Application
    constructor() {
        this.app = express();
        this.routes();
    }

    private routes() {
        this.app.use(express.static('static/desktop/'));
        this.app.use(express.static('upload/'));
        this.app.use(desktopRoute);
    }

    /**
     * @description Start Server
     */
    public start() {
        this.app.listen(3000);
    }
}

new Server().start()