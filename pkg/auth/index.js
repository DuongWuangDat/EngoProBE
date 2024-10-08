const { sign } = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = ({ userId, userEmail }) => {
	return sign(
		{ userId, userEmail },
		process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
		{
			expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
		}
	);
};

const generateRefreshToken = ({ userId, userEmail }) => {
	return sign(
		{ userId, userEmail },
		process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
		{
			expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
		}
	);
};

const generateTokenPair = ({ userId, userEmail }) => {
	const accessToken = generateAccessToken({ userId, userEmail });
	const refreshToken = generateRefreshToken({ userId, userEmail });
	return { accessToken, refreshToken };
};

module.exports = {
	generateAccessToken,
	generateRefreshToken,
	generateTokenPair,
};
