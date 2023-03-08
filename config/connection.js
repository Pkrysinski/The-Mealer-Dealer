const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.MYSQLDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD,
    {
      // host: 'localhost',
      host: process.env.MYSQLHOST,
      dialect: 'mysql',
      port: process.env.MYSQLPORT
    }
  );
}

module.exports = sequelize;
