import express from "express";
import { desktopRoute, apiRoute } from "./Routes";

class Server {
    app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(express.static('static/desktop/'));
        this.app.use(express.static('upload/'));
        this.routing();
    };

    private routing() {
        this.app.use(apiRoute);
        this.app.use(desktopRoute);
    };

    /**
     * @description Start Server
     */
    
    public start() {
        this.app.listen(3000);
        console.log('env = ', process.env)
    };
};

new Server().start();