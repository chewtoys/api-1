export default (sequelize: any, Sequelize: any) => {

  const Product = sequelize.define('product', {
    idproduct: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true
    },
    idcategory: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
      notEmpty: true
    },
    specification: {
      type: Sequelize.STRING,
      allowNull: true,
      notEmpty: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    big_img: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    small_img: {
      type: Sequelize.STRING,
      allowNull: true,
      notEmpty: true
    },
    bad_img: {
      type: Sequelize.STRING,
      allowNull: true,
      notEmpty: true
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: true,
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
      type: Sequelize.STRING,
      allowNull: true,
      notEmpty: true
    }
  });

  return Product;

}