const Exam = require("../model/exam.model");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

/**
 * Create a new exam
 * @param {Object} examBody
 * @returns {Promise<Exam>}
 */
const createExam = async (examBody) => {
	return Exam.create(examBody);
};

/**
 * Get exam by id
 * @param {ObjectId} id
 * @returns {Promise<Exam>}
 */
const getExamById = async (id) => {
	return Exam.findById(id).populate("examType");
};

/**
 * Get exams with pagination
 * @param {Object} filter - Filter criteria
 * @param {Object} options - Query options
 * @returns {Promise<Exam[]>}
 */
const queryExams = async (filter, options) => {
	const exams = await Exam.find(filter)
		.populate("examType")
		.sort(options.sortBy)
		.skip(options.skip)
		.limit(options.limit);

	const count = await Exam.countDocuments(filter);

	return {
		exams,
		count,
	};
};

/**
 * Update exam by id
 * @param {ObjectId} examId
 * @param {Object} updateBody
 * @returns {Promise<Exam>}
 */
const updateExamById = async (examId, updateBody) => {
	const exam = await getExamById(examId);
	if (!exam) {
		throw new ApiError(httpStatus.NOT_FOUND, "Exam not found");
	}
	Object.assign(exam, updateBody);
	await exam.save();
	return exam;
};

/**
 * Delete exam by id
 * @param {ObjectId} examId
 * @returns {Promise<Exam>}
 */
const deleteExamById = async (examId) => {
	const exam = await getExamById(examId);
	if (!exam) {
		throw new ApiError(httpStatus.NOT_FOUND, "Exam not found");
	}
	await exam.deleteOne();
	return exam;
};

module.exports = {
	createExam,
	getExamById,
	queryExams,
	updateExamById,
	deleteExamById,
};
