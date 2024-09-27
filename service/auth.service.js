const User = require("../model/user.model");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");

const login = async (email, password) => {
	if (!email || !password) {
		throw new ApiError(400, "Email and password are required");
	}
	const user = await User.findOne({ email });
	if (!user) {
		throw new ApiError(400, "Email not found");
	}
	const isPasswordMatch = await bcrypt.compare(password, user.password);
	if (!isPasswordMatch) {
		throw new ApiError(400, "Password is incorrect");
	}
	return {
		...generateTokenPair({ userId: user._id, userEmail: user.email }),
		user,
	};
};



module.exports = { login };
