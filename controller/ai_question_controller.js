const { getAIQuestion } = require("../service/ai_question_service");
const catchAsync = require("../utils/catchAsync");

const GetAIQuestion = catchAsync(async (req, res) => {
  const questions = req.query.questions;
  const subject = req.query.subject;
  const data = await getAIQuestion(questions, subject);

  console.log("hello");
  return res.json({ data });
});
