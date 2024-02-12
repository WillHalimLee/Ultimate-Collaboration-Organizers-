// backend/src/config/sequelize.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path_to_your_database_file/database.sqlite', // Update the path as necessary
});

module.exports = sequelize;
