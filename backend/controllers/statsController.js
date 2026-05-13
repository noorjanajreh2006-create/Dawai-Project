import { DoseLog } from "../models/index.js";

export async function getStats(req, res) {
  try {
    const logs = await DoseLog.findAll({
      where: { userId: req.user.id },
      order: [["date", "ASC"]],
    });

    const today = new Date();
    const stats = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - index));
      const dateKey = date.toISOString().slice(0, 10);
      const dayLogs = logs.filter((log) => log.date === dateKey);
      const taken = dayLogs.filter((log) => log.status === "taken").length;
      const totalExpected = Math.max(dayLogs.length, 1);

      return {
        name: date.toLocaleDateString("en-US", { weekday: "short" }),
        date: dateKey,
        adherence: Math.round((taken / totalExpected) * 100),
      };
    });

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
