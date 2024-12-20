const ImageKit = require("imagekit");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const imagekit = new ImageKit({
	publicKey: "public_WM4/+/q5D5zsCt1Dd/dQIIRqyqY=",
	privateKey: "private_XemWZUQQ6MgU/xllJQuJ1BE/9KA=",
	urlEndpoint: "https://ik.imagekit.io/ld11jn6uv/",
});

const uploadToImageKit = async (fileBuffer, fileName) => {
	try {
		const result = await imagekit.upload({
			file: fileBuffer,
			fileName: fileName,
		});
		return result;
	} catch (error) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			"Error uploading image: " + error.message
		);
	}
};

module.exports = {
	uploadToImageKit,
};
