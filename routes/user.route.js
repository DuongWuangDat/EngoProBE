const express = require("express");
const multer = require("multer");
const validate = require("../middleware/validate");
const userValidation = require("../validations/user.validation");
const userController = require("../controller/user.controller");

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB limit
	},
	fileFilter: (req, file, cb) => {
		// Accept images only
		if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
			return cb(new Error("Only image files are allowed!"), false);
		}
		cb(null, true);
	},
});

router
	.route("/:userId")
	.get(validate(userValidation.getUser), userController.getUser)
	.patch(
		upload.single("avatar"),
		validate(userValidation.updateUser),
		userController.updateUser
	);

module.exports = router;
