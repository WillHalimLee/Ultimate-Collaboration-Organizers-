const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class User extends Model {}

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false, // Set to true if the name is optional
        validate: {
            notEmpty: true, // Ensures the name is not an empty string
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 100],
        },
    },
}, {
    sequelize,
    modelName: 'user',
    timestamps: true, // Enable timestamps if desired

});

module.exports = User;