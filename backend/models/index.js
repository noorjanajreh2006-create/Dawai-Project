const User = require("./User");
const Medication = require("./Medication");
const DoseLog = require("./DoseLog");

User.hasMany(Medication, { foreignKey: "userId", onDelete: "CASCADE" });
Medication.belongsTo(User, { foreignKey: "userId" });

User.hasMany(DoseLog, { foreignKey: "userId", onDelete: "CASCADE" });
DoseLog.belongsTo(User, { foreignKey: "userId" });

Medication.hasMany(DoseLog, { foreignKey: "medicationId", onDelete: "CASCADE" });
DoseLog.belongsTo(Medication, { foreignKey: "medicationId" });

module.exports = {
  User,
  Medication,
  DoseLog,
};
