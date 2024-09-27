const { ChatPromptTemplate } = require("@langchain/core/prompts");
const AImodel = require("../AI-LLM/gentAImodel");
const { chatBotPrompt } = require("../AI-LLM/prompt");
const { RunnableSequence } = require("@langchain/core/runnables");

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", chatBotPrompt],
  ["human", "{input}"],
]);

const getChatBotMessage = async (humanMsg) => {
  const chain = promptTemplate.pipe(AImodel);
  const response = await chain.invoke({
    input: humanMsg,
  });
  console.log(response);
  return response.content;
};

module.exports = { getChatBotMessage };
