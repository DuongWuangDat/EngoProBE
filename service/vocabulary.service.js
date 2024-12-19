const ApiError = require("../utils/ApiError");
const User = require("../model/user.model");
const Vocab = require("../model/vocab.model");

const getAllVocabulariesByUserId = async (userId) => {
	try {
		if (!userId) {
			throw new ApiError(400, "User ID is required");
		}
		if (typeof userId !== "string") {
			throw new ApiError(400, "User ID must be a string");
		}
		const vocabularies = await User.findById(userId).populate("vocabList");
		return vocabularies.vocabList;
	} catch (error) {
		throw new ApiError(error.statusCode, error.message);
	}
};

const createVocabulary = async (
	userId,
	englishWord,
	definition,
	wordType,
	example,
	subject
) => {
	try {
		// Find the user first
		const user = await User.findById(userId);
		if (!user) {
			throw new ApiError(404, "User not found");
		}

		// Create the vocabulary
		const vocabulary = await Vocab.create({
			userId,
			englishWord,
			definition,
			wordType,
			example: example || [],
			subject: subject || null,
		});

		// Add the vocabulary to user's vocabList
		user.vocabList.push(vocabulary._id);
		await user.save();

		return vocabulary;
	} catch (error) {
		throw new ApiError(error.statusCode || 500, error.message);
	}
};

const updateVocabulary = async (vocabId, updateData) => {
	try {
		const vocabulary = await Vocab.findByIdAndUpdate(
			vocabId,
			{ $set: updateData },
			{ new: true }
		);
		if (!vocabulary) {
			throw new ApiError(404, "Vocabulary not found");
		}
		return vocabulary;
	} catch (error) {
		throw new ApiError(error.statusCode || 500, error.message);
	}
};

const deleteVocabulary = async (vocabId) => {
	try {
		// Find the vocabulary first to get userId
		const vocabulary = await Vocab.findById(vocabId);
		if (!vocabulary) {
			throw new ApiError(404, "Vocabulary not found");
		}

		// Remove the vocabulary from user's vocabList
		await User.findByIdAndUpdate(vocabulary.userId, {
			$pull: { vocabList: vocabId },
		});

		// Delete the vocabulary
		await vocabulary.deleteOne();
		return vocabulary;
	} catch (error) {
		throw new ApiError(error.statusCode || 500, error.message);
	}
};

module.exports = {
	getAllVocabulariesByUserId,
	createVocabulary,
	updateVocabulary,
	deleteVocabulary,
};
