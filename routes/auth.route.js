const { Router } = require('express');
const router = Router();

const authController = require('../controllers/auth.controller')

router.post('/', authController.reset_password)