const Joi = require("joi");
const { objectId } = require("./custom.validation");

const optionSchema = Joi.object({
	option: Joi.string().required(),
	text: Joi.string().required(),
});

const questionSchema = Joi.object({
	questionNumber: Joi.number().required(),
	imageUrl: Joi.string(),
	audioUrl: Joi.string(),
	questionText: Joi.string(),
	options: Joi.array().items(optionSchema).min(1).required(),
	correctAnswer: Joi.string().required(),
	passageType: Joi.string(),
	paragraphs: Joi.number(),
});

const clusterSchema = Joi.object({
	clusterId: Joi.string().required(),
	imageUrl: Joi.string(),
	questions: Joi.array().items(questionSchema).min(1).required(),
});

const partSchema = Joi.object({
	partNumber: Joi.number().integer().min(1).max(7).required(),
	instructions: Joi.string().required(),
	questions: Joi.alternatives().conditional("partNumber", {
		switch: [
			{
				is: Joi.number().valid(3, 4, 6, 7),
				then: Joi.array().items(clusterSchema).min(1).required(),
			},
			{
				is: Joi.number().valid(1, 2, 5),
				then: Joi.array().items(questionSchema).min(1).required(),
			},
		],
	}),
});

const createExam = {
	body: Joi.object().keys({
		testId: Joi.string().required(),
		testTitle: Joi.string().required(),
		audioUrl: Joi.string(),
		parts: Joi.array().items(partSchema).min(1).required(),
		examType: Joi.string().custom(objectId).required(),
	}),
};

const getExams = {
	query: Joi.object().keys({
		sortBy: Joi.string().optional(),
		limit: Joi.number().integer().min(1).optional(),
		skip: Joi.number().integer().min(0).optional(),
	}),
};

const getExam = {
	params: Joi.object().keys({
		examId: Joi.string().custom(objectId),
	}),
};

const updateExam = {
	params: Joi.object().keys({
		examId: Joi.string().custom(objectId).required(),
	}),
	body: Joi.object()
		.keys({
			testId: Joi.string(),
			testTitle: Joi.string(),
			audioUrl: Joi.string(),
			parts: Joi.array().items(partSchema).min(1),
			examType: Joi.string().custom(objectId),
		})
		.min(1),
};

const deleteExam = {
	params: Joi.object().keys({
		examId: Joi.string().custom(objectId),
	}),
};

const submitExam = {
	body: Joi.object().keys({
		answeredQuestions: Joi.object()
			.pattern(
				Joi.string().pattern(/^[1-7]$/), // Part numbers 1-7
				Joi.array().items(
					Joi.object({
						questionNumber: Joi.number().required(),
						selectedOption: Joi.string()
							.valid("A", "B", "C", "D")
							.required(),
					})
				)
			)
			.required(),
		testId: Joi.string().custom(objectId).required(),
		userId: Joi.string().custom(objectId),
		duration: Joi.number(),
	}),
};

const getAllExamResult = {
	params: Joi.object().keys({
		examId: Joi.string().custom(objectId).required(),
	}),
	query: Joi.object().keys({
		userId: Joi.string().custom(objectId).required(),
	}),
};

const getExamResult = {
	params: Joi.object().keys({
		examId: Joi.string().custom(objectId).required(),
	}),
	query: Joi.object().keys({
		userId: Joi.string().custom(objectId).required(),
		turn: Joi.number().integer().min(1).required(),
	}),
};

const uploadToeicTest = {
	body: Joi.object().keys({
		testTitle: Joi.string().required(),
		book: Joi.string().required(),
		parts: Joi.array().items(
			Joi.object({
				partNumber: Joi.number().integer().min(1).max(7).required(),
				instructions: Joi.string().required(),
				questions: Joi.alternatives().conditional('partNumber', {
					switch: [
						{
							is: Joi.number().valid(3, 4, 6, 7),
							then: Joi.array().items(
								Joi.object({
									clusterId: Joi.string().required(),
									imageUrl: Joi.string(),
									questions: Joi.array().items(
										Joi.object({
											questionNumber: Joi.number().required(),
											imageUrl: Joi.string(),
											questionText: Joi.string(),
											options: Joi.array().items(
												Joi.object({
													option: Joi.string().valid('A', 'B', 'C', 'D').required(),
													text: Joi.string().required()
												})
											).min(4).max(4).required(),
											correctAnswer: Joi.string().valid('A', 'B', 'C', 'D').required(),
											passageType: Joi.string(),
											paragraphs: Joi.number()
										})
									).min(1).required()
								})
							).min(1).required()
						},
						{
							is: Joi.number().valid(1, 2, 5),
							then: Joi.array().items(
								Joi.object({
									questionNumber: Joi.number().required(),
									imageUrl: Joi.string(),
									questionText: Joi.string(),
									options: Joi.array().items(
										Joi.object({
											option: Joi.string().valid('A', 'B', 'C', 'D').required(),
											text: Joi.string().required()
										})
									).min(3).max(4).required(),
									correctAnswer: Joi.string().valid('A', 'B', 'C', 'D').required()
								})
							).min(1).required()
						}
					]
				}).required()
			})
		).min(7).max(7).required()
	})
};

module.exports = {
	createExam,
	getExams,
	getExam,
	updateExam,
	deleteExam,
	submitExam,
	getExamResult,
	getAllExamResult,
	uploadToeicTest,
};
