import User from "./User.js";
import Medication from "./Medication.js";
import DoseLog from "./DoseLog.js";

User.hasMany(Medication, { foreignKey: "userId", onDelete: "CASCADE" });
Medication.belongsTo(User, { foreignKey: "userId" });

User.hasMany(DoseLog, { foreignKey: "userId", onDelete: "CASCADE" });
DoseLog.belongsTo(User, { foreignKey: "userId" });

Medication.hasMany(DoseLog, { foreignKey: "medicationId", onDelete: "CASCADE" });
DoseLog.belongsTo(Medication, { foreignKey: "medicationId" });

export {
  User,
  Medication,
  DoseLog,
};