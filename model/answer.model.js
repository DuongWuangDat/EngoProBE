const mongoose = require("mongoose");
const { toJson } = require("./plugin");
const { default: mongoose } = require("mongoose");
const AnswerSchema = mongoose.Schema(
	{
		answerSymbol: {
			type: String,
			maxLength: 1,
			default: null,
		},
		numberOfAnswer: {
			type: Number,
			required: true,
		},
		answer: {
			type: String,
			required: true,
		},
		isCorrect: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

AnswerSchema.plugin(toJson);

const Answer = mongoose.model("answer", AnswerSchema);

module.exports = Answer;
