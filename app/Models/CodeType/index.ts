/**
 * @description Типы кодов
 */

export default (sequelize: any, Sequelize: any) => {
  const CodeType = sequelize.define("code_type", {
    type_id: {
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
    tableName: "codes_types",
    underscored: true
  });

  return CodeType;
}