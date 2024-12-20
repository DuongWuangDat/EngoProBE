const httpStatus = require('http-status');
const User = require('../model/user.model');
const ApiError = require('../utils/ApiError');
const { uploadToImageKit } = require('./upload.service');

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @param {Buffer} [avatarBuffer]
 * @param {String} [avatarFileName]
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody, avatarBuffer = null, avatarFileName = null) => {
  const user = await getUserById(userId);
  // If avatar is provided, upload it to ImageKit
  if (avatarBuffer && avatarFileName) {
    const uploadResult = await uploadToImageKit(avatarBuffer, avatarFileName);
    updateBody.avatar = uploadResult.url;
	}
	// Validate unique fields if they are being updated
	if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
	}
  if (updateBody.username && (await User.isUsernameTaken(updateBody.username, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
  }

  Object.assign(user, updateBody);
  await user.save();
  return user;
};

module.exports = {
  getUserById,
  updateUserById
}; 