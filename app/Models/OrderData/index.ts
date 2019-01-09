/**
 * @description Содержимое заказа
 */

export default (sequelize: any, Sequelize: any) => {
  const OrderData = sequelize.define("order_data", {
    fk_order_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      notEmpty: true
    },
    fk_product_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      notEmpty: true
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true
    }
  }, {
    freezeTableName: true,
    tableName: "orders_data",
    underscored: true
  });

  return OrderData;
}