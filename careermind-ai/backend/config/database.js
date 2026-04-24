const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQL Database Connected successfully (SQLite)!');
    // Sync models
    await sequelize.sync({ alter: true });
    console.log('All SQL models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the SQL database:', error);
  }
};

module.exports = { sequelize, connectDB };
