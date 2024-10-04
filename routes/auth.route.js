const express = require("express");
const {
	loginController,
	logoutController,
	registerController,
	refreshTokenController,
} = require("../controller/auth.controller");

const router = express.Router();

router.post("/login", loginController);

router.post("/logout", logoutController);

router.post("/register", registerController);

router.post("/refresh", refreshTokenController);

module.exports = router;
