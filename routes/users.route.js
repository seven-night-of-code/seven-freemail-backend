const { Router } = require('express');
const router = Router();

const userController = require('../controllers/users.controller')

router.post('/', userController.Register)