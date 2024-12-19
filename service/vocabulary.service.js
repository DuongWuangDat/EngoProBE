const ApiError = require("../utils/ApiError");
const { catchAsync } = require("../utils/catchAsync");

const getAllVocabulariesByUserId = async (userId) => {
	try {
		if (!userId) {
			throw new ApiError(400, "User ID is required");
		}
		if(typeof userId !== "string") {
			throw new ApiError(400, "User ID must be a string");
		}
		const vocabularies = await Vocab.find({ userId });
		return vocabularies;
	} catch (error) {
		throw new ApiError(error.statusCode, error.message);
	}
};

module.exports = {
	getAllVocabulariesByUserId,
};
