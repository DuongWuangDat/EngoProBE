const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
require("dotenv").config();
const ChatAImodel = new ChatGoogleGenerativeAI({
  streaming: true,
  model: "gemini-pro",
  temperature: 0.7
});

module.exports = ChatAImodel;
