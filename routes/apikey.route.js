const { Router } = require("express");
const router = Router();
const apikeyController = require("../controllers/apikey.controller.")

router.get('/toggle/:id', apikeyController.apiToggle)

module.exports = router;