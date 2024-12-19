const mongoose = require("mongoose");
const { toJson } = require("./plugin");

const QuestionSchema = mongoose.Schema(
	{
		question: {
			required: true,
			type: String,
		},
		answers: [
			{
				required: true,
				type: mongoose.Schema.Types.ObjectId,
				ref: "Answer",
			},
		],
	},
	{
		timestamps: true,
	}
);

QuestionSchema.index({ difficulty: 1 });
QuestionSchema.plugin(toJson);

const Question = mongoose.model("question", QuestionSchema);

module.exports = Question;
