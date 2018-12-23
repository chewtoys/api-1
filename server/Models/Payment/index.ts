export default (sequelize: any, Sequelize: any) => {

  const Payment = sequelize.define('payment', {
    id_payment: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true
    },
    terminal_key: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    id_order: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true
    },
    success: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      notEmpty: true
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    error_code: {
      type: Sequelize.STRING,
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
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    exp_date: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    }
  });

  return Payment;

}