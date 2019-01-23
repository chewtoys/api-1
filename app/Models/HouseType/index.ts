/**
 * @description Тип дома
 */

export default (sequelize: any, Sequelize: any) => {
  const HouseType = sequelize.define("house_type", {
    house_type_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    tableName: "house_types",
    underscored: true
  });

  return HouseType;
}