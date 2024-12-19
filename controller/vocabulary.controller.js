const { catchAsync } = require("../utils/catchAsync");
const { getAllVocabulariesByUserId } = require("../service/vocabulary.service");
const ApiError = require("../utils/ApiError");

const getAllVocabulariesByUserIdController = catchAsync(async (req, res) => {
	try {
		const { userId } = req.body;
		if (!userId) {
			throw new ApiError(400, "User ID is required");
		}
		if (typeof userId !== "string") {
			throw new ApiError(400, "User ID must be a string");
		}
		const vocabularies = await getAllVocabulariesByUserId(userId);
		return res.status(200).json(vocabularies);
	} catch (error) {
		throw new ApiError(error.statusCode, error.message);
	}
});

module.exports = {
	getAllVocabulariesByUserIdController,
};
