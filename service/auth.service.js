const { SALT_ROUNDS } = require("../constants");
const User = require("../model/user.model");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { generateTokenPair, generateAccessToken } = require("../pkg/auth");
const { uploadToImageKit, validateEmail } = require("../pkg/helper");


const login = async (email, password) => {
	if (!email || !password) {
		throw new ApiError(400, "Email and password are required");
	}
	if (!validateEmail(email)) {
		throw new ApiError(400, "Invalid email");
	}
	const user = await User.findOne({ email });
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

const register = async (email, password, username, avatar) => {
	if (!email || !password || !username) {
		throw new ApiError(400, "Email, password and username are required");
	}
	if (!validateEmail(email)) {
		throw new ApiError(400, "Invalid email");
	}
	const user = await User.findOne({ email });
	if (user) {
		throw new ApiError(400, "Email already exists");
	}
	let avatarUrl = null;
	if (avatar) {
		const uploadAvatar = await uploadToImageKit(avatar.buffer, avatar.originalname);
		avatarUrl = uploadAvatar.url;
	}
	const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
	const updateUserData = {
		email,
		password: hashedPassword,
		username,
		...(avatarUrl && { avatar: avatarUrl }),
	};
	const newUser = await User.create(updateUserData);
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

const googleCallback = async (accessToken, idToken, provider, profile) => {
	console.log(profile);
	const existingUser = await User.findOne({ email: profile.email });
	let user = null;
	if (existingUser) {
		user = existingUser;
	} else {
		user = await User.create({
			email: profile.email,
			username: profile.name,
			avatar: profile.picture,
			password: Math.random().toString(36).substring(2, 15),
			avatar: profile.picture,
		});
	}
	return {
		...generateTokenPair({ userId: user._id, userEmail: user.email }),
		user: user,
	};
};
module.exports = { login, register, refresh, googleCallback };
