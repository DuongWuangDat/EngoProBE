const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
require("dotenv").config();
const AImodel = new ChatGoogleGenerativeAI({
  model: "gemini-pro",
  temperature: 0.7,
  maxOutputTokens: 2048,
});

module.exports = AImodel;
