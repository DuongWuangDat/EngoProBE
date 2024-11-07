const ImageKit = require("imagekit");
const imagekit = require("./image-kit");

const extractTokenFromHeader = (req) => {
	const [type, token] = req.headers.authorization?.split(" ") ?? [];
	return type === "Bearer" ? token : undefined;
};

const uploadToImageKit = async (fileBuffer, fileName) => {
	try {
		const result = await imagekit.upload({
			file: fileBuffer,
			fileName: fileName,
		});
		return result;
	} catch (error) {
		console.log(error);
		throw new HttpException(error.message, 500);
	}
}

const validateEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

module.exports = { extractTokenFromHeader, uploadToImageKit, validateEmail };
