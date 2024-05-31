const { Router } = require('express');
const router = Router();
const { guard } = require('../middleware/user.middleware');

guard

const authController = require('../controllers/auth.controller');

router.post('/resetPassword', guard(),authController.confirm_email);
router.post('/', authController.update_password);
