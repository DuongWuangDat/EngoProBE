const {catchAsync} = require("../utils/catchAsync");
const userService = require("../service/user.service");

const getUser = catchAsync(async (req, res) => {
	const user = await userService.getUserById(req.params.userId);
	res.send(user);
});

/**
 * 1|// PATCH /users/:userId
 * 2|// Content-Type: multipart/form-data
 * 3|{
 * 4|  "username": "newUsername",
 * 5|  "email": "newemail@example.com",
 * 6|  "avatar": <file>  // Image file
 * 7|} 
 * 
 * 1|// PATCH /users/:userId
2|// Content-Type: application/json
 * 3|{
 * 4|  "username": "newUsername",
 * 5|  "email": "newemail@example.com"
 * 6|} 
 */

const updateUser = catchAsync(async (req, res) => {
	// Get file from multer
	const avatarFile = req.file;
	const updateBody = req.body;

	let avatarBuffer = null;
	let avatarFileName = null;

	if (avatarFile) {
		avatarBuffer = avatarFile.buffer;
		avatarFileName = avatarFile.originalname;
	}
	const user = await userService.updateUserById(
		req.params.userId,
		updateBody,
		avatarBuffer,
		avatarFileName
	);

	res.send(user);
});

module.exports = {
	getUser,
	updateUser,
};
