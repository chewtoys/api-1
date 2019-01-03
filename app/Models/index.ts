/**
 * Загрузчик моделей
 * @author Nikita Bersenev
 */

import fs = require("fs");
import path = require("path");
import sequelize = require("sequelize");

const Sequelize = new sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  dialect: "mysql",
  operatorsAliases: false,
});

fs.readdirSync(__dirname)
  .filter((folder: string) => {
    return folder.indexOf(".") === -1;
  })
  .forEach((folder: string) => {
    Sequelize.import(path.join(__dirname, folder, "index.js"));
  });

export default Sequelize;
