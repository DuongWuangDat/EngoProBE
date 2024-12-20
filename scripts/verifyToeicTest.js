const mongoose = require("mongoose");
const Exam = require("../model/exam.model");

async function verifyToeicTest(examId) {
	try {
		// Connect to MongoDB
		await mongoose.connect(
			"mongodb+srv://duongquangdat:quangdat@myserver.ruqy4gt.mongodb.net/engoPro?",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);

		console.log("Connected to MongoDB");

		// Find the exam
		const exam = await Exam.findById(examId).populate("examType");
		if (!exam) {
			throw new Error("Exam not found");
		}

		console.log("\nExam Details:");
		console.log("Test ID:", exam.testId);
		console.log("Title:", exam.testTitle);
		console.log("Book:", exam.examType.book);
		console.log("Type:", exam.examType.examType);

		// Verify each part
		console.log("\nPart Details:");
		const requiredPartQuestions = {
			1: 6, // Part 1: 6 questions
			2: 25, // Part 2: 25 questions
			3: 39, // Part 3: 39 questions
			4: 30, // Part 4: 30 questions
			5: 30, // Part 5: 30 questions
			6: 16, // Part 6: 16 questions
			7: 54, // Part 7: 54 questions
		};

		exam.parts.forEach((part) => {
			const totalQuestions =
				part.partNumber <= 2 || part.partNumber === 5
					? part.questions.length
					: part.questions.reduce(
							(sum, cluster) => sum + cluster.questions.length,
							0
					  );

			console.log(`\nPart ${part.partNumber}:`);
			console.log("Instructions:", part.instructions);
			console.log("Total Questions:", totalQuestions);
			console.log(
				"Expected Questions:",
				requiredPartQuestions[part.partNumber]
			);
			console.log(
				"Status:",
				totalQuestions === requiredPartQuestions[part.partNumber]
					? "✅ OK"
					: "❌ MISMATCH"
			);

			// For clustered parts, show cluster details
			if ([3, 4, 6, 7].includes(part.partNumber)) {
				console.log("Clusters:", part.questions.length);
				part.questions.forEach((cluster) => {
					console.log(
						`  - Cluster ${cluster.clusterId}: ${cluster.questions.length} questions`
					);
				});
			}
		});

		// Disconnect from MongoDB
		await mongoose.disconnect();
		console.log("\nDisconnected from MongoDB");
	} catch (error) {
		console.error("Error:", error.message);
		if (error.stack) {
			console.error("Stack:", error.stack);
		}
		process.exit(1);
	}
}

// Get exam ID from command line argument
const examId = process.argv[2];
if (!examId) {
	console.error("Please provide an exam ID as argument");
	process.exit(1);
}

// Run the verification
console.log("Starting verification...");
verifyToeicTest(examId);
