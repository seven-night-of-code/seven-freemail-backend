const { Router } = require("express");
const apikeyController = require("../controllers/apikey.controller.")

Router.get('/toggle', apikeyController.apiToggle)

module.exports = Router;