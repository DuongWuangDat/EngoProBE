const Exam = require("../model/exam.model");
const ExamType = require("../model/examType.model");
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

const getAllExam = async () => {
	return Exam.find({}).populate("examType").select("-parts");
};

/**
 * Upload a new TOEIC test
 * @param {Object} testData
 * @returns {Promise<Exam>}
 */
const uploadToeicTest = async (testData) => {
	console.log(testData);
	try {
		// Find or create TOEIC exam type
		let toeicType = await ExamType.findOne({ examType: "TOEIC" });
		if (!toeicType) {
			toeicType = await ExamType.create({
				book: testData.book,
				examType: "TOEIC",
			});
		}

		// Validate part structure
		const requiredPartQuestions = {
			1: 6,  // Part 1: 6 questions
			2: 25, // Part 2: 25 questions
			3: 39, // Part 3: 39 questions
			4: 30, // Part 4: 30 questions
			5: 30, // Part 5: 30 questions
			6: 16, // Part 6: 16 questions
			7: 54  // Part 7: 54 questions
		};

		// Validate each part's question count
		for (const part of testData.parts) {
			const totalQuestions = part.partNumber <= 2 || part.partNumber === 5 
				? part.questions.length 
				: part.questions.reduce((sum, cluster) => sum + cluster.questions.length, 0);

			if (totalQuestions !== requiredPartQuestions[part.partNumber]) {
				throw new ApiError(
					httpStatus.BAD_REQUEST,
					`Part ${part.partNumber} should have exactly ${requiredPartQuestions[part.partNumber]} questions, but got ${totalQuestions}`
				);
			}
		}

		// Create unique testId
		const testCount = await Exam.countDocuments({ "examType": toeicType._id });
		const testId = `TOEIC-${testData.book}-${testCount + 1}`;

		// Create the exam
		const exam = await Exam.create({
			testId,
			testTitle: testData.testTitle,
			parts: testData.parts,
			examType: toeicType._id,
			audioUrl: testData.audioUrl,
		});

		return exam;
	} catch (error) {
		throw new ApiError(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR, error.message);
	}
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
	uploadToeicTest,
	getExamById,
	queryExams,
	updateExamById,
	deleteExamById,
	getAllExam,
};
