/**
 * @description Пользователь
 */

export default (sequelize: any, Sequelize: any) => {
  const User = sequelize.define("user", {
    user_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      notEmpty: true
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: true,
      notEmpty: true
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: true,
      notEmpty: true
    },
    email_confirmed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      notEmpty: true,
      defaultValue: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
      notEmpty: true
    },
    phone: {
      type: Sequelize.STRING(11),
      allowNull: false,
      notEmpty: true
    },
    phone_confirmed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      notEmpty: true,
      defaultValue: false
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: true,
      notEmpty: true
    },
    vk_id: {
      type: Sequelize.STRING(20),
      allowNull: true,
      notEmpty: true
    },
    vk_url: {
      type: Sequelize.STRING,
      allowNull: true,
      notEmpty: true
    },
    ok_id: {
      type: Sequelize.STRING(20),
      allowNull: true,
      notEmpty: true
    },
    ok_url: {
      type: Sequelize.STRING,
      allowNull: true,
      notEmpty: true
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ["phone"]
      },
      {
        unique: true,
        fields: ["email"]
      },
      {
        unique: true,
        fields: ["vk_id"]
      },
      {
        unique: true,
        fields: ["ok_id"]
      }
    ],
    freezeTableName: true,
    tableName: "users",
    underscored: true
  });

  return User;
}