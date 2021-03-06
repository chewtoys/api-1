/**
 * @description Коды подтверждения
 */

import moment from "moment";

export default (sequelize: any, Sequelize: any) => {
  const Code = sequelize.define("code", {
    code_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      notEmpty: true
    },
    fk_type_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true
    },
    fk_operation_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      notEmpty: true
    },
    recipient: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    },
    code: {
      type: Sequelize.INTEGER(5),
      allowNull: false,
      notEmpty: true
    },
    lifetime: {
      type: Sequelize.DATE,
      allowNull: false,
      notEmpty: true,
      defaultValue: moment().add(30, "minutes").format("YYYY-MM-DD HH:mm:ss")
    },
    confirmed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      notEmpty: true,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    tableName: "codes",
    underscored: true
  });

  return Code;
}