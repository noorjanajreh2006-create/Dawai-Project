import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

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

export default DoseLog;
