const { default: mongoose } = require("mongoose");

const ExamTypeSchema = mongoose.Schema(
	{
		book: {
			type: String,
			required: true,
		},
		examType: {
			type: String,
			enum: ["IELTS", "TOEIC"],
			required: true,
		},
	},
	{
		timestamps: true,
	}
);
