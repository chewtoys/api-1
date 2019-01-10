/**
 * @description Товар
 */

export default (sequelize: any, Sequelize: any) => {
  const Product = sequelize.define("product", {
    product_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      notEmpty: true
    },
    fk_category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      notEmpty: true
    },
    specification: {
      type: Sequelize.STRING(50),
      allowNull: true,
      notEmpty: true
    },
    title: {
      type: Sequelize.STRING(50),
      allowNull: false,
      notEmpty: true
    },
    description: {
      type: Sequelize.STRING(1000),
      allowNull: false,
      notEmpty: true
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
      notEmpty: true
    },
    energy_value: {
      type: Sequelize.INTEGER,
      allowNull: true,
      notEmpty: true
    },
    fat: {
      type: Sequelize.INTEGER,
      allowNull: true,
      notEmpty: true
    },
    protein: {
      type: Sequelize.INTEGER,
      allowNull: true,
      notEmpty: true
    },
    starch: {
      type: Sequelize.INTEGER,
      allowNull: true,
      notEmpty: true
    },
    mass: {
      type: Sequelize.INTEGER,
      allowNull: true,
      notEmpty: true
    },
    mass_unit: {
      type: Sequelize.STRING(10),
      allowNull: true,
      notEmpty: true
    },
    actual: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      notEmpty: true,
      defaultValue: true
    },
    popularity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true,
      defaultValue: 0
    }
  }, {
    freezeTableName: true,
    tableName: "products",
    underscored: true
  });

  return Product;
}