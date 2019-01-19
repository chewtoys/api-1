/**
 * @description Курьер
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
    fk_status_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true,
      defaultValue: false
    },
    telegram_first_name: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    telegram_last_name: {
      type: Sequelize.STRING,
      allowNull: true,
      notEmpty: true
    },
    telegram_username: {
      type: Sequelize.STRING,
      allowNull: true,
      notEmpty: true
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
