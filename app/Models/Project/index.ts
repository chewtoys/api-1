export default (sequelize: any, Sequelize: any) => {

  const Project = sequelize.define('project', {
    idproject: {
      primaryKey: true,
      type: Sequelize.STRING,
      allowNull: false,
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
    key: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    demokey: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    demopassword: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    start_date: {
      type: Sequelize.DATE,
      allowNull: false,
      notEmpty: true
    },
    end_date: {
      type: Sequelize.DATE,
      allowNull: false,
      notEmpty: true
    },
  });

  return Project;

}