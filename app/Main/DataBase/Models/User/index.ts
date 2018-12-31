const Sequelize = require("sequelize");
export class User extends Sequelize.Model {
  static init(sequelize: any, DataTypes: any) {
    return super.init(
      {
        iduser: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          notEmpty: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          notEmpty: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true,
          notEmpty: true,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
          notEmpty: true,
        },
        avatar: {
          type: DataTypes.STRING,
          allowNull: true,
          notEmpty: true,
        },
        vk_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          notEmpty: true,
        },
        vk_url: {
          type: DataTypes.STRING,
          allowNull: true,
          notEmpty: true,
        },
        ok_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          notEmpty: true,
        },
        ok_url: {
          type: DataTypes.STRING,
          allowNull: true,
          notEmpty: true,
        },
        phone_confirmed: {
          type: DataTypes.BOOLEAN,
          default: 0,
          allowNull: false,
          notEmpty: true,
        },
        email_confirmed: {
          type: DataTypes.BOOLEAN,
          default: 0,
          allowNull: false,
          notEmpty: true,
        },
      },
      { sequelize }
    );
  }
}
