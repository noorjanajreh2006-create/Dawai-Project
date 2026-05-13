const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Medication = sequelize.define("Medication", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dose: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  times: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Scheduled",
  },
});

module.exports = Medication;
