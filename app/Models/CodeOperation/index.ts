/**
 * @description Операции, требующие подтверждения
 */

export default (sequelize: any, Sequelize: any) => {
  const Operation = sequelize.define("code_operation", {
    operation_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      notEmpty: true
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      notEmpty: true
    }
  }, {
    freezeTableName: true,
    tableName: "codes_operations",
    underscored: true
  });

  return Operation;
}