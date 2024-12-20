// Helper function to generate questions
function generateQuestions(startNum, count, template) {
	return Array.from({ length: count }, (_, index) => ({
		questionNumber: startNum + index,
		...template,
		imageUrl: `https://s4-media1.study4.com/media/e24/images_fixed2/image${
			startNum + index
		}.png`,
		// audioUrl: `/assets/audio/question-${startNum + index}.mp3`,
	}));
}

// Helper function to generate clusters
function generateClusters(
	startNum,
	totalQuestions,
	questionsPerCluster,
	template
) {
	const clusters = [];
	let currentNum = startNum;

	while (currentNum < startNum + totalQuestions) {
		clusters.push({
			clusterId: `cluster${
				Math.floor((currentNum - startNum) / questionsPerCluster) + 1
			}`,
			imageUrl:
				"https://ik.imagekit.io/ld11jn6uv/Mixed_Charts_sample_-_Vietnam.png?updatedAt=1734691269068",
			questions: generateQuestions(
				currentNum,
				Math.min(
					questionsPerCluster,
					startNum + totalQuestions - currentNum
				),
				template
			),
		});
		currentNum += questionsPerCluster;
	}

	return clusters;
}

function generateToeicTest(testId) {
	return {
		testId,
		testTitle: "TOEIC Practice Test 2",
		audioUrl:
			"https://ik.imagekit.io/ld11jn6uv/PART%201%20-%20TEST%205.mp3?updatedAt=1734691037948",
		parts: [
			{
				partNumber: 1,
				instructions:
					"For each question in this part, you will see a picture and hear four statements. Choose the statement that best describes the picture.",
				questions: generateQuestions(1, 6, {
					options: [
						{
							option: "A",
							text: "The man is sitting at his desk.",
						},
						{ option: "B", text: "The woman is walking her dog." },
						{ option: "C", text: "The car is parked near a tree." },
						{
							option: "D",
							text: "The child is playing in the park.",
						},
					],
					correctAnswer: "A",
				}),
			},
			{
				partNumber: 2,
				instructions:
					"For each question in this part, you will hear a question or statement followed by three responses. Choose the response that best fits the question or statement.",
				questions: generateQuestions(7, 25, {
					options: [
						{ option: "A", text: "At 3 o'clock." },
						{ option: "B", text: "In the meeting room." },
						{ option: "C", text: "Yesterday." },
					],
					correctAnswer: "A",
				}),
			},
			{
				partNumber: 3,
				instructions:
					"For each question in this part, you will hear a short conversation between two people. Choose the best answer to each question based on the conversation.",
				questions: generateClusters(32, 39, 3, {
					questionText: "What is the main topic of the conversation?",
					options: [
						{ option: "A", text: "Planning a vacation" },
						{ option: "B", text: "Discussing a work project" },
						{ option: "C", text: "Ordering food" },
						{ option: "D", text: "Making a phone call" },
					],
					correctAnswer: "B",
				}),
			},
			{
				partNumber: 4,
				instructions:
					"For each question in this part, you will hear a short talk. Choose the best answer to each question based on the talk.",
				questions: generateClusters(71, 30, 3, {
					questionText: "What is the main topic of the talk?",
					options: [
						{ option: "A", text: "Company history" },
						{ option: "B", text: "New product benefits" },
						{ option: "C", text: "Customer service importance" },
						{ option: "D", text: "Marketing campaign success" },
					],
					correctAnswer: "C",
				}),
			},
			{
				partNumber: 5,
				instructions:
					"For each question in this part, you will read a sentence with a word or phrase missing. Choose the word or phrase that best completes the sentence.",
				questions: generateQuestions(101, 30, {
					questionText:
						"The company _____ the new policy last month.",
					options: [
						{ option: "A", text: "announce" },
						{ option: "B", text: "announces" },
						{ option: "C", text: "announced" },
						{ option: "D", text: "announcing" },
					],
					correctAnswer: "C",
				}),
			},
			{
				partNumber: 6,
				instructions:
					"For each question in this part, you will read a text with four blanks. Choose the word or phrase that best fits each blank.",
				questions: generateClusters(131, 16, 4, {
					questionText:
						"The success of the company _____ on innovation.",
					options: [
						{ option: "A", text: "depends" },
						{ option: "B", text: "relies" },
						{ option: "C", text: "bases" },
						{ option: "D", text: "follows" },
					],
					correctAnswer: "A",
				}),
			},
			{
				partNumber: 7,
				instructions:
					"For each question in this part, you will read a passage and answer questions based on it.",
				questions: [
					...generateClusters(147, 29, 3, {
						passageType: "single",
						questionText: "What is the main idea of the passage?",
						options: [
							{ option: "A", text: "Time management importance" },
							{ option: "B", text: "Business practices history" },
							{ option: "C", text: "Technology impact on work" },
							{
								option: "D",
								text: "Team collaboration benefits",
							},
						],
						correctAnswer: "C",
					}),
					...generateClusters(176, 25, 5, {
						passageType: "multi",
						paragraphs: 2,
						questionText:
							"According to the passage, what is the main benefit of the new system?",
						options: [
							{ option: "A", text: "Increased efficiency" },
							{ option: "B", text: "Cost reduction" },
							{
								option: "C",
								text: "Customer satisfaction improvement",
							},
							{
								option: "D",
								text: "Employee morale enhancement",
							},
						],
						correctAnswer: "A",
					}),
				],
			},
		],
	};
}

module.exports = generateToeicTest;
