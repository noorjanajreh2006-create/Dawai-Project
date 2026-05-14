const express = require("express");
const { chatReply } = require("../controllers/chatController");

const router = express.Router();

router.post("/", chatReply);

module.exports = router;
