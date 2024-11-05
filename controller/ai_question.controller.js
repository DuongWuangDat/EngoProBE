const { getAIQuestionSrv } = require("../service/ai_question.service");
const { catchAsync } = require("../utils/catchAsync");

const GetAIQuestion = catchAsync(async (req, res) => {
  const questions = req.query.questions;
  const subject = req.query.subject;
  const data = await getAIQuestionSrv(questions, subject);

  console.log("hello");
  return res.json({ data });
});

module.exports = { GetAIQuestion };
