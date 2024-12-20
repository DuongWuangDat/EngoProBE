const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const ApiError = require("./utils/ApiError");
const swagger = require("./swagger");
const validateDto = require("./pkg/middleware/validate-dto");
const server = require("http").createServer(app);
require("dotenv").config();
const {
  errorConverter,
  errorHandler,
} = require("./pkg/middleware/errorHandler");
const { authJWT, handleJWTError } = require("./pkg/middleware/authJWT");
const authRoute = require("./routes/auth.route");
const examRoute = require("./routes/exam.route");
const ChatbotRouter = require("./routes/chatbot.router");
const QuesAIRouter = require("./routes/ai_question.route");
const SearchRouter = require("./routes/search.route");
const vocabularyRoute = require("./routes/vocabulary.route");
require("dotenv").config();
const db_url = process.env.DB_URL;
const port = process.env.PORT;
const api = process.env.API_URI;
//---Connect DB ----//
mongoose.connect(db_url).then(() => {
  console.log("Connect MongoDB successfully");

  server.listen(port, () => {
    console.log("Listen at port: ", port);
  });
});

//---Connect DB ----//

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(authJWT());
app.use(handleJWTError);
app.use(express.json());
//-- Here we code --//
app.get("/ping", (req, res) => {
  res.json({
    message: "pong",
  });
});
app.use(`${process.env.API_URI}/auth`, authRoute);
app.use("/api-docs", swagger.serve, swagger.setup);
app.use(`${process.env.API_URI}/exam`, examRoute);
app.use(`${process.env.API_URI}/vocabulary`, vocabularyRoute);

app.use(`${api}/chatbot`, ChatbotRouter);
app.use(`${api}/aiquestion`, QuesAIRouter);
app.use(`${api}/search`, SearchRouter);
//-- Here we code --//

app.use((req, res, next) => {
  next(new ApiError(404, "Url not found!"));
});

app.use(errorConverter);
app.use(errorHandler);

//--Socket--//
const { Server } = require("socket.io");
const { conversationChain, memory } = require("./AI-LLM/chatModel/chatModel");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("chat_request", async (data) => {
    const humanMsg = data.message;
    console.log("Start chat");
    const response = await conversationChain.invoke({
      input: humanMsg,
    });
    console.log(response);
    io.to(socket.id).emit("chat_response", response.response);

    console.log("End chat");
  });
  socket.on("disconnect", () => {
    console.log(socket.id + "disconnect");
    memory.clear();
  });
});
