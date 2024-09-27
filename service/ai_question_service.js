const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { AIGenseratePrompt } = require("../AI-LLM/prompt");
const { StructuredOutputParser } = require("langchain/output_parsers");
const { z } = require("zod");
const AImodel = require("../AI-LLM/gentAImodel");

const getAIQuestion = async (questions, subject) => {
  const prompt = AIGenseratePrompt(questions, subject);
  const promptTemplate = ChatPromptTemplate.fromTemplate(prompt);

  const outputParser = StructuredOutputParser.fromZodSchema(
    z.array(
      z.object({
        question: z.string().describe("Name of question"),
        A: z.string().describe("Name of answer with symbol A"),
        B: z.string().describe("Name of answer with symbol B"),
        C: z.string().describe("Name of answer with symbol C"),
        D: z.string().describe("Name of answer with symbol D"),
        correctAnswer: z.string().describe("Name of correct answer symbol"),
      })
    )
  );

  const chain = promptTemplate.pipe(AImodel).pipe(outputParser);

  const response = await chain.invoke({
    format_instuction: outputParser.getFormatInstructions(),
  });
  console.log(response);
  return response;
};

module.exports = { getAIQuestion };
