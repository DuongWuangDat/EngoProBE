const { getChatBotMessage } = require("../service/chatbot.service");
const { catchAsync } = require("../utils/catchAsync");

const GetChatBotMessage = catchAsync(async (req, res) => {
  const humanReq = req.body.message;
  console.log(humanReq);
  const aiResponse = await getChatBotMessage(humanReq);
  return res.json({
    response: aiResponse,
  });
});

module.exports = { GetChatBotMessage };
