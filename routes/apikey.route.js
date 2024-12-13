/**
 * @swagger
 * tags:
 *   name: Api Key
 *   description: The Api Key Management
 * /toggle/:id:
 *   get:
 *     summary: Toogle the status of the apiKey
 *     tags: [Toogle ApiKey]
 *     responses:
 *       200:
 *         description: The user has successfully toggled the status of the apiKey
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/Users'
 *       500:
 *         description: Some server error
 *
 */
const { Router } = require("express");
const router = Router();
const apikeyController = require("../controllers/apikey.controller.")

router.get('/toggle/:id', apikeyController.apiToggle)

module.exports = router;