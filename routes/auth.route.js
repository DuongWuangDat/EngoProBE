const express = require("express");
const {
	loginController,
	logoutController,
	registerController,
	refreshTokenController,
	upload,
} = require("../controller/auth.controller");

const router = express.Router();

router.post("/login", loginController);

router.post("/logout", logoutController);

router.post("/register", upload.single("avatar"), registerController);

router.post("/refresh", refreshTokenController);

module.exports = router;
