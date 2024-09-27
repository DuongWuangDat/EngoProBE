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

ExamTypeSchema.plugin(toJson);

const ExamType = mongoose.model("ExamType", ExamTypeSchema);

module.exports = ExamType;
