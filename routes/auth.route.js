const { Router } = require('express');
const router = Router();

const authController = require('../controllers/auth.controller')

router.post('/', authController.confirm_email);
router.post('/', authController.update_password)
