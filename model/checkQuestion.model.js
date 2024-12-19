const mongoose = require("mongoose");
const { toJson } = require("./plugin");

const checkQuestionSchema = new mongoose.Schema(
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
		questionNumber: {
			type: Number,
			required: true,
		},
		partNumber: {
			type: Number,
			required: true,
			min: 1,
			max: 7,
		},
		selectedOption: {
			type: String,
			required: true,
		},
		correctAnswer: {
			type: String,
			required: true,
		},
		isCorrect: {
			type: Boolean,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

checkQuestionSchema.index({
	exam: 1,
	user: 1,
	partNumber: 1,
	questionNumber: 1,
});

checkQuestionSchema.plugin(toJson);

module.exports = mongoose.model("CheckQuestion", checkQuestionSchema);
