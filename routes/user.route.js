const { Router } = require('express');
const router = Router();

const userController = require('../controllers/users.controller')

router.post('/Login', userController.create);

router.post('/')

router.get('/', userController.create )

module.exports = router;