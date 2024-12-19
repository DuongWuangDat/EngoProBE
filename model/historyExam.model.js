const { default: mongoose } = require("mongoose");
const CheckQuestion = require("./checkAnswer.model");
const { toJson } = require("./plugin");

const historyExamSchema = mongoose.Schema(
  {
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    checkQuestions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CheckQuestion",
        required: true,
      },
    ],
    turn: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

historyExamSchema.plugin(toJson);
historyExamSchema.index({ user: 1, exam: 1, createdAt: -1 });

const HistoryExam = mongoose.model("historyExam", historyExamSchema);

module.exports = HistoryExam;
