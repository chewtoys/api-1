/**
 * @description Тип сообщения Telegram
 */

export default (sequelize: any, Sequelize: any) => {
  const MessageType = sequelize.define("message_type", {
    type_id: {
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
    freezeTableName: true,
    tableName: "message_types",
    underscored: true
  });

  return MessageType;
}