const express = require("express");
const { GetChatBotMessage } = require("../controller/chatbot_controller");
const router = express.Router();

router.post("", GetChatBotMessage);

module.exports = router;
