const {
  ChatPromptTemplate,
  MessagesPlaceholder,
} = require("@langchain/core/prompts");
const { chatBotPrompt } = require("../prompt");
const ChatAImodel = require("../gentAImodel");
const { MongoClient, ObjectId } = require("mongodb");
const { BufferMemory } = require("langchain/memory");
const { MongoDBChatMessageHistory } = require("@langchain/mongodb");
const { ConversationChain } = require("langchain/chains");
require("dotenv").config();
const uri = process.env.MONGODB_ATLAS_URI || "";
const client = new MongoClient(uri, {
  driverInfo: { name: "langchainjs" },
});

const ConnectDB = async () => {
  await client.connect();
};
ConnectDB();
const collection = client.db("langchain").collection("memory");

const sessionID = new ObjectId().toString();

const memory = new BufferMemory({
  memoryKey: "history",
  chatHistory: new MongoDBChatMessageHistory({
    collection,
    sessionId: sessionID,
  }),
});

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", chatBotPrompt],
  ["human", "{input}"],
]);

const conversationChain = new ConversationChain({
  llm: ChatAImodel,
  memory: memory,
  prompt: promptTemplate,
});

module.exports = { conversationChain, memory };
