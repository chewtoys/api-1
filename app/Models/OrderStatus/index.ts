/**
 * @description Состояние заказа
 */

export default (sequelize: any, Sequelize: any) => {
  const OrderStatus = sequelize.define("order_status", {
    status_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      notEmpty: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ["name"]
      }
    ],
    freezeTableName: true,
    tableName: "orders_statuses",
    underscored: true
  });

  return OrderStatus;
}