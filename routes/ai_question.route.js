const express = require("express");
const { GetAIQuestion } = require("../controller/ai_question.controller");
const router = express.Router();

router.get("", GetAIQuestion);

module.exports = router;
