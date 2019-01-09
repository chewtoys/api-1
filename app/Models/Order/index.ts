/**
 * @description Заказ
 */

export default (sequelize: any, Sequelize: any) => {
  const Order = sequelize.define("order", {
    order_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      notEmpty: true,
    },
    fk_project_id: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    fk_user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true,
    },
    fk_worker_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      notEmpty: true,
    },
    fk_status_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true,
    },
    lat: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      notEmpty: true,
    },
    lon: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      notEmpty: true,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true,
    },
    entrance: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true,
    },
    apartment: {
      type: Sequelize.STRING,
      allowNull: true,
      notEmpty: false,
    },
    intercom: {
      type: Sequelize.STRING,
      allowNull: true,
      notEmpty: false,
    },
    comment: {
      type: Sequelize.STRING,
      allowNull: true,
      notEmpty: false,
    },
    delivery_cost: {
      type: Sequelize.FLOAT,
      allowNull: false,
      notEmpty: true
    },
    order_datetime: {
      type: Sequelize.DATE,
      allowNull: false,
      notEmpty: true,
    },
    finish_datetime: {
      type: Sequelize.DATE,
      allowNull: true,
      notEmpty: true,
    },
  }, {
    freezeTableName: true,
    tableName: "orders",
    underscored: true
  });

  return Order;
};