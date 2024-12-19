const mongoose = require("mongoose");
const generateToeicTest = require("../utils/generateToeicTest");
const ExamType = require("../model/examType.model");
const Exam = require("../model/exam.model");

async function createSampleTest() {
	try {
		// Connect to MongoDB
		await mongoose.connect("mongodb+srv://duongquangdat:quangdat@myserver.ruqy4gt.mongodb.net/engoPro?", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		// Create or find TOEIC exam type
		let toeicType = await ExamType.findOne({ examType: "TOEIC" });
		if (!toeicType) {
			toeicType = await ExamType.create({
				book: "ETS 2023",
				examType: "TOEIC",
			});
		}

		// Generate test data
		const testData = generateToeicTest("TOEIC-2023-01");
		testData.examType = toeicType._id;

		// Create the exam
		const exam = await Exam.create(testData);
		console.log("Sample TOEIC test created successfully!");
		console.log("Exam ID:", exam._id);

		// Disconnect from MongoDB
		await mongoose.disconnect();
	} catch (error) {
		console.error("Error creating sample test:", error);
		process.exit(1);
	}
}

// Run the script
createSampleTest();
