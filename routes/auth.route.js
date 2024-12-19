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

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 user:
 *                   type: object
 */
router.post("/login", loginController);

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               username:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Registration successful
 */
router.post("/register", upload.single("avatar"), registerController);

/**
 * @swagger
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: New access token generated
 */
router.post("/refresh", refreshTokenController);

/**
 * @swagger
 * /api/v1/auth/google/callback:
 *   post:
 *     summary: Google OAuth callback
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - accessToken
 *               - idToken
 *               - provider
 *               - profile
 *             properties:
 *               accessToken:
 *                 type: string
 *               idToken:
 *                 type: string
 *               provider:
 *                 type: string
 *               profile:
 *                 type: object
 *     responses:
 *       200:
 *         description: Google authentication successful
 */
router.post("/google/callback", googleCallbackController);

module.exports = router;
