/**
 * @description Проект
 */

export default (sequelize: any, Sequelize: any) => {
  const Project = sequelize.define("project", {
    project_id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      notEmpty: true
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      notEmpty: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    terminal_key: {
      type: Sequelize.STRING(50),
      allowNull: false,
      notEmpty: true
    },
    terminal_demokey: {
      type: Sequelize.STRING(50),
      allowNull: false,
      notEmpty: true
    },
    terminal_password: {
      type: Sequelize.STRING(50),
      allowNull: false,
      notEmpty: true
    },
    terminal_demopassword: {
      type: Sequelize.STRING(50),
      allowNull: false,
      notEmpty: true
    },
    production: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      notEmpty: true,
      defaultValue: false
    },
    actual: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      notEmpty: true,
      defaultValue: true
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ["terminal_key"]
      },
      {
        unique: true,
        fields: ["terminal_demokey"]
      }
    ],
    freezeTableName: true,
    tableName: "projects",
    underscored: true
  });

  return Project;
}