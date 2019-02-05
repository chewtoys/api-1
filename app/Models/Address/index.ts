/**
 * @description Адреса доставки
 */

export default (sequelize: any, Sequelize: any) => {
  const Address = sequelize.define(
    "address",
    {
      fk_user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        notEmpty: true,
      },
      fk_house_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        notEmpty: true,
      },
      point: {
        type: Sequelize.GEOMETRY("POINT"),
        primaryKey: true,
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
        allowNull: false,
        notEmpty: true,
      },
      intercom: {
        type: Sequelize.STRING,
        allowNull: true,
        notEmpty: true,
      },
      level: {
        type: Sequelize.STRING,
        allowNull: true,
        notEmpty: true,
      },
      alias: {
        type: Sequelize.STRING,
        allowNull: false,
        notEmpty: true,
      },
    },
    {
      freezeTableName: true,
      tableName: "addresses",
      underscored: true,
    }
  );

  return Address;
};
