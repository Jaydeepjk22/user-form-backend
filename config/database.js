import { Sequelize } from "sequelize";

const sequelize = new Sequelize("jdTestDb", "admin", "password", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
