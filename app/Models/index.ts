/**
 * Инициализация базы данных
 * @author Nikita Bersenev
 */

import fs from 'fs';
import path from 'path';
import sequelize from 'sequelize';

const Sequelize = new sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  dialect: "mysql",
  operatorsAliases: false,
});

fs
  .readdirSync(__dirname)
  .filter((folder: string) => {
    return (folder.indexOf('.') === -1);
  })
  .forEach((folder: string) => {
    Sequelize.import(path.join(__dirname, folder, 'index.js'));
  });

// Связи таблиц
const Category = Sequelize.models.category;
const Message = Sequelize.models.message;
const MessageType = Sequelize.models.message_type;
const Order = Sequelize.models.order;
const OrderData = Sequelize.models.order_data;
const OrderStatus = Sequelize.models.order_status;
const Payment = Sequelize.models.payment;
const Product = Sequelize.models.product;
const Project = Sequelize.models.project;
const User = Sequelize.models.user;
const Worker = Sequelize.models.worker;

Category.belongsTo(Project, { foreignKey: "fk_project_id", targetKey: "project_id" });
Project.hasMany(Category, { foreignKey: "fk_project_id", sourceKey: "project_id" });

Message.belongsTo(MessageType, { foreignKey: "fk_type_id", targetKey: "type_id" });
MessageType.hasMany(Message, { foreignKey: "fk_type_id", sourceKey: "type_id" });
Message.belongsTo(Worker, { foreignKey: "fk_telegram_id", targetKey: "telegram_id" });
Worker.hasMany(Message, { foreignKey: "fk_telegram_id", sourceKey: "telegram_id" });

Order.belongsTo(Project, { foreignKey: "fk_project_id", targetKey: "project_id" });
Project.hasMany(Order, { foreignKey: "fk_project_id", sourceKey: "project_id" });
Order.belongsTo(User, { foreignKey: "fk_user_id", targetKey: "user_id" });
User.hasMany(Order, { foreignKey: "fk_user_id", sourceKey: "user_id" });
Order.belongsTo(Worker, { foreignKey: "fk_worker_id", targetKey: "worker_id" });
Worker.hasMany(Order, { foreignKey: "fk_worker_id", sourceKey: "worker_id" });
Order.belongsTo(OrderStatus, { foreignKey: "fk_status_id", targetKey: "status_id" });
OrderStatus.hasMany(Order, { foreignKey: "fk_status_id", sourceKey: "status_id" });

OrderData.belongsTo(Order, { foreignKey: "fk_order_id", targetKey: "order_id" });
Order.hasMany(OrderData, { foreignKey: "fk_order_id", sourceKey: "order_id" });
OrderData.belongsTo(Product, { foreignKey: "fk_product_id", targetKey: "product_id" });
Product.hasMany(OrderData, { foreignKey: "fk_product_id", sourceKey: "product_id" });

Payment.belongsTo(Order, { foreignKey: "fk_order_id", targetKey: "order_id" });
Order.hasOne(Payment, { foreignKey: "fk_order_id" });

Product.belongsTo(Category, { foreignKey: "fk_category_id", targetKey: "category_id" });
Category.hasMany(Product, { foreignKey: "fk_category_id", sourceKey: "category_id" });

/**
 * Синхронизация таблиц
 * Не использовать Sequelize.sync(), так как важен порядок!
 */
(async() => {
  await Project.sync();
  await User.sync();
  await Worker.sync();
  await OrderStatus.sync();
  await Order.sync();
  await Category.sync();
  await Product.sync();
  await OrderData.sync();
  await MessageType.sync();
  await Message.sync();
  await Payment.sync();
})();

export default Sequelize;