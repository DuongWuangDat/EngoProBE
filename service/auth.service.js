const { SALT_ROUNDS } = require("../constants");
const User = require("../model/user.model");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { generateTokenPair, generateAccessToken } = require("../pkg/auth");

const login = async (email, password) => {
	if (!email || !password) {
		throw new ApiError(400, "Email and password are required");
	}
	const user = await User.findOne({ email });
	console.log(user);
	if (!user) {
		throw new ApiError(400, "Email not found");
	}
	const isPasswordMatch = await bcrypt.compare(password, user.password);
	if (!isPasswordMatch) {
		throw new ApiError(400, "Password is incorrect");
	}
	const { password: _, ...userWithoutPassword } = user.toObject();
	return {
		...generateTokenPair({ userId: user._id.toString(), userEmail: user.email }),
		user: userWithoutPassword,
	};
};

const register = async (email, password, username) => {
	if (!email || !password || !username) {
		throw new ApiError(400, "Email, password and username are required");
	}
	const user = await User.findOne({ email });
	if (user) {
		throw new ApiError(400, "Email already exists");
	}
	const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
	const newUser = await User.create({
		email,
		password: hashedPassword,
		username,
	});
	const { password: _, ...userWithoutPassword } = newUser.toObject();
	return {
		...generateTokenPair({ userId: newUser._id, userEmail: newUser.email }),
		user: userWithoutPassword,
	};
};

const refresh = async (refreshToken) => {
	const decoded = jwt.verify(
		refreshToken,
		process.env.JWT_REFRESH_TOKEN_SECRET_KEY
	);
	return generateAccessToken({
		userId: decoded.userId,
		userEmail: decoded.userEmail,
	});
};
module.exports = { login, register, refresh };
