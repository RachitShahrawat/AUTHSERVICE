'use strict';
const {
  Model
} = require('sequelize');

const {SALT}=require('../config/serverConfig');

const bcrypt=require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:true,// whether user is sending correct email or not
      }

    },
    password: {
      type:DataTypes.STRING,
        allowNull: false,
        validate:{
          len:[3,100], // password length should be between 3 to 100 characters
        }
      }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user)=>{
   const encryptedPassword=bcrypt.hashSync(user.password,SALT);
   user.password=encryptedPassword;
  });
  return User;
};