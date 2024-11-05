const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { AIGenseratePrompt } = require("../AI-LLM/prompt");
const { StructuredOutputParser } = require("langchain/output_parsers");
const { z } = require("zod");
const AImodel = require("../AI-LLM/gentAImodel");

const getAIQuestionSrv = async (questions, subject) => {
  const prompt = AIGenseratePrompt;
  console.log(prompt);
  const promptTemplate = ChatPromptTemplate.fromTemplate(prompt);

  const outputParser = StructuredOutputParser.fromZodSchema(
    z.array(
      z.object({
        question: z.string().describe("Name of question"),
        A: z.string().describe("Name of option with symbol A"),
        B: z.string().describe("Name of option with symbol B"),
        C: z.string().describe("Name of option with symbol C"),
        D: z.string().describe("Name of option with symbol D"),
        correctAnswer: z.string().describe("Name of correct answer symbol"),
        explanation: z.string().describe("Explanation of this question"),
      })
    )
  );

  const chain = promptTemplate.pipe(AImodel).pipe(outputParser);

  const response = await chain.invoke({
    format_instuction: outputParser.getFormatInstructions(),
    questions: questions,
    subject: subject,
  });
  console.log(response);
  return response;
};

module.exports = { getAIQuestionSrv };
