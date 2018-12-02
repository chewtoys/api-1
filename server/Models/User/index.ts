export default (sequelize: any, Sequelize: any) => {

  const User = sequelize.define('user', {
   iduser: {
     autoIncrement: true,
     primaryKey: true,
     type: Sequelize.INTEGER,
     allowNull: false,
     notEmpty: true
   },
   idusertype: {
     type: Sequelize.INTEGER,
     allowNull: false,
     notEmpty: true 
   },
   name: {
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
     allowNull: true,
     notEmpty: true
   },
   phone: {
     type: Sequelize.STRING,
     allowNull: true,
     notEmpty: true
   },
   avatar: {
    type: Sequelize.STRING,
    allowNull: true,
    notEmpty: true
   },
   vk_id: {
     type: Sequelize.INTEGER,
     allowNull: true,
     notEmpty: true
   },
   vk_url: {
    type: Sequelize.STRING,
    allowNull: true,
    notEmpty: true
   },
   ok_id: {
     type: Sequelize.INTEGER,
     allowNull: true,
     notEmpty: true
   },
   ok_url: {
     type: Sequelize.STRING,
     allowNull: true,
     notEmpty: true
   },
   phone_confirmed: {
     type: Sequelize.BOOLEAN,
     default: 0,
     allowNull: false,
     notEmpty: true
   },
   email_confirmed: {
     type: Sequelize.BOOLEAN,
     default: 0,
     allowNull: false,
     notEmpty: true
   }
 });

  return User;
  
}