const express = require("express");
const { getAIQuestion } = require("../service/ai_question_service");
const router = express.Router();

router.get("", getAIQuestion);

module.exports = router;
