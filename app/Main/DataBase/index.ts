/**
 * Загрузчик моделей
 * @author Nikita Bersenev
 */

// import fs from "fs";
// import path from "path";
import sequelize from "sequelize";
import { User } from "./Models";

const Sequelize = new sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  dialect: "mysql",
  operatorsAliases: false,
});

User.init(Sequelize, sequelize);

// fs.readdirSync(__dirname + "/Models")
//   .filter((folder: string) => {
//     return folder.indexOf(".") === -1;
//   })
//   .forEach((folder: string) => {
//     Sequelize.import(path.join(__dirname, folder, "index.js"));
//   });
(async () => {
  const test = await Sequelize.models.User.findAll();
  console.log(test);
})();

export default Sequelize;
