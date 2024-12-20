const mongoose = require("mongoose");
const { createVocabulary } = require("../service/vocabulary.service");
require("dotenv").config();

const vocabularies = [
	{
		englishWord: "innovate",
		definition:
			"Make changes in something established, especially by introducing new ideas.",
		wordType: "verb",
		example: [
			"She decided to innovate the way her company approaches marketing.",
		],
		subject: "Business",
	},
	{
		englishWord: "benevolent",
		definition: "Well meaning and kindly.",
		wordType: "adjective",
		example: ["A benevolent smile lit up his face."],
		subject: "General",
	},
	{
		englishWord: "astute",
		definition:
			"Having or showing an ability to accurately assess situations or people.",
		wordType: "adjective",
		example: [
			"An astute businessman identified the opportunity immediately.",
		],
		subject: "Business",
	},
	{
		englishWord: "ambiguous",
		definition:
			"Open to more than one interpretation; having a double meaning.",
		wordType: "adjective",
		example: ["The phrase was ambiguous and led to confusion."],
		subject: "Language",
	},
	{
		englishWord: "ephemeral",
		definition: "Lasting for a very short time.",
		wordType: "adjective",
		example: ["The ephemeral nature of the performance made it special."],
		subject: "General",
	},
	{
		englishWord: "procrastinate",
		definition: "Delay or postpone action; put off doing something.",
		wordType: "verb",
		example: ["He tends to procrastinate on important tasks."],
		subject: "Productivity",
	},
	{
		englishWord: "exacerbate",
		definition: "Make a problem, bad situation, or negative feeling worse.",
		wordType: "verb",
		example: ["His comments only served to exacerbate the situation."],
		subject: "General",
	},
	{
		englishWord: "ubiquitous",
		definition: "Present, appearing, or found everywhere.",
		wordType: "adjective",
		example: ["Smartphones have become ubiquitous in modern society."],
		subject: "Technology",
	},
	{
		englishWord: "plethora",
		definition: "A large or excessive amount of something.",
		wordType: "noun",
		example: ["There is a plethora of options available to consumers."],
		subject: "General",
	},
	{
		englishWord: "ameliorate",
		definition: "Make (something bad or unsatisfactory) better.",
		wordType: "verb",
		example: ["Efforts were made to ameliorate the working conditions."],
		subject: "General",
	},
	{
		englishWord: "meticulous",
		definition:
			"Showing great attention to detail; very careful and precise.",
		wordType: "adjective",
		example: [
			"She is meticulous about keeping her desk clean and organized.",
		],
		subject: "Personality",
	},
	{
		englishWord: "gregarious",
		definition: "Fond of company; sociable.",
		wordType: "adjective",
		example: [
			"He was a popular and gregarious man, always at the center of attention.",
		],
		subject: "Personality",
	},
	{
		englishWord: "relinquish",
		definition: "Voluntarily cease to keep or claim; give up.",
		wordType: "verb",
		example: [
			"He relinquished his managerial role to focus on his health.",
		],
		subject: "General",
	},
	{
		englishWord: "arduous",
		definition:
			"Involving or requiring strenuous effort; difficult and tiring.",
		wordType: "adjective",
		example: ["Climbing the mountain was an arduous task."],
		subject: "Adventure",
	},
	{
		englishWord: "disparate",
		definition: "Essentially different in kind; not allowing comparison.",
		wordType: "adjective",
		example: [
			"The two teams had disparate skill levels, making the match uneven.",
		],
		subject: "General",
	},
	{
		englishWord: "lucid",
		definition: "Expressed clearly; easy to understand.",
		wordType: "adjective",
		example: [
			"The professor gave a lucid explanation of the complex topic.",
		],
		subject: "Education",
	},
	{
		englishWord: "pragmatic",
		definition:
			"Dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations.",
		wordType: "adjective",
		example: [
			"The solution was pragmatic and addressed the core issue effectively.",
		],
		subject: "General",
	},
	{
		englishWord: "surmount",
		definition: "Overcome (a difficulty or obstacle).",
		wordType: "verb",
		example: ["With determination, she surmounted all challenges."],
		subject: "Motivation",
	},
	{
		englishWord: "succinct",
		definition: "Briefly and clearly expressed.",
		wordType: "adjective",
		example: ["The report provided a succinct summary of the findings."],
		subject: "Communication",
	},
	{
		englishWord: "resilient",
		definition:
			"Able to withstand or recover quickly from difficult conditions.",
		wordType: "adjective",
		example: [
			"The resilient community rebuilt their homes after the flood.",
		],
		subject: "Motivation",
	},

	// ... Add 90 more entries here
];

// Replace with the userId
const userId = "676562ea3cdbb694c0420dff";

const addVocabulariesForUser = async () => {
	try {
		// Connect to MongoDB
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connected to MongoDB");

		for (const vocab of vocabularies) {
			const result = await createVocabulary(
				userId,
				vocab.englishWord,
				vocab.definition,
				vocab.wordType,
				vocab.example,
				vocab.subject
			);
			console.log(`Added vocabulary: ${result.englishWord}`);
		}
		console.log("All vocabularies have been added successfully!");
	} catch (error) {
		console.error("Error adding vocabularies:", error.message);
	} finally {
		// Close MongoDB connection
		await mongoose.connection.close();
		console.log("Disconnected from MongoDB");
		process.exit(0);
	}
};

// Run the script
addVocabulariesForUser();
