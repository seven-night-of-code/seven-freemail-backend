const { Router } = require('express');
const router = Router();
const authController = require('../controllers/auth.controller');
const { guards } = require('../middleware/user.middleware');

router.post('/signup', authController.Register);
router.post('/confirm-account', authController.confirmAccount);
router.post('/signin', guards.guard,authController.Login);
router.post('/forgot-password',guards.guard, authController.updatePassword);


module.exports = router;