import express from "express";
import path from "path";
import http from "http";
import fs from "fs";
import MarkdownIt from "markdown-it";

const App = express();

App.use(express.static('static/desktop/'));
App.use(express.static('upload/'));
App.use(express.static('markdown/styles'));

App.get('/policy-privacy', (req: express.Request, res: express.Response) => {
  const md = new MarkdownIt();
  const text = fs.readFileSync(path.resolve(process.cwd(), "markdown/policy-privacy.md"), "utf8");
  const html = `
    <html>
      <head>
        <link rel="stylesheet" href="https://laapl.ru/github-markdown.css">
      </head>
      <body>
        ${md.render(text)}
      </body>
    </html>
  `;
  res.send(html);
});

App.get("*", (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve(process.cwd(), "static/desktop/index.html"));
});

const Server = http.createServer(App);

Server.listen(9002);