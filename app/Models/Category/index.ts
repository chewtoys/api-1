/**
 * @description Категория товара
 */

export default (sequelize: any, Sequelize: any) => {
  const Category = sequelize.define("category", {
    category_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      notEmpty: true
    },
    fk_project_id: {
      type: Sequelize.STRING(20),
      allowNull: false,
      notEmpty: true
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      notEmpty: true
    },
    alias: {
      type: Sequelize.STRING(50),
      allowNull: false,
      notEmpty: true
    },
    actual: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      notEmpty: true,
      defaultValue: true
    }
  }, {
    freezeTableName: true,
    tableName: "categories",
    underscored: true
  });

  return Category;
}