const express = require("express");
const examController = require("../controller/exam.controller");
const validate = require("../middleware/validate");
const examValidation = require("../validations/exam.validation");

const router = express.Router();

router
	.route("/")
	.post(validate(examValidation.createExam), examController.createExam)
	.get(validate(examValidation.getExams), examController.getExams);
//

router.post(
	"/submit",
	validate(examValidation.submitExam),
	examController.submitExam
);
router.get(
	"/result/:examId",
	validate(examValidation.getExamResult),
	examController.getExamResult
);

router
	.route("/:examId")
	.get(validate(examValidation.getExam), examController.getExam)
	.patch(validate(examValidation.updateExam), examController.updateExam)
	.delete(validate(examValidation.deleteExam), examController.deleteExam);

router.get(
	"/result/all/:examId",
	validate(examValidation.getAllExamResult),
	examController.getAllExamResult
);

module.exports = router;
