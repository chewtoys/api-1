export default (sequelize: any, Sequelize: any) => {
  // console.log(Sequelize);

  const Order = sequelize.define("order", {
    idorder: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true,
    },
    idclient: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true,
    },
    idcourier: {
      type: Sequelize.INTEGER,
      allowNull: true,
      notEmpty: true,
    },
    idstate: {
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
    paid: {
      type: Sequelize.BOOLEAN,
      defaultValue: 0,
      allowNull: false,
      notEmpty: true,
    },
    comment: {
      type: Sequelize.STRING,
      allowNull: true,
      notEmpty: false,
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
  });

  return Order;
};
