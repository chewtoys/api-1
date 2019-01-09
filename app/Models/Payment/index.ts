/**
 * @description Платеж
 */

export default (sequelize: any, Sequelize: any) => {
  const Payment = sequelize.define("payment", {
    payment_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      notEmpty: true
    },
    fk_order_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true
    },  
    rebill_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      notEmpty: true
    },
    terminal_key: {
      type: Sequelize.STRING(100),
      allowNull: false,
      notEmpty: true
    },
    success: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      notEmpty: true
    },
    status: {
      type: Sequelize.STRING(50),
      allowNull: false,
      notEmpty: true
    },
    error_code: {
      type: Sequelize.STRING(100),
      allowNull: false,
      notEmpty: true
    },
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
      notEmpty: true
    },
    card_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true
    },
    pan: {
      type: Sequelize.STRING(50),
      allowNull: false,
      notEmpty: true
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    }
  }, {
    freezeTableName: true,
    tableName: "payments",
    underscored: true
  });

  return Payment;
} 