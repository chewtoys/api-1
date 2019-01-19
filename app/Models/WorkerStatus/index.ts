/**
 * @description Статус курьера
 */

export default (sequelize: any, Sequelize: any) => {
  const WorkerStatus = sequelize.define("worker_status", {
    status_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    tableName: "workers_statuses",
    underscored: true
  });

  return WorkerStatus;
}