import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

// Medication model stores medication information for each user
const Medication = sequelize.define("Medication", {

  // Medication name
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Medication dose value
  dose: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Medication schedule time
  times: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Optional notes for the medication
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  // Current medication status
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Scheduled",
  },
});

export default Medication;