const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("jdTestDb", "admin", "password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
