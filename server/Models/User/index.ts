export default (sequelize: any, Sequelize: any) => {

  const User = sequelize.define('user', {
    iduser: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    idusertype: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true 
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    }
  });

  return User;

}