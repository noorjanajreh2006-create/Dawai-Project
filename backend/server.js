import "dotenv/config";

import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import sequelize from "./config/db.js";
import "./models/index.js";

import authRoutes from "./routes/authRoutes.js";
import medicationRoutes from "./routes/medicationRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Dawai API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/stats", statsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

async function ensureDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
  });

  const databaseName = process.env.DB_NAME || "dawai";
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``);
  await connection.end();
}

ensureDatabase()
  .then(() => sequelize.sync())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database error:", err.message);
    process.exit(1);
  });
