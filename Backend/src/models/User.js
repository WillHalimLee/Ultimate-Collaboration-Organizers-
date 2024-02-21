// User.js
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class User extends Model {}

User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING, // Hashed passwords
}, { sequelize, modelName: 'user' });

module.exports = User;
