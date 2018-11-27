import express from "express";
import path from "path";
import http from "http";

const App = express();

App.use(express.static('static/desktop/'));
App.use(express.static('upload/'));

App.get("*", (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve(process.cwd(), "static/desktop/index.html"));
});

const Server = http.createServer(App);

Server.listen(4000);