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
      type: Sequelize.STRING(20),
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
    fk_house_type_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true
    },
    point: {
      type: Sequelize.GEOMETRY("POINT"),
      allowNull: false,
      notEmpty: true
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true,
    },
    entrance: {
      type: Sequelize.STRING,
      allowNull: true,
      notEmpty: false
    },
    apartment: {
      type: Sequelize.STRING,
      allowNull: true,
      notEmpty: false
    },
    intercom: {
      type: Sequelize.STRING,
      allowNull: true,
      notEmpty: false
    },
    comment: {
      type: Sequelize.STRING,
      allowNull: true,
      notEmpty: false
    },
    delivery_cost: {
      type: Sequelize.FLOAT,
      allowNull: false,
      notEmpty: true
    },
    order_datetime: {
      type: Sequelize.DATE,
      allowNull: true,
      notEmpty: true
    },
    finish_datetime: {
      type: Sequelize.DATE,
      allowNull: true,
      notEmpty: true
    }
  }, {
    freezeTableName: true,
    tableName: "orders",
    underscored: true
  });

  return Order;
};