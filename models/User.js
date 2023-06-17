const { DataTypes } = require("sequelize");
const sequelize = require("../config/database.js");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, // Phone number format validation (e.g., +1234567890)
    },
  },
});

module.exports = User;
