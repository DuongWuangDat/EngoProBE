const express = require("express");
const { catchAsync } = require("../utils/catchAsync");
const { login } = require("../service/auth.service");
const router = express.Router();

router.post(
	"/login",
	catchAsync(async (req, res) => {
		const { email, password } = req.body;
		return login(email, password);
	})
);

router.post(
	"/logout",
	catchAsync(async (req, res) => {
		return "hello";
		// const { email, password } = req.body;
		// return login(email, password);
	})
);

module.exports = router;
