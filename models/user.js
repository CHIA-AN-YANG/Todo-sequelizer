'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class User extends Model { static associate(models) { User.hasMany(models.Todo),{foreignKey : 'userId'} }};

  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
      }  
    }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};