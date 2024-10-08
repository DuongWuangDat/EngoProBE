const express = require("express");
const { GetChatBotMessage } = require("../controller/chatbot.controller");
const router = express.Router();

router.post("", GetChatBotMessage);

module.exports = router;
