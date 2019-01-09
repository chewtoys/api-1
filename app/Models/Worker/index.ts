/**
 * @description Работник
 */

export default (sequelize: any, Sequelize: any) => {
  const Worker = sequelize.define("worker", {
    worker_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      notEmpty: true
    },
    telegram_id: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    telegram_first_name: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    telegram_last_name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    telegram_username: {
      type: Sequelize.STRING,
      allowNull: true
    },
    ready: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      notEmpty: true,
      defaultValue: false
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ["telegram_id"]
      }
    ],
    freezeTableName: true,
    tableName: "workers",
    underscored: true
  });
  
  return Worker;
}
