import fs = require('fs');
import path = require('path');
import sequelize = require('sequelize');

const Sequelize = new sequelize(
  'kfc',
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: 'node3.ortant.ru',
    dialect: 'mysql',
    operatorsAliases: false
  }
);

const db: any = {};

fs
  .readdirSync(__dirname)
  .filter((folder: string) => {
    return (folder.indexOf('.') === -1);
  })
  .forEach((folder: string) => {
    const model = Sequelize.import(path.join(__dirname, folder, 'index.js'));
    db[model.name[0].toUpperCase() + model.name.slice(1)] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;