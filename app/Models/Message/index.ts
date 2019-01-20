/**
 * @description Сообщение Telegram
 */

export default (sequelize: any, Sequelize: any) => {
  const Message = sequelize.define("message", {
    message_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      notEmpty: true
    },
    fk_telegram_id: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    fk_type_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true
    },
    unit_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      notEmpty: true
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    deleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      notEmpty: true,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: "messages",
    underscored: true
  });

  return Message;
}