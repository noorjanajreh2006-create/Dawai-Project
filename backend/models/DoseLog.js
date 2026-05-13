const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const DoseLog = sequelize.define("DoseLog", {
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "taken",
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

module.exports = DoseLog;
