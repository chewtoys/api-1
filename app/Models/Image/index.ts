/**
 * @description Изображение товара
 */

export default (sequelize: any, Sequelize: any) => {
  const Image = sequelize.define("image", {
    unit_name: {
      type: Sequelize.STRING(20),
      primaryKey: true,
      allowNull: false,
      notEmpty: true
    },
    unit_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      notEmpty: true
    },
    name: {
      type: Sequelize.STRING(20),
      primaryKey: true,
      allowNull: false,
      notEmpty: true
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    }
  }, {
    freezeTableName: true,
    tableName: "images",
    underscored: true
  });

  return Image;
}