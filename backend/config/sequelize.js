const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST || '127.0.0.1',
  dialect: 'mysql'
});

// Verify the connection and synchronize models
(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      
      // Synchronize all models
      await sequelize.sync();
      console.log('All models were synchronized successfully.');
    } catch (error) {
      console.error('Unable to connect to the database or synchronize models:', error);
    }
  })();
module.exports = sequelize;
