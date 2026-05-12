const { Sequelize } = require('sequelize'); 
require('dotenv').config();

const sequelize = new Sequelize (  //  i use sequelize to CONNECT with DB MySQL
  process.env.DB_NAME, // the names must be same as the ones in .env file
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
);

module.exports = sequelize;