const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class User extends Model {}

User.init({
    Fname: {
        type: DataTypes.STRING,
        allowNull: false, // Set to true if the name is optional
        validate: {
            notEmpty: true, // Ensures the name is not an empty string
        },
    },
    Lname: {
        type: DataTypes.STRING,
        allowNull: false, // Set to true if the name is optional
        validate: {
            notEmpty: true, // Ensures the name is not an empty string
        },
    },
    phone: {
        type: DataTypes.NUMBER,
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
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 100],
        },
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    job: {
        type: DataTypes.STRING,
        allowNull: false,

    },
}, {
    sequelize,
    modelName: 'user',
    timestamps: true, // Enable timestamps if desired

});

module.exports = User;