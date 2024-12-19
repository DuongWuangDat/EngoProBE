const mongoose = require("mongoose");
const { toJson } = require("./plugin");

const questionSchema = new mongoose.Schema(
	{
		exam: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Exam",
			required: true,
		},
		questionNumber: {
			type: Number,
			required: true,
		},
		correctAnswer: {
			type: String,
			required: true,
		},
		partNumber: {
			type: Number,
			required: true,
			min: 1,
			max: 7
		}
	},
	{
		timestamps: true,
	}
);

// Create compound index for efficient querying
questionSchema.index({ exam: 1, questionNumber: 1, partNumber: 1 });

questionSchema.plugin(toJson);

module.exports = mongoose.model("Question", questionSchema);
