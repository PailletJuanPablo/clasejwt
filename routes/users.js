var express = require('express');
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
var router = express.Router();

router.post('/',  userController.register);
router.post('/login', userController.login);
// Ver lógica en jwtMiddleware
router.get('/saludar', jwtMiddleware, userController.saludar)

module.exports = router;
