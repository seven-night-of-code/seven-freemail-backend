/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - email
 *         - firstName
 *         - LastName
 *         - password
 *         - tel
 * 
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         firstname:
 *           type: string
 *           description: The first name of the user
 *         lastname:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         tel:
 *           type: number
 *           description: The telephone number of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         role:
 *           type: string
 *           description: The role of the user
 *         apikey:
 *           type: string
 *           description: The apikey of the user
 *         imageUrl:
 *           type: string 
 *           description: the image of the user
 *         apiStatus:
 *           type: string
 *           description: the status of the apiKey
 *         Verified:
 *           type: boolean
 *           description: whether the user is verified
 *       example:
 *         id: d5fE_as
 *         firstName: seven
 *         lastName: freemail
 *         email: sevenfreemail@gmail.com
 *         tel: 672562728
 *         password: 22262hshsns
 *         role: USER
 *         imageUrl: http://sevenfreemail.com
 *         apiKey: d5772282929
 *         verified: true
 *         apiStatus: active
 */
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: The Account Managing Api
 * /signup:
 *   post:
 *     summary: create a new account
 *     tags: [Create Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/users'
 *     responses:
 *       200:
 *         description: The user has successfully created an an account.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/users'
 *       500:
 *         description: Some server error
 *
 * /confirm-account:
 *   post:
 *     summary: confirm the account
 *     tags: [Confirm Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/users'
 *     responses:
 *       200:
 *         description: The user has successfully confirmed the account.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/users'
 *       500:
 *         description: Some server error
 *
 * /signin:
 *   post:
 *     summary: signin to user account
 *     tags: [Signin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/users'
 *     responses:
 *       200:
 *         description: The user has successfully signed in the account.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/users'
 *       500:
 *         description: Some server error
 *
 * /forgot-password:
 *   post:
 *     summary: reset user password
 *     tags: [Forgot-password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/users'
 *     responses:
 *       200:
 *         description: The user has successfully reset their password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/users'
 *       500:
 *         description: Some server error
 *
 */
const { Router } = require("express");
const router = Router();
const authController = require("../controllers/auth.controller");
const { guards } = require("../middleware/user.middleware");

router.post("/signup", authController.Register);
router.post("/confirm-account", authController.confirmAccount);
router.post("/signin", guards.guard, authController.Login);
router.post("/forgot-password", guards.guard, authController.updatePassword);

module.exports = router;
