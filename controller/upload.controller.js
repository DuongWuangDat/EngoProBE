const { catchAsync } = require("../utils/catchAsync");
const uploadService = require("../service/upload.service");
const httpStatus = require("http-status");

const uploadController = catchAsync(async (req, res) => {
	const result = await uploadService.uploadToImageKit(req.file.buffer, req.file.originalname);
	res.status(httpStatus.CREATED).json({
		success: true,
		data: result,
	});
});

module.exports = { uploadController };

