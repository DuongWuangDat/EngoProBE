const mongoose = require("mongoose");
const generateToeicTest = require("../utils/generateToeicTest");
const { uploadToeicTest } = require("../service/exam.service");

async function testUploadToeic() {
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

		// Generate test data
		const testData = {
			testTitle: "TOEIC Practice Test 10",
			book: "ETS 2023",
			audioUrl:
				"https://ik.imagekit.io/ld11jn6uv/PART%201%20-%20TEST%205.mp3?updatedAt=1734691037948",
			parts: generateToeicTest("test").parts, // We only need the parts from generateToeicTest
		};

		console.log("Generated test data");
		console.log("Number of parts:", testData.parts.length);

		// Log question counts for each part
		testData.parts.forEach((part) => {
			const questionCount =
				part.partNumber <= 2 || part.partNumber === 5
					? part.questions.length
					: part.questions.reduce(
							(sum, cluster) => sum + cluster.questions.length,
							0
					  );

			console.log(`Part ${part.partNumber}: ${questionCount} questions`);
		});

		// Upload test
		console.log("\nUploading test...");
		const result = await uploadToeicTest(testData);

		console.log("\nTest uploaded successfully!");
		console.log("Test ID:", result.testId);
		console.log("Exam ID:", result._id);

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

// Run the test
console.log("Starting test...");
testUploadToeic();
