const { Router } = require('express');
const router = Router();
const guard  = require('../middleware/user.middleware');
const authController = require('../controllers/auth.controller');

router.post('/signin', guard(),authController.Login);
router.post('/signup', authController.Register);
router.post('/confirm-account', authController.confirmAccount);
router.post('/forgot-password',guard(), authController.updatePassword);


module.exports = router;