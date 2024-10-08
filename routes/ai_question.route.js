const express = require("express");
const { getAIQuestion } = require("../service/ai_question.service");
const router = express.Router();

router.get("", getAIQuestion);

module.exports = router;
