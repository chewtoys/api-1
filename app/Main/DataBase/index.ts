/**
 * Загрузчик моделей
 * @author Nikita Bersenev
 */

import fs from "fs";
import path from "path";
import sequelize, { Model } from "sequelize";
// import Models from "./Models";

const Sequelize = new sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  dialect: "mysql",
  operatorsAliases: false,
});

fs.readdirSync(__dirname + "/Models")
  .filter((folder: string) => {
    return folder.indexOf(".") === -1;
  })
  .forEach((folder: string) => {
    Sequelize.import(path.join(__dirname, folder, "index.js"));
  });

export default Sequelize;
