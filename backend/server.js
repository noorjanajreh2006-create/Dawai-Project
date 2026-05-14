const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chatRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Dawai chat API is running" });
});

app.use("/api/chat", chatRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Chat server running on http://localhost:${PORT}`);
});
