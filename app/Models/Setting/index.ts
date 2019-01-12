/**
 * @description Настройки
 */

export default (sequelize: any, Sequelize: any) => {
  const Setting = sequelize.define("setting", {
    setting_id: {
      type: Sequelize.STRING(20),
      primaryKey: true,
      allowNull: false,
      notEmpty: true
    },
    fk_project_id: {
      type: Sequelize.STRING(20),
      allowNull: false,
      notEmpty: true
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    }
  }, {
    freezeTableName: true,
    tableName: "settings",
    underscored: true
  });

  return Setting;
}