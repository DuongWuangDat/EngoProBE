const { catchAsync } = require("../utils/catchAsync");
const { createExam, getExam } = require("../service/exam.service");

const createGroupController = catchAsync(async (req, res) => {
	const data = await createGroup(req.body);
	return res.status(201).json(data);
});

