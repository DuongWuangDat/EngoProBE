const httpStatus = require("http-status");
const { catchAsync } = require("../utils/catchAsync");
const examService = require("../service/exam.service");
const CheckQuestion = require("../model/checkQuestion.model");
const HistoryExam = require("../model/historyExam.model");
const Exam = require("../model/exam.model");
const ApiError = require("../utils/ApiError");
const createExam = catchAsync(async (req, res) => {
  const exam = await examService.createExam(req.body);
  res.status(httpStatus.CREATED).send(exam);
});

const getExams = catchAsync(async (req, res) => {
  const filter = {};
  const options = {
    sortBy: req.query.sortBy || "createdAt",
    limit: parseInt(req.query.limit, 10) || 10,
    skip: parseInt(req.query.skip, 10) || 0,
  };
  const result = await examService.queryExams(filter, options);
  res.send(result);
});

const getExam = catchAsync(async (req, res) => {
  const exam = await examService.getExamById(req.params.examId);
  if (!exam) {
    throw new ApiError(httpStatus.NOT_FOUND, "Exam not found");
  }
  res.send(exam);
});

const updateExam = catchAsync(async (req, res) => {
  const exam = await examService.updateExamById(req.params.examId, req.body);
  res.send(exam);
});

const deleteExam = catchAsync(async (req, res) => {
  await examService.deleteExamById(req.params.examId);
  res.status(httpStatus.NO_CONTENT).send();
});

const submitExam = catchAsync(async (req, res) => {
  const { answeredQuestions, testId, userId, duration } = req.body;
  const exam = await Exam.findById(testId);
  if (!exam) {
    throw new ApiError(httpStatus.NOT_FOUND, "Exam not found");
  }

  // Process each part's answers
  const checkQuestions = [];
  let totalCorrect = 0;

  for (const [partNumber, answers] of Object.entries(answeredQuestions)) {
    const part = exam.parts[parseInt(partNumber) - 1];
    if (!part) {
      throw new ApiError(httpStatus.NOT_FOUND, `Part ${partNumber} not found`);
    }
    for (const answer of answers) {
      let question;

      // Find the question and its correct answer based on part type
      if ([3, 4, 6, 7].includes(part.partNumber)) {
        // For clustered questions
        for (const cluster of part.questions) {
          question = cluster.questions.find(
            (q) => q.questionNumber === answer.questionNumber
          );
          if (question) break;
        }
      } else {
        // For direct questions
        question = part.questions.find(
          (q) => q.questionNumber === answer.questionNumber
        );
      }

      if (!question) {
        throw new ApiError(
          httpStatus.NOT_FOUND,
          `Question ${answer.questionNumber} in part ${partNumber} not found`
        );
      }

      const isCorrect = answer.selectedOption === question.correctAnswer;
      if (isCorrect) totalCorrect++;

      const checkQuestion = await CheckQuestion.create({
        exam: testId,
        user: userId,
        questionNumber: answer.questionNumber,
        partNumber: parseInt(partNumber),
        selectedOption: answer.selectedOption,
        correctAnswer: question.correctAnswer,
        isCorrect,
      });

      checkQuestions.push(checkQuestion);
    }
  }

  // Calculate total questions in exam
  const totalQuestions = exam.parts.reduce((total, part) => {
    if ([3, 4, 6, 7].includes(part.partNumber)) {
      return (
        total +
        part.questions.reduce(
          (sum, cluster) => sum + cluster.questions.length,
          0
        )
      );
    }
    return total + part.questions.length;
  }, 0);

  // Calculate score
  const totalAnswered = checkQuestions.length;
  const score = (totalCorrect / totalQuestions) * 990;

  // Get the number of previous attempts
  const previousAttempts = await HistoryExam.countDocuments({
    exam: testId,
    user: userId,
  });

  // Create history exam record
  const historyExam = await HistoryExam.create({
    exam: testId,
    user: userId,
    checkQuestions: checkQuestions.map((q) => q._id),
    turn: previousAttempts + 1,
    score,
    totalAnswered,
    totalQuestions,
    correctAnswers: totalCorrect,
    duration: duration,
  });
  console.log(historyExam);

  res.status(httpStatus.OK).json({
    success: true,
    data: {
      examId: testId,
      score,
      totalQuestions,
      totalAnswered,
      correctAnswers: totalCorrect,
      turn: historyExam.turn,
      submittedAt: historyExam.createdAt,
      duration: duration,
    },
  });
});

const getAllExamResult = catchAsync(async (req, res) => {
  const { examId } = req.params;
  const { userId } = req.query;
  const result = await HistoryExam.find({ exam: examId, user: userId })
    .populate("checkQuestions")
    .populate("exam")
    .sort({ createdAt: -1 });
  res.status(httpStatus.OK).send(result);
});

const getExamResult = catchAsync(async (req, res) => {
  const { examId } = req.params;
  const { userId, turn } = req.query;
  const result = await HistoryExam.findOne({
    exam: examId,
    user: userId,
    turn: turn,
  })
    .populate("checkQuestions")
    .populate("exam")
    .sort({ createdAt: -1 });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Exam result not found");
  }

  // Group answers by part
  const answersByPart = result.checkQuestions.reduce((acc, check) => {
    const partNumber = check.partNumber;
    if (!acc[partNumber]) {
      acc[partNumber] = [];
    }
    acc[partNumber].push({
      questionNumber: check.questionNumber,
      selectedOption: check.selectedOption,
      correctAnswer: check.correctAnswer,
      isCorrect: check.isCorrect,
    });
    return acc;
  }, {});

  res.status(httpStatus.OK).json({
    success: true,
    data: {
      examId: result.exam._id,
      testTitle: result.exam.testTitle,
      score: result.score,
      totalQuestions: result.totalQuestions,
      totalAnswered: result.totalAnswered,
      correctAnswers: result.correctAnswers,
      turn: result.turn,
      submittedAt: result.createdAt,
      duration: result.duration,
      answersByPart,
    },
  });
});

const uploadToeicTest = catchAsync(async (req, res) => {
  const exam = await examService.uploadToeicTest(req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    data: exam,
  });
});

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
