const { catchAsync } = require("../utils/catchAsync");
const {
	getAllVocabulariesByUserId,
	createVocabulary,
	updateVocabulary,
	deleteVocabulary,
} = require("../service/vocabulary.service");
const ApiError = require("../utils/ApiError");

const getAllVocabulariesByUserIdController = catchAsync(async (req, res) => {
	try {
		const { userId } = req.query;
		const vocabularies = await getAllVocabulariesByUserId(userId);
		return res.status(200).json(vocabularies);
	} catch (error) {
		return res.status(error.statusCode || 500).json({
			message: error.message,
		});
	}
});

const createVocabularyController = catchAsync(async (req, res) => {
	try {
		const { userId, englishWord, definition, wordType, example, subject } =
			req.body;

		// Validate required fields
		if (!userId) throw new ApiError(400, "User ID is required");
		if (!englishWord) throw new ApiError(400, "English word is required");
		if (!definition) throw new ApiError(400, "Definition is required");
		if (!wordType) throw new ApiError(400, "Word type is required");

		const vocabulary = await createVocabulary(
			userId,
			englishWord,
			definition,
			wordType,
			example || "", // Make example optional
			subject || "" // Make subject optional
		);
		return res.status(201).json(vocabulary);
	} catch (error) {
		return res.status(error.statusCode || 500).json({
			message: error.message,
		});
	}
});

const updateVocabularyController = catchAsync(async (req, res) => {
	try {
		const { id } = req.params;
		const updateData = req.body;
		const vocabulary = await updateVocabulary(id, updateData);
		return res.status(200).json(vocabulary);
	} catch (error) {
		return res.status(error.statusCode || 500).json({
			message: error.message,
		});
	}
});

const deleteVocabularyController = catchAsync(async (req, res) => {
	try {
		const { id } = req.params;
		await deleteVocabulary(id);
		return res
			.status(200)
			.json({ message: "Vocabulary deleted successfully" });
	} catch (error) {
		return res.status(error.statusCode || 500).json({
			message: error.message,
		});
	}
});

module.exports = {
	getAllVocabulariesByUserIdController,
	createVocabularyController,
	updateVocabularyController,
	deleteVocabularyController,
};
