export default (sequelize: any, Sequelize: any) => {
  const Setting = sequelize.define('setting', {
    idsetting: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true
    },
    idproject: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    value: {
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
    }
  }, {
    indexes: [
      {
        fields: ["idproject"]
      }
    ]
  });

  return Setting;
}