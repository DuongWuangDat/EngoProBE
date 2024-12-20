const express = require("express");
const { uploadController } = require("../controller/upload.controller");
const router = express.Router();
const { upload } = require("../controller/auth.controller");

router.post("/", upload.single("file"), uploadController);

module.exports = router;
