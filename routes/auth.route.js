const express = require("express");
const {
	loginController,
	logoutController,
	registerController,
	refreshTokenController,
	upload,
	googleCallbackController,
} = require("../controller/auth.controller");

const router = express.Router();

router.post("/login", loginController);

router.post("/logout", logoutController);

router.post("/register", upload.single("avatar"), registerController);

router.post("/refresh", refreshTokenController);

router.post("/google/callback", googleCallbackController);

module.exports = router;
