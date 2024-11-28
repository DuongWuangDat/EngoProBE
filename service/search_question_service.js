const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { DictionaryPrompt, HumanSearch } = require("../AI-LLM/prompt");
const ChatAImodel = require("../AI-LLM/gentAImodel");
const { response } = require("express");

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", DictionaryPrompt],
  ["human", HumanSearch],
]);

const searchForKeyword = async (keyword, context) => {
  const chain = promptTemplate.pipe(ChatAImodel);
  const response = await chain.invoke({
    keyword: keyword,
    context: context,
  });

  return response.content;
};

module.exports = { searchForKeyword };
