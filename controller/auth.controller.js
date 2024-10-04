const { catchAsync } = require("../utils/catchAsync");
const { login, register, refresh } = require("../service/auth.service");
const { extractTokenFromHeader } = require("../pkg/helper");

const loginController = catchAsync(async (req, res) => {
	const { email, password } = req.body;
	const data = await login(email, password);
	return res.json(data);
});

const logoutController = catchAsync(async (req, res) => {
	return "hello";
});

const registerController = catchAsync(async (req, res) => {
	const { email, password, username } = req.body;
	const data = await register(email, password, username);
	return res.json(data);
});

const refreshTokenController = catchAsync(async (req, res) => {
	const refreshToken = extractTokenFromHeader(req);
	if (!refreshToken) {
		throw new ApiError(401, "Unauthorized");
	}
	const accessToken = await refresh(refreshToken);
	return res.json({ accessToken });
});

module.exports = { loginController, logoutController, registerController, refreshTokenController };
