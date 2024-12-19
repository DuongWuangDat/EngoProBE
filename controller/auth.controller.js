const { catchAsync } = require("../utils/catchAsync");
const { login, register, refresh, googleCallback } = require("../service/auth.service");
const { extractTokenFromHeader } = require("../pkg/helper");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const loginController = catchAsync(async (req, res) => {
	const { email, password } = req.body;
	const data = await login(email, password);
	return res.status(200).json(data);
});

const logoutController = catchAsync(async (req, res) => {
	return "hello";
});

const registerController = catchAsync(async (req, res) => {
	const { email, password, username } = req.body;
	const avatar = req.file;
	const data = await register(email, password, username, avatar);
	return res.status(201).json(data);
});

const refreshTokenController = catchAsync(async (req, res) => {
	const refreshToken = extractTokenFromHeader(req);
	if (!refreshToken) {
		throw new ApiError(401, "Unauthorized");
	}
	const accessToken = await refresh(refreshToken);
	return res.status(200).json({ accessToken });
});

const googleCallbackController = catchAsync(async (req, res) => {
	const { accessToken, idToken, provider, profile } = req.body;
	const data = await googleCallback(accessToken, idToken, provider, profile);
	return res.status(200).json(data);
});

module.exports = {
	loginController,
	logoutController,
	registerController,
	refreshTokenController,
	googleCallbackController,
	upload,
};
