const { Router } = require('express');
const router = Router();
const { guard } = require('../middleware/user.middleware');

const userController = require('../controllers/users.controller');

router.post('/signup', userController.Register);
router.post('/signin',guard(), userController.Login);